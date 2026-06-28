// src/components/ResultPanel.tsx

type ConfidenceLabel = 'high' | 'medium' | 'low';

interface MatchedRule {
  rule_name: string;
  time_complexity: string;
  space_complexity: string;
  confidence: number;
  confidence_label: ConfidenceLabel;
  evidence: string[];
}

export interface AnalysisResult {
  status: string;
  time_complexity: string;
  space_complexity: string;
  confidence?: number;
  confidence_label?: ConfidenceLabel;
  dominant_rule?: string;
  matched_rules?: MatchedRule[];
  analysis_steps?: string[];
  ai_suggestion: string;
}

interface ResultPanelProps {
  result: AnalysisResult;
}

const confidenceStyles: Record<ConfidenceLabel, string> = {
  high: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  low: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

function formatRuleName(ruleName?: string) {
  if (!ruleName) return 'Unknown rule';
  return ruleName.replace(/_/g, ' ');
}

export default function ResultPanel({ result }: ResultPanelProps) {
  const confidenceLabel = result.confidence_label ?? 'medium';
  const confidenceText = typeof result.confidence === 'number'
    ? `${Math.round(result.confidence * 100)}%`
    : 'Unavailable';
  const analysisSteps = result.analysis_steps?.length
    ? result.analysis_steps
    : ['No detailed static evidence was returned.'];
  const visibleMatches = result.matched_rules?.slice(0, 4) ?? [];

  return (
    <div className="border border-teal-500/50 rounded-xl p-8 bg-white dark:bg-[#121212] mb-20 shadow-lg transition-colors duration-300">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-6">
        <div>
          <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Estimated Analysis</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Static result based on detected code patterns, not a formal proof.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${confidenceStyles[confidenceLabel]}`}>
            {confidenceLabel} confidence
          </span>
          <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{confidenceText}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 dark:bg-[#1a1a1a] p-5 rounded-lg border border-gray-200 dark:border-gray-800">
          <span className="block text-gray-500 dark:text-gray-400 text-sm mb-2">Estimated Time</span>
          <span className="text-3xl font-mono font-bold text-teal-600 dark:text-teal-400">
            {result.time_complexity}
          </span>
        </div>
        <div className="bg-gray-50 dark:bg-[#1a1a1a] p-5 rounded-lg border border-gray-200 dark:border-gray-800">
          <span className="block text-gray-500 dark:text-gray-400 text-sm mb-2">Estimated Space</span>
          <span className="text-3xl font-mono font-bold text-teal-600 dark:text-teal-400">
            {result.space_complexity}
          </span>
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1a1a1a] p-5">
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between mb-3">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200">Static Evidence</h4>
          <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Rule: {formatRuleName(result.dominant_rule)}
          </span>
        </div>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {analysisSteps.map((step, index) => (
            <li key={`${step}-${index}`} className="flex gap-2">
              <span className="text-teal-600 dark:text-teal-400 font-bold">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>

        {visibleMatches.length > 1 ? (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Matched Rules</div>
            <div className="flex flex-wrap gap-2">
              {visibleMatches.map((match) => (
                <span
                  key={`${match.rule_name}-${match.time_complexity}`}
                  className="px-2.5 py-1 rounded-md bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-400"
                >
                  {formatRuleName(match.rule_name)} - {Math.round(match.confidence * 100)}%
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="text-teal-600 dark:text-teal-500 font-bold mb-2">AI Overview:</div>
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {result.ai_suggestion}
        </div>
      </div>
    </div>
  );
}
