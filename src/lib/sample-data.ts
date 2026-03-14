/**
 * Sample end-to-end data showing the full journey:
 *   Workflow mapped → Opportunities scored → Blueprint generated → ROI tracked
 *
 * This gives new users a concrete example of what the product does.
 * All sample data uses `id: "sample-*"` prefix for easy identification.
 */

import type {
  Workflow,
  WorkflowStep,
  Opportunity,
  Blueprint,
  Deliverable,
  MetricSnapshot,
  MetricConfidence,
} from "@/types";

// ─── Workflow ────────────────────────────────────────────────────────────────

export const sampleWorkflow: Workflow & { steps_count: number } = {
  id: "sample-wf-001",
  org_id: "sample-org",
  name: "Monthly Client Financial Reporting",
  description:
    "End-to-end process for generating and delivering monthly financial reports to clients. Currently takes 3+ hours per client.",
  frequency: "monthly",
  owner_user_id: null,
  trigger_description:
    "Month-end close is completed and all transactions are reconciled.",
  final_output:
    "PDF financial report package delivered to client via portal and email.",
  pain_score: 4,
  revenue_impact: "High — directly impacts client retention and NPS",
  status: "blueprint_generated",
  steps_count: 7,
  created_at: "2026-03-01T00:00:00Z",
  updated_at: "2026-03-10T00:00:00Z",
};

export const sampleSteps: WorkflowStep[] = [
  {
    id: "sample-s1",
    workflow_id: "sample-wf-001",
    step_order: 1,
    action: "Export trial balance from accounting system",
    system_name: "QuickBooks",
    step_type: "mechanical",
    duration_minutes: 10,
    error_rate: 0.02,
    notes: null,
    created_at: "2026-03-01T00:00:00Z",
  },
  {
    id: "sample-s2",
    workflow_id: "sample-wf-001",
    step_order: 2,
    action: "Reconcile accounts and verify balances",
    system_name: "Excel",
    step_type: "judgment",
    duration_minutes: 45,
    error_rate: 0.08,
    notes: "Most error-prone step — discrepancies require investigation",
    created_at: "2026-03-01T00:00:00Z",
  },
  {
    id: "sample-s3",
    workflow_id: "sample-wf-001",
    step_order: 3,
    action: "Generate financial statements (P&L, Balance Sheet, Cash Flow)",
    system_name: "QuickBooks",
    step_type: "mechanical",
    duration_minutes: 15,
    error_rate: 0.01,
    notes: null,
    created_at: "2026-03-01T00:00:00Z",
  },
  {
    id: "sample-s4",
    workflow_id: "sample-wf-001",
    step_order: 4,
    action: "Write management commentary and variance analysis",
    system_name: "Word",
    step_type: "judgment",
    duration_minutes: 60,
    error_rate: 0.12,
    notes: "Biggest time sink — requires domain expertise",
    created_at: "2026-03-01T00:00:00Z",
  },
  {
    id: "sample-s5",
    workflow_id: "sample-wf-001",
    step_order: 5,
    action: "Format and compile report package",
    system_name: "Excel / Word",
    step_type: "hybrid",
    duration_minutes: 30,
    error_rate: 0.05,
    notes: null,
    created_at: "2026-03-01T00:00:00Z",
  },
  {
    id: "sample-s6",
    workflow_id: "sample-wf-001",
    step_order: 6,
    action: "Manager reviews and approves final report",
    system_name: "Email",
    step_type: "judgment",
    duration_minutes: 20,
    error_rate: 0.03,
    notes: null,
    created_at: "2026-03-01T00:00:00Z",
  },
  {
    id: "sample-s7",
    workflow_id: "sample-wf-001",
    step_order: 7,
    action: "Upload to client portal and send notification email",
    system_name: "Portal / Email",
    step_type: "mechanical",
    duration_minutes: 10,
    error_rate: 0.01,
    notes: null,
    created_at: "2026-03-01T00:00:00Z",
  },
];

// ─── Opportunities ───────────────────────────────────────────────────────────

export const sampleOpportunities: Opportunity[] = [
  {
    id: "sample-opp-1",
    workflow_id: "sample-wf-001",
    title: "Auto-generate management commentary",
    description:
      "Use AI to draft variance analysis and management commentary from financial data. Reduces the 60-min writing task to a 10-min review.",
    impact_score: 5,
    effort_score: 3,
    risk_score: 2,
    frequency_score: 4,
    pain_score: 5,
    priority_score: 88,
    phase: "now",
    status: "identified",
    created_at: "2026-03-10T00:00:00Z",
  },
  {
    id: "sample-opp-2",
    workflow_id: "sample-wf-001",
    title: "Automate trial balance export & statement generation",
    description:
      "Schedule QuickBooks exports and auto-generate financial statements. Eliminates 25 minutes of mechanical work per client.",
    impact_score: 4,
    effort_score: 2,
    risk_score: 1,
    frequency_score: 4,
    pain_score: 3,
    priority_score: 76,
    phase: "now",
    status: "identified",
    created_at: "2026-03-10T00:00:00Z",
  },
  {
    id: "sample-opp-3",
    workflow_id: "sample-wf-001",
    title: "Auto-compile and format report package",
    description:
      "Template-based assembly of the final report PDF. Pulls statements, commentary, and charts into a branded template automatically.",
    impact_score: 3,
    effort_score: 2,
    risk_score: 1,
    frequency_score: 4,
    pain_score: 3,
    priority_score: 64,
    phase: "next",
    status: "identified",
    created_at: "2026-03-10T00:00:00Z",
  },
  {
    id: "sample-opp-4",
    workflow_id: "sample-wf-001",
    title: "Client portal auto-delivery with notifications",
    description:
      "Auto-upload completed reports to client portal and trigger personalized email notifications. Eliminates manual upload and status emails.",
    impact_score: 2,
    effort_score: 1,
    risk_score: 1,
    frequency_score: 4,
    pain_score: 2,
    priority_score: 52,
    phase: "next",
    status: "identified",
    created_at: "2026-03-10T00:00:00Z",
  },
  {
    id: "sample-opp-5",
    workflow_id: "sample-wf-001",
    title: "AI-assisted reconciliation & anomaly detection",
    description:
      "Use AI to flag discrepancies, suggest corrections, and auto-reconcile standard items. Reduces the 45-min judgment step by ~60%.",
    impact_score: 5,
    effort_score: 4,
    risk_score: 3,
    frequency_score: 4,
    pain_score: 4,
    priority_score: 48,
    phase: "later",
    status: "identified",
    created_at: "2026-03-10T00:00:00Z",
  },
];

// ─── Blueprint ───────────────────────────────────────────────────────────────

export const sampleBlueprint: Blueprint = {
  id: "sample-bp-001",
  workflow_id: "sample-wf-001",
  recommended_automations: [
    {
      title: "Scheduled data export & statement generation",
      description:
        "Automate the QuickBooks trial balance export on a schedule (month-end + 2 days) and auto-generate P&L, Balance Sheet, and Cash Flow statements. Eliminates Steps 1 and 3 entirely.",
      steps_replaced: [
        "Step 1: Export trial balance",
        "Step 3: Generate financial statements",
      ],
      dependencies: ["QuickBooks API access"],
      implementation_notes:
        "Use QuickBooks Online API. Schedule via cron job. Store exports in structured format for downstream consumption. ~2 days to implement.",
    },
    {
      title: "AI-powered management commentary",
      description:
        "Feed financial data into Claude to generate first-draft management commentary with variance analysis, trend identification, and actionable insights. Staff reviews and edits instead of writing from scratch.",
      steps_replaced: ["Step 4: Write management commentary"],
      dependencies: ["Scheduled data export & statement generation"],
      implementation_notes:
        "Use Claude with a structured prompt that includes current period data, prior period comparison, and client context. Include confidence scores on each insight. Target: reduce 60 minutes to 10-minute review.",
    },
    {
      title: "Template-based report compilation",
      description:
        "Auto-assemble the final report package using branded templates. Pull in generated statements, AI commentary, and KPI charts into a polished PDF.",
      steps_replaced: ["Step 5: Format and compile report package"],
      dependencies: [
        "Scheduled data export & statement generation",
        "AI-powered management commentary",
      ],
      implementation_notes:
        "Use a document template engine (e.g., Docxtemplater or Puppeteer for PDF). Maintain brand templates per client. ~3 days to implement.",
    },
    {
      title: "Auto-delivery via client portal",
      description:
        "After manager approval, automatically upload the final report to the client portal and send a personalized notification email. Track when clients open the report.",
      steps_replaced: [
        "Step 7: Upload to portal and send notification",
      ],
      dependencies: ["Template-based report compilation"],
      implementation_notes:
        "Integrate with portal API. Use email templates with dynamic merge fields. Add read receipts/tracking. ~1 day to implement.",
    },
  ],
  implementation_sequence: [
    "Set up QuickBooks API integration and credentials",
    "Build scheduled export job (monthly trigger)",
    "Auto-generate financial statements from export data",
    "Design AI commentary prompt with client context injection",
    "Build commentary review/edit interface",
    "Create branded report templates (PDF assembly)",
    "Integrate portal upload and email notification",
    "Run parallel testing with manual process for 1 month",
    "Gradual rollout: 5 clients → 20 clients → all clients",
  ],
  expected_roi: {
    hours_saved_monthly: 42,
    cycle_time_reduction_pct: 65,
    error_rate_reduction_pct: 45,
  },
  generated_by: "ai",
  approved_by: null,
  approved_at: null,
  version: 1,
  created_at: "2026-03-12T00:00:00Z",
};

// ─── ROI Metrics ─────────────────────────────────────────────────────────────

export const sampleMetrics: MetricSnapshot[] = [
  {
    id: "sample-m1",
    workflow_id: "sample-wf-001",
    snapshot_date: "2026-02-01",
    cycle_time_hours: 3.2,
    touch_count: 7,
    rework_rate: 0.12,
    hours_saved: 0,
    confidence: "measured",
    notes: "Baseline measurement before automation",
    created_at: "2026-02-01T00:00:00Z",
  },
  {
    id: "sample-m2",
    workflow_id: "sample-wf-001",
    snapshot_date: "2026-03-01",
    cycle_time_hours: 1.8,
    touch_count: 4,
    rework_rate: 0.06,
    hours_saved: 18,
    confidence: "estimated",
    notes: "After Phase 1 automation (data export + statement generation)",
    created_at: "2026-03-01T00:00:00Z",
  },
];

export const sampleBeforeAfterData: {
  label: string;
  before: number;
  after: number;
  unit: string;
  confidence: MetricConfidence;
  improvementDirection: "down" | "up";
}[] = [
  {
    label: "Cycle Time",
    before: 3.2,
    after: 1.1,
    unit: "hrs",
    confidence: "projected",
    improvementDirection: "down",
  },
  {
    label: "Manual Touches",
    before: 7,
    after: 3,
    unit: "steps",
    confidence: "projected",
    improvementDirection: "down",
  },
  {
    label: "Rework Rate",
    before: 12,
    after: 5,
    unit: "%",
    confidence: "projected",
    improvementDirection: "down",
  },
  {
    label: "Report Delivery Time",
    before: 5,
    after: 1.5,
    unit: "days",
    confidence: "projected",
    improvementDirection: "down",
  },
];

// ─── Deliverables ─────────────────────────────────────────────────────────────

export const sampleDeliverables: Deliverable[] = [
  {
    id: "sample-del-001",
    workflow_id: "sample-wf-001",
    blueprint_id: "sample-bp-001",
    type: "sop",
    title: "Monthly Client Financial Reporting — Standard Operating Procedure",
    generated_content: `# Standard Operating Procedure: Monthly Client Financial Reporting

## 1. Purpose
This SOP defines the automated and manual steps for generating and delivering monthly financial reports to clients, incorporating AI-powered commentary and automated data export.

## 2. Scope
Applies to all client accounts using the Monthly Client Financial Reporting workflow. Covers the end-to-end process from month-end close through final report delivery.

## 3. Automated Steps (No Human Action Required)
- **Trial Balance Export** — Automatically pulled from QuickBooks Online on month-end + 2 business days via scheduled API job.
- **Financial Statement Generation** — P&L, Balance Sheet, and Cash Flow statements auto-generated from exported trial balance data.
- **Draft Commentary** — AI generates management commentary with variance analysis, trend identification, and actionable insights based on current and prior period data.

## 4. Human Review Steps
- **Step 1: Review AI Commentary** (Est. 10 min) — Manager reviews AI-generated commentary for accuracy, tone, and client-specific context. Edit as needed in the review interface.
- **Step 2: Approve Final Report** (Est. 5 min) — Manager approves the compiled report package before auto-delivery.

## 5. Automated Delivery
- Report auto-uploaded to client portal upon approval.
- Personalized notification email sent to client contacts.
- Read receipt tracking enabled.

## 6. Exception Handling
- If QuickBooks export fails: System alerts ops team, manual export required within 24 hours.
- If AI commentary confidence < 70%: Flagged for full manual review before approval.
- If client has multi-entity consolidation: Additional prompt context injected automatically.

## 7. Quality Metrics
- Target cycle time: 1.5 hours (from month-end close to delivery)
- Target error rate: < 5%
- Target manual touches: 3 steps (review, approve, exception handling only)`,
    version: 1,
    status: "approved",
    created_at: "2026-03-12T00:00:00Z",
    updated_at: "2026-03-12T00:00:00Z",
  },
  {
    id: "sample-del-002",
    workflow_id: "sample-wf-001",
    blueprint_id: "sample-bp-001",
    type: "report",
    title: "Automation Impact Report — Monthly Client Financial Reporting",
    generated_content: `# Automation Impact Report
## Monthly Client Financial Reporting Workflow

### Executive Summary
The Phase 1 automation of the Monthly Client Financial Reporting workflow has reduced cycle time by 44% and eliminated 25 minutes of mechanical work per client per month. AI-generated commentary reduces the highest-effort step from 60 minutes to a 10-minute review.

### Key Metrics (Before → After)
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Cycle Time | 3.2 hrs | 1.8 hrs | -44% |
| Manual Touches | 7 steps | 4 steps | -43% |
| Error Rate | 12% | 6% | -50% |
| Hours Saved / Month | — | 18 hrs | — |

### Automation Breakdown
1. **Data Export & Statement Generation** — Fully automated. Zero manual intervention required. 25 min saved per client.
2. **AI Commentary Generation** — Draft generated in < 2 min. Human review required (10 min avg). 50 min saved per client.
3. **Report Compilation** — In progress (Phase 2). Expected to save additional 30 min per client.

### ROI Projection (Full Automation)
- **Monthly hours saved:** 42 hours
- **Annual cost savings:** ~$63,000 (at $125/hr blended rate)
- **Cycle time reduction:** 65%
- **Client satisfaction impact:** Faster delivery, consistent quality, richer insights

### Recommendations
1. Proceed to Phase 2: Template-based report compilation
2. Expand to top 20 clients in next sprint
3. Monitor AI commentary quality — currently at 88% match score in shadow testing`,
    version: 1,
    status: "published",
    created_at: "2026-03-14T00:00:00Z",
    updated_at: "2026-03-14T00:00:00Z",
  },
  {
    id: "sample-del-003",
    workflow_id: "sample-wf-001",
    blueprint_id: "sample-bp-001",
    type: "checklist",
    title: "Go-Live Checklist — Phase 1 Automation",
    generated_content: `# Go-Live Checklist: Phase 1 — Data Export & AI Commentary

## Pre-Launch
- [x] QuickBooks API integration tested and stable
- [x] Scheduled export job running on correct cadence (month-end + 2 days)
- [x] Financial statement generation validated against manual statements (5 clients)
- [x] AI commentary prompt tuned and reviewed
- [ ] Manager review interface deployed and tested
- [ ] Approval workflow configured with correct permissions
- [ ] Email notification templates finalized

## Shadow Testing
- [x] 2 of 3 pilot clients running in shadow mode
- [ ] All 3 pilot clients achieving > 85% match score
- [ ] Zero critical discrepancies in last 3 consecutive runs
- [ ] Manager feedback incorporated into prompt

## Go-Live
- [ ] Rollout plan communicated to team
- [ ] Client communications sent (if applicable)
- [ ] Monitoring dashboard configured
- [ ] Escalation path documented for failures
- [ ] Rollback plan tested

## Post-Launch (Week 1)
- [ ] Daily monitoring of automated outputs
- [ ] Track cycle time and error rate metrics
- [ ] Collect manager feedback on AI commentary quality
- [ ] Address any edge cases or exceptions`,
    version: 1,
    status: "draft",
    created_at: "2026-03-14T00:00:00Z",
    updated_at: "2026-03-14T00:00:00Z",
  },
  {
    id: "sample-del-004",
    workflow_id: "sample-wf-001",
    blueprint_id: "sample-bp-001",
    type: "rollout_plan",
    title: "Rollout Plan — Financial Reporting Automation",
    generated_content: `# Rollout Plan: Monthly Client Financial Reporting Automation

## Phase 1: Pilot (Current — 3 clients)
**Timeline:** March 12–31, 2026
**Scope:** Data export + AI commentary for 3 pilot clients
**Success criteria:** > 85% match score, < 5% error rate, positive manager feedback

## Phase 2: Controlled Expansion (20 clients)
**Timeline:** April 1–30, 2026
**Scope:** Extend Phase 1 automation to top 20 clients by revenue
**Prerequisites:** Phase 1 success criteria met, template-based report compilation added
**Rollout cadence:** 5 clients/week over 4 weeks

## Phase 3: Full Rollout (All clients)
**Timeline:** May 1–31, 2026
**Scope:** All active clients on automated reporting
**Prerequisites:** Phase 2 stable for 2 consecutive months, no critical issues
**Support model:** On-call engineer for first month, then standard ops support

## Risk Mitigation
- **Data accuracy:** Every automated report cross-checked against source data
- **Client perception:** No client-visible changes in Phase 1 (shadow mode)
- **Rollback:** Manual process remains available as fallback for any client
- **Quality:** AI commentary reviewed by manager before delivery (human-in-the-loop)`,
    version: 1,
    status: "review",
    created_at: "2026-03-13T00:00:00Z",
    updated_at: "2026-03-14T00:00:00Z",
  },
];

// ─── Deployment Sprint ───────────────────────────────────────────────────────

import type {
  DeploymentSprint,
  SprintTask,
  ShadowRunComparison,
} from "@/types";

export const sampleSprint: DeploymentSprint = {
  id: "sample-sprint-001",
  workflow_id: "sample-wf-001",
  blueprint_id: "sample-bp-001",
  name: "Phase 1 — Data Export & AI Commentary",
  phase: "shadow",
  target_workflows: [
    "Scheduled data export & statement generation",
    "AI-powered management commentary",
  ],
  success_metrics: [
    {
      name: "Cycle Time",
      baseline: 3.2,
      target: 1.5,
      current: 1.8,
      unit: "hrs",
    },
    {
      name: "Manual Touches",
      baseline: 7,
      target: 3,
      current: 4,
      unit: "steps",
    },
    {
      name: "Error Rate",
      baseline: 12,
      target: 5,
      current: 6,
      unit: "%",
    },
    {
      name: "Commentary Draft Time",
      baseline: 60,
      target: 10,
      current: 12,
      unit: "min",
    },
  ],
  started_at: "2026-03-12T00:00:00Z",
  completed_at: null,
  created_at: "2026-03-12T00:00:00Z",
};

export const sampleSprintTasks: SprintTask[] = [
  // Integration tasks
  {
    id: "sample-task-01",
    sprint_id: "sample-sprint-001",
    category: "integration",
    title: "Connect QuickBooks Online API",
    description:
      "Set up OAuth2 credentials and establish a read connection to QuickBooks Online for trial balance and financial statement data.",
    status: "done",
    assignee: "Ops Team",
    order: 1,
    blocked_by: [],
    notes: "OAuth tokens stored securely. Read-only scope configured.",
    completed_at: "2026-03-13T00:00:00Z",
    created_at: "2026-03-12T00:00:00Z",
  },
  {
    id: "sample-task-02",
    sprint_id: "sample-sprint-001",
    category: "integration",
    title: "Set up scheduled data export (month-end + 2 days)",
    description:
      "Configure cron job to automatically export trial balance from QuickBooks after month-end close.",
    status: "done",
    assignee: "Ops Team",
    order: 2,
    blocked_by: ["sample-task-01"],
    notes: null,
    completed_at: "2026-03-14T00:00:00Z",
    created_at: "2026-03-12T00:00:00Z",
  },
  // Agent setup tasks
  {
    id: "sample-task-03",
    sprint_id: "sample-sprint-001",
    category: "agent_setup",
    title: "Configure Data Pull Agent",
    description:
      "Stand up the agent that fetches trial balance data and generates P&L, Balance Sheet, and Cash Flow statements automatically.",
    status: "done",
    assignee: "AI Team",
    order: 3,
    blocked_by: ["sample-task-02"],
    notes: null,
    completed_at: "2026-03-15T00:00:00Z",
    created_at: "2026-03-12T00:00:00Z",
  },
  {
    id: "sample-task-04",
    sprint_id: "sample-sprint-001",
    category: "agent_setup",
    title: "Configure Commentary Draft Agent",
    description:
      "Stand up the AI agent that generates management commentary and variance analysis from financial data.",
    status: "in_progress",
    assignee: "AI Team",
    order: 4,
    blocked_by: ["sample-task-03"],
    notes: "Prompt tuning in progress — output quality at 85%.",
    completed_at: null,
    created_at: "2026-03-12T00:00:00Z",
  },
  // Prompt config
  {
    id: "sample-task-05",
    sprint_id: "sample-sprint-001",
    category: "prompt_config",
    title: "Design commentary prompt with client context injection",
    description:
      "Create structured prompt template that includes current period data, prior period comparison, and client-specific context for personalized commentary.",
    status: "in_progress",
    assignee: "AI Team",
    order: 5,
    blocked_by: ["sample-task-04"],
    notes: "Testing with 3 sample clients. Need to add industry-specific language.",
    completed_at: null,
    created_at: "2026-03-12T00:00:00Z",
  },
  // Approval gate
  {
    id: "sample-task-06",
    sprint_id: "sample-sprint-001",
    category: "approval_gate",
    title: "Define manager review checkpoint",
    description:
      "Set up the approval gate where a manager reviews AI-generated commentary before it's included in the final report.",
    status: "todo",
    assignee: "Ops Lead",
    order: 6,
    blocked_by: ["sample-task-05"],
    notes: null,
    completed_at: null,
    created_at: "2026-03-12T00:00:00Z",
  },
  // QA check
  {
    id: "sample-task-07",
    sprint_id: "sample-sprint-001",
    category: "qa_check",
    title: "Validate financial accuracy of generated statements",
    description:
      "Cross-reference auto-generated statements against manual statements for 5 test clients to ensure 100% accuracy.",
    status: "todo",
    assignee: "QA",
    order: 7,
    blocked_by: ["sample-task-03"],
    notes: null,
    completed_at: null,
    created_at: "2026-03-12T00:00:00Z",
  },
  {
    id: "sample-task-08",
    sprint_id: "sample-sprint-001",
    category: "qa_check",
    title: "Review AI commentary quality for hallucinations",
    description:
      "Audit AI-generated commentary against actual financial data to ensure all claims are factually grounded.",
    status: "todo",
    assignee: "QA",
    order: 8,
    blocked_by: ["sample-task-05"],
    notes: null,
    completed_at: null,
    created_at: "2026-03-12T00:00:00Z",
  },
  // Rollout
  {
    id: "sample-task-09",
    sprint_id: "sample-sprint-001",
    category: "rollout",
    title: "Shadow-run with 3 pilot clients",
    description:
      "Run the automated pipeline in parallel with the manual process for 3 clients. Compare outputs side-by-side.",
    status: "in_progress",
    assignee: "Ops Team",
    order: 9,
    blocked_by: ["sample-task-07", "sample-task-08"],
    notes: "2 of 3 pilot clients running. Third starts next week.",
    completed_at: null,
    created_at: "2026-03-12T00:00:00Z",
  },
  // Optimization
  {
    id: "sample-task-10",
    sprint_id: "sample-sprint-001",
    category: "optimization",
    title: "Tune commentary prompts based on shadow-run feedback",
    description:
      "Incorporate manager feedback from shadow runs to improve AI commentary quality and reduce required edits.",
    status: "todo",
    assignee: "AI Team",
    order: 10,
    blocked_by: ["sample-task-09"],
    notes: null,
    completed_at: null,
    created_at: "2026-03-12T00:00:00Z",
  },
];

export const sampleShadowRuns: ShadowRunComparison[] = [
  {
    id: "sample-sr-01",
    sprint_id: "sample-sprint-001",
    run_date: "2026-03-20",
    human_output_summary:
      "Manual financial report for Client A: 3.1 hours, standard P&L with 2 variance callouts, commentary focused on revenue growth and expense trends.",
    agent_output_summary:
      "Auto-generated report for Client A: 12 minutes processing. P&L matched 100%. Commentary identified 4 variance callouts (2 additional insights on cash flow trends). Minor phrasing adjustment needed on industry context.",
    match_score: 88,
    discrepancies: [
      "Agent included cash flow variance commentary not in human version",
      "Industry-specific terminology slightly different",
    ],
    verdict: "pass",
    notes: "Agent actually surfaced insights the human missed. Commentary tone needs minor adjustment.",
    created_at: "2026-03-20T00:00:00Z",
  },
  {
    id: "sample-sr-02",
    sprint_id: "sample-sprint-001",
    run_date: "2026-03-21",
    human_output_summary:
      "Manual financial report for Client B: 3.4 hours, complex multi-entity consolidation. 5 variance callouts with detailed narrative.",
    agent_output_summary:
      "Auto-generated report for Client B: 15 minutes processing. Statement generation matched 100%. Commentary covered 4 of 5 variance callouts. Missed nuance on inter-entity elimination.",
    match_score: 76,
    discrepancies: [
      "Missed inter-entity elimination nuance in variance analysis",
      "Did not flag related-party transaction context",
    ],
    verdict: "needs_tuning",
    notes: "Multi-entity clients need additional prompt context. Adding consolidation rules to prompt template.",
    created_at: "2026-03-21T00:00:00Z",
  },
];

// ─── Helper ──────────────────────────────────────────────────────────────────

export function isSampleId(id: string): boolean {
  return id.startsWith("sample-");
}
