import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function POST(request: Request) {
  const body = await request.json();
  const { workflow, steps, opportunities } = body;

  const stepsDescription = steps
    .map(
      (s: Record<string, unknown>, i: number) =>
        `Step ${i + 1}: ${s.action} (System: ${s.system_name || "N/A"}, Type: ${s.step_type})`
    )
    .join("\n");

  const oppsDescription = opportunities
    .map(
      (o: Record<string, unknown>, i: number) =>
        `${i + 1}. ${o.title}: ${o.description} (Impact: ${o.impact_score}, Effort: ${o.effort_score})`
    )
    .join("\n");

  const prompt = `You are a process automation architect creating an implementation blueprint.

WORKFLOW: ${workflow.name}
Description: ${workflow.description || "Not provided"}
Frequency: ${workflow.frequency || "Not specified"}

CURRENT STEPS:
${stepsDescription}

PRIORITIZED OPPORTUNITIES (marked as "now"):
${oppsDescription}

Create a detailed automation blueprint that:
1. Defines specific automations for each opportunity
2. Sequences them in implementation order (dependencies first)
3. Estimates ROI for the overall plan

For each automation:
- What specific steps it replaces or augments
- What dependencies it has on other automations
- Implementation notes (key technical considerations)

Respond with ONLY a JSON object:
{
  "automations": [
    {
      "title": "Automation name",
      "description": "What it does and how",
      "steps_replaced": ["Step action 1", "Step action 2"],
      "dependencies": ["Other automation title if any"],
      "implementation_notes": "Technical approach and key considerations"
    }
  ],
  "sequence": ["Automation title 1", "Automation title 2"],
  "expected_roi": {
    "hours_saved_monthly": 0,
    "cycle_time_reduction_pct": 0,
    "error_rate_reduction_pct": 0
  }
}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    const result = JSON.parse(jsonMatch[0]);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Blueprint generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
