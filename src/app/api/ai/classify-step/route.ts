import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function POST(request: Request) {
  const body = await request.json();
  const { action, system_name, notes, workflowContext } = body;

  const prompt = `You are analyzing a workflow step to classify whether it is mechanical (fully automatable), judgment-based (requires human expertise), or hybrid (partially automatable).

Workflow context: ${workflowContext || "Not provided"}

Step to classify:
- Action: ${action}
- System/Tool: ${system_name || "Not specified"}
- Notes: ${notes || "None"}

Classification criteria:
- MECHANICAL: Data entry, copy-paste between systems, formatting, sending templated emails, running standard reports, file organization, calculations with clear formulas
- JUDGMENT: Strategic decisions, client communication requiring empathy/nuance, exception handling, quality review requiring domain expertise, negotiation, creative work
- HYBRID: Tasks that have both a mechanical component (data gathering, formatting) and a judgment component (interpreting results, deciding next steps)

Respond with ONLY a JSON object:
{
  "step_type": "mechanical" | "judgment" | "hybrid",
  "confidence": 0.0-1.0,
  "reasoning": "Brief explanation of classification"
}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
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

    const classification = JSON.parse(jsonMatch[0]);
    return NextResponse.json(classification);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "AI classification failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
