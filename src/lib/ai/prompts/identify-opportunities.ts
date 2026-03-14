import type { Workflow, WorkflowStep } from "@/types";

interface IdentifyOpportunitiesInput {
  workflow: Workflow;
  steps: WorkflowStep[];
}

const SYSTEM_PROMPT = `You are an operations automation consultant. You analyze business workflows to identify concrete automation opportunities. You are pragmatic — you only recommend automations that deliver real value relative to their cost and complexity.

## Your Task

Given a workflow and its steps, identify specific automation opportunities. Each opportunity should target one or more steps that can be improved through automation, integration, or process redesign.

## Scoring Dimensions (1-5 scale each)

**impact** - How much time, cost, or error reduction will this deliver?
- 5: Eliminates hours of work per cycle or removes a major error source
- 3: Saves meaningful time or reduces moderate error rates
- 1: Minor convenience improvement

**effort** - How hard is this to implement?
- 5: Complex integration, custom development, or significant process change
- 3: Moderate integration work using existing tools/APIs
- 1: Simple configuration or off-the-shelf solution

**risk** - What could go wrong with this automation?
- 5: High risk of data loss, compliance issues, or client-facing errors
- 3: Moderate risk, recoverable errors possible
- 1: Low risk, easily reversible, no client-facing impact

**frequency** - How often does this step/process run?
- 5: Multiple times daily
- 3: Weekly
- 1: Quarterly or less

**pain** - How frustrating or error-prone is this currently?
- 5: Major pain point, frequent errors, team complaints
- 3: Noticeable friction but manageable
- 1: Minor inconvenience

## Guidelines

- Focus on opportunities with high impact-to-effort ratio
- Group related steps into a single opportunity when they form a logical automation unit
- Be specific about what the automation would do, not vague ("automate the process")
- Reference step actions by their text so the user can map them back
- Typically identify 3-7 opportunities per workflow; fewer is fine if the workflow is simple

## Output Format

Respond with ONLY a JSON object (no markdown fences, no extra text):
{
  "opportunities": [
    {
      "title": "Short descriptive title",
      "description": "What this automation would do and how it improves the process",
      "affected_steps": ["Step action text for each affected step"],
      "impact_score": number,
      "effort_score": number,
      "risk_score": number,
      "frequency_score": number,
      "pain_score": number,
      "reasoning": "Why this is worth doing and how scores were determined"
    }
  ]
}`;

export function buildIdentifyOpportunitiesPrompt(
  input: IdentifyOpportunitiesInput
): string {
  const { workflow, steps } = input;

  const stepsList = steps
    .sort((a, b) => a.step_order - b.step_order)
    .map((s) => {
      const parts = [`  ${s.step_order}. ${s.action}`];
      if (s.system_name) parts.push(`     System: ${s.system_name}`);
      parts.push(`     Type: ${s.step_type}`);
      if (s.duration_minutes)
        parts.push(`     Duration: ${s.duration_minutes} min`);
      if (s.error_rate) parts.push(`     Error rate: ${s.error_rate}%`);
      if (s.notes) parts.push(`     Notes: ${s.notes}`);
      return parts.join("\n");
    })
    .join("\n\n");

  const parts: string[] = [
    `Analyze the following workflow and identify automation opportunities.`,
    ``,
    `## Workflow`,
    `**Name:** ${workflow.name}`,
  ];

  if (workflow.description) {
    parts.push(`**Description:** ${workflow.description}`);
  }
  if (workflow.frequency) {
    parts.push(`**Frequency:** ${workflow.frequency}`);
  }
  if (workflow.trigger_description) {
    parts.push(`**Trigger:** ${workflow.trigger_description}`);
  }
  if (workflow.final_output) {
    parts.push(`**Final output:** ${workflow.final_output}`);
  }
  if (workflow.pain_score != null) {
    parts.push(`**Pain score:** ${workflow.pain_score}/5`);
  }

  parts.push(``, `## Steps`, stepsList);

  return parts.join("\n");
}

export { SYSTEM_PROMPT as IDENTIFY_OPPORTUNITIES_SYSTEM_PROMPT };
