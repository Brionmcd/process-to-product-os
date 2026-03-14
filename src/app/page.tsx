import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import {
  sampleWorkflow,
  sampleOpportunities,
  sampleBlueprint,
  sampleSprint,
  sampleSprintTasks,
} from "@/lib/sample-data";
import {
  Workflow,
  Lightbulb,
  TrendingUp,
  Plus,
  FileStack,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Clock,
  Rocket,
  Shield,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function DashboardPage() {
  const nowCount = sampleOpportunities.filter((o) => o.phase === "now").length;
  const nextCount = sampleOpportunities.filter((o) => o.phase === "next").length;
  const laterCount = sampleOpportunities.filter((o) => o.phase === "later").length;
  const topOpps = sampleOpportunities
    .sort((a, b) => (b.priority_score ?? 0) - (a.priority_score ?? 0))
    .slice(0, 3);
  return (
    <div className="space-y-6">
      {/* Hero onboarding section — "show the magic early" */}
      <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] via-primary/[0.03] to-transparent p-6 md:p-8">
        <div className="absolute top-4 right-4 opacity-10">
          <Sparkles className="h-24 w-24 text-primary" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
              <Zap className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Get Started
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Turn your processes into products
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Map a workflow, and our AI will identify automation opportunities,
            score them by impact, and generate an implementation blueprint — in minutes, not weeks.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <LinkButton href="/workflows/new">
              <Plus className="mr-2 h-4 w-4" />
              Map Your First Workflow
            </LinkButton>
            <LinkButton href="/workflows" variant="outline">
              <Workflow className="mr-2 h-4 w-4" />
              Browse Workflows
            </LinkButton>
          </div>
        </div>
      </div>

      {/* How it works — progressive disclosure */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-start gap-3 rounded-lg border p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            1
          </div>
          <div>
            <h3 className="text-base font-semibold">Map</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Walk through your process step by step. We classify each as mechanical, judgment, or hybrid.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            2
          </div>
          <div>
            <h3 className="text-base font-semibold">Score</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              AI identifies automation opportunities and ranks them by impact, effort, and risk.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            3
          </div>
          <div>
            <h3 className="text-base font-semibold">Build</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Get a prioritized blueprint with ROI projections and client-ready deliverables.
            </p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">
              Active Workflows
            </CardTitle>
            <Workflow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-sm text-muted-foreground">
              1 mapped, 1 with blueprint
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">
              Opportunities Found
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sampleOpportunities.length}</div>
            <p className="text-sm text-muted-foreground">
              {nowCount} now, {nextCount} next, {laterCount} later
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">
              Blueprints Ready
            </CardTitle>
            <FileStack className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-sm text-muted-foreground">Pending approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">
              Hours Saved / Month
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sampleBlueprint.expected_roi.hours_saved_monthly}</div>
            <p className="text-sm text-muted-foreground">
              Projected from blueprint
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Deployment Sprint */}
      <Card className="border-purple-200/60 bg-purple-50/30 dark:border-purple-800/40 dark:bg-purple-950/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-600" />
              <CardTitle className="text-lg">Active Deployment</CardTitle>
              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                Shadow Mode
              </Badge>
            </div>
            <LinkButton href={`/deployments/${sampleSprint.id}`} variant="ghost" size="sm">
              View Sprint
              <ArrowRight className="ml-1 h-3 w-3" />
            </LinkButton>
          </div>
          <CardDescription>
            {sampleSprint.name} — {sampleWorkflow.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-base font-medium">Sprint Progress</span>
                <span className="text-xs text-muted-foreground">
                  {sampleSprintTasks.filter((t) => t.status === "done").length}/{sampleSprintTasks.length} tasks
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-purple-600 transition-all"
                  style={{ width: `${Math.round((sampleSprintTasks.filter((t) => t.status === "done").length / sampleSprintTasks.length) * 100)}%` }}
                />
              </div>
              <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                  {sampleSprintTasks.filter((t) => t.status === "done").length} done
                </span>
                <span className="flex items-center gap-1">
                  <Loader2 className="h-3 w-3 text-blue-600" />
                  {sampleSprintTasks.filter((t) => t.status === "in_progress").length} in progress
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {sampleSprint.success_metrics.slice(0, 2).map((metric) => (
                <div key={metric.name} className="rounded-md border bg-background p-2">
                  <p className="text-xs text-muted-foreground">{metric.name}</p>
                  <p className="text-base font-bold">{metric.current ?? "--"} <span className="text-xs font-normal text-muted-foreground">{metric.unit}</span></p>
                  <p className="text-xs text-muted-foreground">Target: {metric.target}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Two-column: AI Insights + Top Opportunities */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* AI Insights — proactive intelligence from sample workflow */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <CardTitle>AI Insights</CardTitle>
            </div>
            <CardDescription>
              Proactive recommendations from your sample workflow.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-primary/10 bg-primary/[0.03] p-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <p className="text-base font-medium">Highest-impact opportunity</p>
              </div>
              <p className="text-sm text-muted-foreground">
                &ldquo;Auto-generate management commentary&rdquo; could save <span className="font-medium text-foreground">50 min per client per month</span>. This step has a 12% error rate — the highest in the workflow.
              </p>
              <LinkButton href="/opportunities" variant="link" size="sm" className="p-0 h-auto text-xs">
                View opportunity <ArrowRight className="ml-1 h-3 w-3" />
              </LinkButton>
            </div>

            <div className="rounded-lg border border-amber-200/60 bg-amber-50/50 p-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5 text-amber-600" />
                <p className="text-base font-medium">Blueprint ROI projection</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Full automation blueprint projects <span className="font-medium text-foreground">{sampleBlueprint.expected_roi.hours_saved_monthly} hours saved/month</span> with a {sampleBlueprint.expected_roi.cycle_time_reduction_pct}% cycle time reduction.
              </p>
              <LinkButton href="/blueprints/sample-bp-001" variant="link" size="sm" className="p-0 h-auto text-xs">
                View blueprint <ArrowRight className="ml-1 h-3 w-3" />
              </LinkButton>
            </div>

            <div className="rounded-lg border p-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <Target className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-base font-medium">Quick win detected</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Steps 1 &amp; 3 (data export + statement generation) are fully mechanical with low error rates. Automate these first for an easy <span className="font-medium text-foreground">25-minute savings</span> per run.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Top Opportunities from sample data */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                <CardTitle>Top Opportunities</CardTitle>
              </div>
              <CardDescription>
                Highest-impact automations to tackle first.
              </CardDescription>
            </div>
            <LinkButton href="/opportunities" variant="ghost" size="sm">
              View all
              <ArrowRight className="ml-1 h-3 w-3" />
            </LinkButton>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topOpps.map((opp, i) => (
                <div key={opp.id} className="flex items-start gap-3 rounded-lg border p-3">
                  <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    i === 0 ? "bg-red-100 text-red-700" : i === 1 ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {opp.priority_score}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-medium leading-snug">{opp.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">
                      {opp.description}
                    </p>
                    <div className="mt-1.5 flex gap-1.5">
                      <Badge variant="secondary" className="text-xs">
                        Impact {opp.impact_score}/5
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Effort {opp.effort_score}/5
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {opp.phase}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
