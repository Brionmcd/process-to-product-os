// Database entity types matching the Supabase schema

export interface Organization {
  id: string;
  name: string;
  industry: string | null;
  team_size: number | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  org_id: string;
  email: string;
  role: "owner" | "operator" | "reviewer";
  created_at: string;
}

export type WorkflowStatus =
  | "draft"
  | "mapped"
  | "scored"
  | "blueprint_generated"
  | "deploying"
  | "shadow"
  | "live"
  | "optimizing"
  | "active";

export interface Workflow {
  id: string;
  org_id: string;
  name: string;
  description: string | null;
  frequency: string | null;
  owner_user_id: string | null;
  trigger_description: string | null;
  final_output: string | null;
  pain_score: number | null;
  revenue_impact: string | null;
  status: WorkflowStatus;
  created_at: string;
  updated_at: string;
}

export type StepType = "mechanical" | "judgment" | "hybrid";

export interface WorkflowStep {
  id: string;
  workflow_id: string;
  step_order: number;
  action: string;
  system_name: string | null;
  step_type: StepType;
  duration_minutes: number | null;
  error_rate: number | null;
  notes: string | null;
  created_at: string;
}

export interface SystemConnection {
  id: string;
  org_id: string;
  system_name: string;
  system_type: string | null;
  auth_type: string | null;
  status: "connected" | "pending" | "disconnected";
  read_scope: string | null;
  write_scope: string | null;
  notes: string | null;
  created_at: string;
}

export type OpportunityPhase = "now" | "next" | "later";
export type OpportunityStatus =
  | "identified"
  | "in_progress"
  | "completed"
  | "deferred";

export interface Opportunity {
  id: string;
  workflow_id: string;
  title: string;
  description: string | null;
  impact_score: number | null;
  effort_score: number | null;
  risk_score: number | null;
  frequency_score: number | null;
  pain_score: number | null;
  priority_score: number | null;
  phase: OpportunityPhase;
  status: OpportunityStatus;
  created_at: string;
}

export interface Blueprint {
  id: string;
  workflow_id: string;
  recommended_automations: AutomationRecommendation[];
  implementation_sequence: string[];
  expected_roi: ExpectedROI;
  generated_by: "ai" | "manual";
  approved_by: string | null;
  approved_at: string | null;
  version: number;
  created_at: string;
}

export interface AutomationRecommendation {
  title: string;
  description: string;
  steps_replaced: string[];
  dependencies: string[];
  implementation_notes: string;
}

export interface ExpectedROI {
  hours_saved_monthly: number;
  cycle_time_reduction_pct: number;
  error_rate_reduction_pct: number;
}

export type DeliverableType =
  | "sop"
  | "report"
  | "checklist"
  | "client_package"
  | "rollout_plan";

export interface Deliverable {
  id: string;
  workflow_id: string | null;
  blueprint_id: string | null;
  type: DeliverableType;
  title: string;
  generated_content: string | null;
  version: number;
  status: "draft" | "review" | "approved" | "published";
  created_at: string;
  updated_at: string;
}

export type MetricConfidence = "measured" | "estimated" | "projected";

export interface MetricSnapshot {
  id: string;
  workflow_id: string;
  snapshot_date: string;
  cycle_time_hours: number | null;
  touch_count: number | null;
  rework_rate: number | null;
  hours_saved: number | null;
  confidence: MetricConfidence;
  notes: string | null;
  created_at: string;
}

export interface AuditLogEntry {
  id: string;
  org_id: string;
  user_id: string | null;
  entity_type: string;
  entity_id: string;
  action: string;
  details: Record<string, unknown> | null;
  created_at: string;
}

// ─── Deployment Sprint & Tasks ───────────────────────────────────────────────

export type SprintPhase =
  | "planning"      // Blueprint approved, sprint being set up
  | "building"      // Integration setup, agent config, prompt tuning
  | "shadow"        // Running in parallel with human process
  | "live"          // Human-in-the-loop production
  | "optimizing"    // Tuning based on live metrics
  | "completed";    // Stable, fully deployed

export type TaskCategory =
  | "integration"   // Connect systems (QBO, Ramp, etc.)
  | "agent_setup"   // Stand up AI agents (data pull, analysis, draft, QA)
  | "prompt_config" // Configure prompts, skills, rules
  | "approval_gate" // Define human approval checkpoints
  | "qa_check"      // Quality assurance and testing
  | "rollout"       // Go-live steps and monitoring setup
  | "optimization"; // Post-launch tuning

export type TaskStatus = "todo" | "in_progress" | "blocked" | "done";

export interface DeploymentSprint {
  id: string;
  workflow_id: string;
  blueprint_id: string;
  name: string;
  phase: SprintPhase;
  target_workflows: string[];    // Which specific automations from blueprint
  success_metrics: SuccessMetric[];
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface SuccessMetric {
  name: string;
  baseline: number;
  target: number;
  current: number | null;
  unit: string;
}

export interface SprintTask {
  id: string;
  sprint_id: string;
  category: TaskCategory;
  title: string;
  description: string | null;
  status: TaskStatus;
  assignee: string | null;
  order: number;
  blocked_by: string[];          // Task IDs this depends on
  notes: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface ShadowRunComparison {
  id: string;
  sprint_id: string;
  run_date: string;
  human_output_summary: string;
  agent_output_summary: string;
  match_score: number;           // 0-100, how close agent was to human
  discrepancies: string[];
  verdict: "pass" | "needs_tuning" | "fail";
  notes: string | null;
  created_at: string;
}

// API request/response types

export interface CreateWorkflowRequest {
  name: string;
  description?: string;
  frequency?: string;
  trigger_description?: string;
  final_output?: string;
  pain_score?: number;
  revenue_impact?: string;
  steps?: Omit<WorkflowStep, "id" | "workflow_id" | "created_at">[];
  systems?: string[];
}

export interface ClassifyStepResponse {
  step_type: StepType;
  confidence: number;
  reasoning: string;
}

export interface IdentifyOpportunitiesResponse {
  opportunities: {
    title: string;
    description: string;
    affected_steps: string[];
    impact_score: number;
    effort_score: number;
    risk_score: number;
    frequency_score: number;
    pain_score: number;
    reasoning: string;
  }[];
}

export interface GenerateBlueprintResponse {
  automations: AutomationRecommendation[];
  sequence: string[];
  expected_roi: ExpectedROI;
}
