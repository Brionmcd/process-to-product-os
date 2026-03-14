import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function POST(request: Request) {
  const body = await request.json();
  const { workflow, steps } = body;

  const stepsDescription = steps
    .map(
      (s: Record<string, unknown>, i: number) =>
        `Step ${i + 1}: ${s.action} (System: ${s.system_name || "N/A"}, Type: ${s.step_type}, Duration: ${s.duration_minutes || "?"}min, Error Rate: ${s.error_rate || "?"}%)`
    )
    .join("\n");

  const prompt = `You are a process automation expert analyzing a workflow to identify automation opportunities.

WORKFLOW: ${workflow.name}
Description: ${workflow.description || "Not provided"}
Frequency: ${workflow.frequency || "Not specified"}
Trigger: ${workflow.trigger_description || "Not specified"}
Final Output: ${workflow.final_output || "Not specified"}
Current Pain Score: ${workflow.pain_score || "Not scored"}/5

STEPS:
${stepsDescription}

Analyze this workflow and identify 3-7 automation opportunities. For each opportunity:
1. Focus on mechanical and hybrid steps — these have the highest automation potential
2. Group related steps that could be automated together
3. Consider integration opportunities between systems
4. Look for bottlenecks (high duration + high error rate steps)

Score each dimension 1-5:
- Impact: time/revenue/quality upside if automated
- Effort: build complexity, integration difficulty (1=easy, 5=very hard)
- Risk: data sensitivity, compliance, operational risk (1=low, 5=high)
- Frequency: how often this opportunity would deliver value (aligned with workflow frequency)
- Pain: current friction and frustration (1=minor annoyance, 5=critical blocker)

Respond with ONLY a JSON object:
{
  "opportunities": [
    {
      "title": "Short title",
      "description": "What would be automated and why it matters",
      "affected_steps": ["Step 1 action", "Step 3 action"],
      "impact_score": 1-5,
      "effort_score": 1-5,
      "risk_score": 1-5,
      "frequency_score": 1-5,
      "pain_score": 1-5,
      "reasoning": "Why this is an opportunity and how scores were determined"
    }
  ]
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
      error instanceof Error ? error.message : "AI analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
