/**
 * Priority Score = (Impact × Frequency × Pain) / (Effort + Risk)
 * All dimensions normalized 1–5
 */
export function calculatePriorityScore(params: {
  impact: number;
  frequency: number;
  pain: number;
  effort: number;
  risk: number;
}): number {
  const { impact, frequency, pain, effort, risk } = params;
  const denominator = effort + risk;
  if (denominator === 0) return 0;
  return (impact * frequency * pain) / denominator;
}

/**
 * Maps frequency text to a 1-5 score
 */
export function frequencyToScore(frequency: string): number {
  const map: Record<string, number> = {
    daily: 5,
    weekly: 4,
    "bi-weekly": 3,
    monthly: 2,
    quarterly: 1,
    "ad-hoc": 2,
  };
  return map[frequency.toLowerCase()] ?? 2;
}

/**
 * Returns a human-readable priority label
 */
export function priorityLabel(score: number): string {
  if (score >= 10) return "Critical";
  if (score >= 6) return "High";
  if (score >= 3) return "Medium";
  return "Low";
}

/**
 * Suggests a phase based on priority score
 */
export function suggestPhase(score: number): "now" | "next" | "later" {
  if (score >= 8) return "now";
  if (score >= 4) return "next";
  return "later";
}
