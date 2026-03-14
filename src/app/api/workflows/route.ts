import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data: workflows, error } = await supabase
    .from("workflows")
    .select(
      `
      *,
      workflow_steps(count)
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(workflows);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user's org_id
  const { data: dbUser } = await supabase
    .from("users")
    .select("org_id")
    .eq("id", user.id)
    .single();

  if (!dbUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { steps, systems, ...workflowData } = body;

  // Create the workflow
  const { data: workflow, error: workflowError } = await supabase
    .from("workflows")
    .insert({
      ...workflowData,
      org_id: dbUser.org_id,
      owner_user_id: user.id,
    })
    .select()
    .single();

  if (workflowError) {
    return NextResponse.json(
      { error: workflowError.message },
      { status: 500 }
    );
  }

  // Create workflow steps if provided
  if (steps && steps.length > 0) {
    const stepsWithWorkflowId = steps.map(
      (step: Record<string, unknown>, index: number) => ({
        ...step,
        workflow_id: workflow.id,
        step_order: index + 1,
      })
    );

    const { error: stepsError } = await supabase
      .from("workflow_steps")
      .insert(stepsWithWorkflowId);

    if (stepsError) {
      return NextResponse.json(
        { error: stepsError.message },
        { status: 500 }
      );
    }
  }

  // Log to audit
  await supabase.from("audit_log").insert({
    org_id: dbUser.org_id,
    user_id: user.id,
    entity_type: "workflow",
    entity_id: workflow.id,
    action: "create",
    details: { name: workflow.name },
  });

  return NextResponse.json(workflow, { status: 201 });
}
