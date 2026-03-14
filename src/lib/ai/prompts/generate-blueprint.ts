import type {
  Workflow,
  WorkflowStep,
  Opportunity,
} from "@/types";

interface GenerateBlueprintInput {
  workflow: Workflow;
  steps: WorkflowStep[];
  opportunities: Opportunity[];
}

const SYSTEM_PROMPT = `You are an automation architect. You take a workflow and a set of approved automation opportunities and produce a concrete implementation blueprint — the plan an operations team or developer would follow to build and deploy these automations.

## Your Task

Generate a blueprint that includes:
1. Specific automation recommendations with implementation details
2. A sequenced implementation order that accounts for dependencies
3. Expected ROI projections based on the workflow data

## Guidelines

- Order automations so that dependencies are resolved (e.g., if automation B depends on data from automation A, A comes first)
- Quick wins with low effort should generally come first to build momentum
- Be specific about what tools, integrations, or scripts each automation requires
- Implementation notes should be actionable — a developer or ops person should know what to build
- ROI estimates should be conservative and grounded in the step data provided (duration, frequency, error rates)
- hours_saved_monthly: estimate based on step durations and workflow frequency
- cycle_time_reduction_pct: estimate the percentage reduction in end-to-end workflow time
- error_rate_reduction_pct: estimate based on which error-prone steps are being automated

## Output Format

Respond with ONLY a JSON object (no markdown fences, no extra text):
{
  "automations": [
    {
      "title": "Automation name",
      "description": "What it does and why",
      "steps_replaced": ["Step action text for each step this replaces or modifies"],
      "dependencies": ["Title of another automation this depends on, if any"],
      "implementation_notes": "Specific technical guidance: tools to use, APIs to connect, logic to implement"
    }
  ],
  "sequence": ["Automation title in implementation order"],
  "expected_roi": {
    "hours_saved_monthly": number,
    "cycle_time_reduction_pct": number,
    "error_rate_reduction_pct": number
  }
}`;

export function buildGenerateBlueprintPrompt(
  input: GenerateBlueprintInput
): string {
  const { workflow, steps, opportunities } = input;

  const stepsList = steps
    .sort((a, b) => a.step_order - b.step_order)
    .map((s) => {
      const parts = [`  ${s.step_order}. ${s.action} [${s.step_type}]`];
      if (s.system_name) parts.push(`     System: ${s.system_name}`);
      if (s.duration_minutes)
        parts.push(`     Duration: ${s.duration_minutes} min`);
      if (s.error_rate) parts.push(`     Error rate: ${s.error_rate}%`);
      return parts.join("\n");
    })
    .join("\n");

  const opportunitiesList = opportunities
    .map((o, i) => {
      const parts = [
        `  ${i + 1}. ${o.title}`,
        `     ${o.description ?? ""}`,
        `     Impact: ${o.impact_score}/5 | Effort: ${o.effort_score}/5 | Risk: ${o.risk_score}/5`,
        `     Priority score: ${o.priority_score ?? "N/A"}`,
        `     Phase: ${o.phase}`,
      ];
      return parts.join("\n");
    })
    .join("\n\n");

  const parts: string[] = [
    `Generate an implementation blueprint for the following workflow and approved opportunities.`,
    ``,
    `## Workflow: ${workflow.name}`,
  ];

  if (workflow.description) {
    parts.push(`**Description:** ${workflow.description}`);
  }
  if (workflow.frequency) {
    parts.push(`**Frequency:** ${workflow.frequency}`);
  }

  parts.push(
    ``,
    `## Current Steps`,
    stepsList,
    ``,
    `## Approved Opportunities (phase: "now")`,
    opportunitiesList,
    ``,
    `Generate a blueprint that implements these opportunities. Focus on the "now" phase opportunities. Sequence them for maximum momentum — quick wins first, then more complex automations.`
  );

  return parts.join("\n");
}

export { SYSTEM_PROMPT as GENERATE_BLUEPRINT_SYSTEM_PROMPT };
