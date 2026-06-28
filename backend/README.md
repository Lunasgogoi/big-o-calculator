# Backend Setup

Use the project virtual environment for backend development and tests. The
runtime dependencies are pinned in `requirements.txt`; test-only dependencies
live in `requirements-dev.txt`.

## Windows PowerShell

```powershell
cd backend
py -m venv ..\.venv
..\.venv\Scripts\python.exe -m pip install --upgrade pip
..\.venv\Scripts\python.exe -m pip install -r requirements-dev.txt
..\.venv\Scripts\python.exe -m unittest discover -s tests
..\.venv\Scripts\python.exe -m uvicorn main:app --reload
```

## macOS / Linux

```bash
cd backend
python3 -m venv ../.venv
../.venv/bin/python -m pip install --upgrade pip
../.venv/bin/python -m pip install -r requirements-dev.txt
../.venv/bin/python -m unittest discover -s tests
../.venv/bin/python -m uvicorn main:app --reload
```

Set `GEMINI_API_KEY` in `backend/.env` to enable AI explanations. Without it,
the API still returns static analyzer results.

Set `ALLOWED_ORIGINS` to a comma-separated allowlist for deployment:

```env
ALLOWED_ORIGINS=https://your-frontend.example.com,https://admin.example.com
```

If `ALLOWED_ORIGINS` is omitted, the backend defaults to `*` for local
development.
