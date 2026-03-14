import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: workflow, error } = await supabase
    .from("workflows")
    .select(
      `
      *,
      workflow_steps(*),
      opportunities(*),
      blueprints(*),
      metric_snapshots(*)
    `
    )
    .eq("id", id)
    .order("step_order", {
      referencedTable: "workflow_steps",
      ascending: true,
    })
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(workflow);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await request.json();

  const { data: workflow, error } = await supabase
    .from("workflows")
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Audit log
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const { data: dbUser } = await supabase
      .from("users")
      .select("org_id")
      .eq("id", user.id)
      .single();

    if (dbUser) {
      await supabase.from("audit_log").insert({
        org_id: dbUser.org_id,
        user_id: user.id,
        entity_type: "workflow",
        entity_id: id,
        action: "update",
        details: body,
      });
    }
  }

  return NextResponse.json(workflow);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { error } = await supabase.from("workflows").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
