import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

const templateInstructions: Record<string, string> = {
  sop: `Create a Standard Operating Procedure (SOP) document with:
- Purpose and scope
- Roles and responsibilities
- Step-by-step procedure (numbered)
- Decision points and exception handling
- Quality checks
- References and related documents`,

  report: `Create a client-facing analysis report with:
- Executive summary
- Current state analysis (workflow overview, pain points, metrics)
- Opportunities identified (prioritized list with scoring rationale)
- Recommended approach (blueprint summary)
- Expected ROI and timeline
- Next steps and recommendations`,

  checklist: `Create an implementation checklist with:
- Pre-implementation requirements
- Phase-by-phase tasks (grouped by automation)
- Testing and validation steps
- Go-live checklist
- Post-implementation monitoring tasks
Each item should be a checkbox-style item.`,

  rollout_plan: `Create a phased rollout plan with:
- Phase overview and timeline
- For each phase: objectives, tasks, success criteria, risks and mitigations
- Resource requirements
- Communication plan
- Training requirements
- Rollback procedures`,
};

export async function POST(request: Request) {
  const body = await request.json();
  const { workflow, steps, blueprint, templateType } = body;

  const stepsDescription = steps
    ?.map(
      (s: Record<string, unknown>, i: number) =>
        `Step ${i + 1}: ${s.action} (Type: ${s.step_type}, Duration: ${s.duration_minutes || "?"}min)`
    )
    .join("\n") || "No steps provided";

  const blueprintDescription = blueprint
    ? `Automations: ${JSON.stringify(blueprint.recommended_automations, null, 2)}\nExpected ROI: ${JSON.stringify(blueprint.expected_roi, null, 2)}`
    : "No blueprint available";

  const instructions =
    templateInstructions[templateType] || templateInstructions.report;

  const prompt = `You are a professional consultant creating a deliverable document.

WORKFLOW: ${workflow.name}
Description: ${workflow.description || "Not provided"}
Frequency: ${workflow.frequency || "Not specified"}
Trigger: ${workflow.trigger_description || "Not specified"}
Final Output: ${workflow.final_output || "Not specified"}

CURRENT STEPS:
${stepsDescription}

AUTOMATION BLUEPRINT:
${blueprintDescription}

DOCUMENT TYPE: ${templateType}

${instructions}

Write the document in clean Markdown format. Be specific and actionable — use actual workflow names, step names, and system names from the data provided. This should be ready for a client or stakeholder to read.`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ content: text });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Deliverable generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
