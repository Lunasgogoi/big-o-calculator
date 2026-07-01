import unittest
from unittest.mock import Mock, patch

from fastapi.testclient import TestClient

import main
from core import ai_client


class AnalyzeApiTests(unittest.TestCase):
    def setUp(self):
        self.original_ai_client = ai_client.client
        ai_client.client = None
        self.client = TestClient(main.app)

    def tearDown(self):
        ai_client.client = self.original_ai_client

    def test_analyze_returns_confidence_metadata(self):
        response = self.client.post(
            "/api/analyze",
            json={
                "language": "python",
                "code": "def f(nums):\n    for item in nums:\n        print(item)\n",
            },
        )
        body = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(body["status"], "success")
        self.assertIn("confidence", body)
        self.assertIn("confidence_label", body)
        self.assertIn("dominant_rule", body)
        self.assertIn("matched_rules", body)
        self.assertGreaterEqual(len(body["analysis_steps"]), 1)

    def test_analyze_accepts_code_over_previous_character_limit(self):
        code = "# " + ("x" * 1600) + "\ndef f(nums):\n    for item in nums:\n        print(item)\n"

        response = self.client.post(
            "/api/analyze",
            json={
                "language": "python",
                "code": code,
            },
        )
        body = response.json()

        self.assertGreater(len(code), 1500)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(body["status"], "success")

    def test_ai_failure_returns_static_analysis_warning(self):
        failing_client = Mock()
        failing_client.models.generate_content.side_effect = ValueError("bad json")
        ai_client.client = failing_client

        response = self.client.post(
            "/api/analyze",
            json={
                "language": "python",
                "code": "def f(nums):\n    for item in nums:\n        print(item)\n",
            },
        )
        body = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(body["status"], "success")
        self.assertEqual(body["time_complexity"], "O(N)")
        self.assertEqual(body["space_complexity"], "O(1)")
        self.assertEqual(body["ai_suggestion"].splitlines()[0], "AI explanation unavailable; static analysis shown.")
        self.assertIn("confidence", body)
        self.assertIn("matched_rules", body)

    def test_allowed_origins_can_be_configured_from_env(self):
        with patch.dict(
            main.os.environ,
            {"ALLOWED_ORIGINS": "https://example.com, https://app.example.com"},
        ):
            self.assertEqual(
                main.get_allowed_origins(),
                ["https://example.com", "https://app.example.com"],
            )


if __name__ == "__main__":
    unittest.main()
