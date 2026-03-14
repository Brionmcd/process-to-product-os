import type {
  Workflow,
  WorkflowStep,
  Blueprint,
  DeliverableType,
  Opportunity,
} from "@/types";

interface DraftDeliverableInput {
  workflow: Workflow;
  steps: WorkflowStep[];
  blueprint: Blueprint;
  opportunities?: Opportunity[];
  templateType: Extract<
    DeliverableType,
    "sop" | "report" | "checklist" | "rollout_plan"
  >;
  organizationName?: string;
}

const TEMPLATE_INSTRUCTIONS: Record<string, string> = {
  sop: `Generate a **Standard Operating Procedure (SOP)** document.

The SOP should include:
- Title and version
- Purpose and scope
- Roles and responsibilities
- Step-by-step procedure (incorporating the automations from the blueprint)
- For automated steps: describe what the automation does and what the human operator should verify
- For manual steps: provide clear, detailed instructions
- Exception handling procedures
- Review and update schedule

Write in clear, imperative language suitable for an operations team. Use numbered steps with sub-steps where needed. Include notes/warnings for critical steps.`,

  report: `Generate a **Client-Facing Analysis Report** document.

The report should include:
- Executive summary (2-3 paragraphs max)
- Current state assessment: workflow overview, pain points, inefficiencies
- Opportunities identified: summarize each with business impact
- Recommended automation blueprint: what will change and why
- Expected ROI: hours saved, error reduction, cycle time improvement
- Implementation timeline overview
- Next steps and recommendations

Write in professional consulting language. Use data from the workflow steps (durations, error rates) to support claims. Format for a non-technical audience — focus on business outcomes, not technical details.`,

  checklist: `Generate an **Implementation Checklist** document.

The checklist should include:
- Pre-implementation requirements (access, tools, approvals)
- For each automation in the blueprint sequence:
  - Setup tasks (checkbox items)
  - Configuration tasks
  - Testing tasks
  - Go-live tasks
- Post-implementation verification steps
- Rollback procedures for each automation
- Sign-off section

Format as a markdown checklist with clear groupings. Each item should be actionable and specific enough that someone can mark it done/not done without ambiguity.`,

  rollout_plan: `Generate a **Phased Rollout Plan** document.

The rollout plan should include:
- Overview and objectives
- Phase breakdown (aligned with blueprint implementation sequence):
  - Phase name and duration estimate
  - What gets deployed in this phase
  - Prerequisites and dependencies
  - Success criteria for moving to the next phase
  - Risks and mitigations
- Communication plan: who needs to know what, when
- Training requirements per phase
- Monitoring and measurement plan: what metrics to track during rollout
- Contingency plan: what to do if a phase fails

Write for an operations manager who will own the rollout. Be specific about timelines, responsibilities, and decision points.`,
};

const SYSTEM_PROMPT = `You are a professional operations consultant who produces polished, actionable documents for clients. You write clearly, use data to support recommendations, and structure documents for easy scanning and reference.

Generate documents in well-formatted markdown. Use headings, lists, tables, and callouts as appropriate. Do not include markdown code fences around the output — return the markdown content directly.`;

export function buildDraftDeliverablePrompt(
  input: DraftDeliverableInput
): string {
  const { workflow, steps, blueprint, opportunities, templateType, organizationName } = input;

  const templateInstruction = TEMPLATE_INSTRUCTIONS[templateType];

  const stepsList = steps
    .sort((a, b) => a.step_order - b.step_order)
    .map((s) => {
      const parts = [`  ${s.step_order}. ${s.action} [${s.step_type}]`];
      if (s.system_name) parts.push(`     System: ${s.system_name}`);
      if (s.duration_minutes)
        parts.push(`     Duration: ${s.duration_minutes} min`);
      if (s.error_rate) parts.push(`     Error rate: ${s.error_rate}%`);
      if (s.notes) parts.push(`     Notes: ${s.notes}`);
      return parts.join("\n");
    })
    .join("\n");

  const automationsList = blueprint.recommended_automations
    .map((a, i) => {
      return [
        `  ${i + 1}. ${a.title}`,
        `     ${a.description}`,
        `     Steps replaced: ${a.steps_replaced.join(", ")}`,
        `     Dependencies: ${a.dependencies.length > 0 ? a.dependencies.join(", ") : "None"}`,
        `     Notes: ${a.implementation_notes}`,
      ].join("\n");
    })
    .join("\n\n");

  const roi = blueprint.expected_roi;

  const parts: string[] = [
    templateInstruction,
    ``,
    `---`,
    ``,
    `## Source Data`,
    ``,
  ];

  if (organizationName) {
    parts.push(`**Organization:** ${organizationName}`);
  }

  parts.push(
    `**Workflow:** ${workflow.name}`,
  );

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

  parts.push(
    ``,
    `### Current Steps`,
    stepsList,
    ``,
    `### Automation Blueprint`,
    `**Implementation sequence:** ${blueprint.implementation_sequence.join(" -> ")}`,
    ``,
    automationsList,
    ``,
    `### Expected ROI`,
    `- Hours saved monthly: ${roi.hours_saved_monthly}`,
    `- Cycle time reduction: ${roi.cycle_time_reduction_pct}%`,
    `- Error rate reduction: ${roi.error_rate_reduction_pct}%`,
  );

  if (opportunities && opportunities.length > 0) {
    const oppList = opportunities
      .map(
        (o) =>
          `- **${o.title}** (Phase: ${o.phase}, Priority: ${o.priority_score ?? "N/A"}): ${o.description ?? ""}`
      )
      .join("\n");
    parts.push(``, `### Identified Opportunities`, oppList);
  }

  return parts.join("\n");
}

export { SYSTEM_PROMPT as DRAFT_DELIVERABLE_SYSTEM_PROMPT };
