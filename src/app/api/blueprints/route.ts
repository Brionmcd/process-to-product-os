import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const workflowId = searchParams.get("workflow_id");

  let query = supabase
    .from("blueprints")
    .select("*, workflows(name)")
    .order("created_at", { ascending: false });

  if (workflowId) {
    query = query.eq("workflow_id", workflowId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from("blueprints")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Update workflow status
  await supabase
    .from("workflows")
    .update({
      status: "blueprint_generated",
      updated_at: new Date().toISOString(),
    })
    .eq("id", body.workflow_id);

  return NextResponse.json(data, { status: 201 });
}
