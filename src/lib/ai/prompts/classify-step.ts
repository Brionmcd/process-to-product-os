interface ClassifyStepInput {
  action: string;
  system_name?: string;
  notes?: string;
  workflowContext: string;
}

const SYSTEM_PROMPT = `You are an operations analyst specializing in workflow automation. Your job is to classify individual workflow steps into one of three categories based on the nature of the work involved.

## Classification Criteria

**mechanical** - The step follows a fixed, repeatable procedure with no decision-making required. Examples: copying data between systems, generating a standard report, sending a templated email, filing a document in a known location. A script or bot could do this identically every time.

**judgment** - The step requires human expertise, interpretation, or contextual decision-making that cannot be reliably codified into rules. Examples: reviewing a document for quality, deciding whether an exception applies, advising a client on strategy, interpreting ambiguous data. The outcome depends on experience and situational awareness.

**hybrid** - The step combines mechanical actions with some degree of judgment. Examples: reviewing auto-generated entries and fixing errors, processing a standard form but handling edge cases manually, running a report and then interpreting the results for next steps. Parts could be automated, but a human must still oversee or handle exceptions.

## Scoring Confidence

Rate your confidence from 0.0 to 1.0:
- 0.9-1.0: Very clear classification, strong signals in the description
- 0.7-0.89: Likely correct but some ambiguity
- 0.5-0.69: Could go either way, limited information
- Below 0.5: Insufficient information to classify reliably

## Output Format

Respond with ONLY a JSON object (no markdown fences, no extra text):
{
  "step_type": "mechanical" | "judgment" | "hybrid",
  "confidence": number,
  "reasoning": "Brief explanation of why this classification was chosen"
}`;

export function buildClassifyStepPrompt(step: ClassifyStepInput): string {
  const parts: string[] = [
    `Classify the following workflow step.`,
    ``,
    `**Workflow context:** ${step.workflowContext}`,
    ``,
    `**Step action:** ${step.action}`,
  ];

  if (step.system_name) {
    parts.push(`**System/tool used:** ${step.system_name}`);
  }

  if (step.notes) {
    parts.push(`**Additional notes:** ${step.notes}`);
  }

  return parts.join("\n");
}

export { SYSTEM_PROMPT as CLASSIFY_STEP_SYSTEM_PROMPT };
