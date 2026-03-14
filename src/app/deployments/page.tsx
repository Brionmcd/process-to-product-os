import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { SampleBanner, SampleBadge } from "@/components/features/sample-banner";
import {
  sampleSprint,
  sampleSprintTasks,
  sampleWorkflow,
  isSampleId,
} from "@/lib/sample-data";
import type { SprintPhase } from "@/types";
import {
  Rocket,
  Plus,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  Loader2,
  Target,
  Sparkles,
  Shield,
} from "lucide-react";

const phaseConfig: Record<
  SprintPhase,
  { label: string; className: string; icon: React.ReactNode }
> = {
  planning: {
    label: "Planning",
    className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    icon: <Clock className="h-3 w-3" />,
  },
  building: {
    label: "Building",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    icon: <Loader2 className="h-3 w-3" />,
  },
  shadow: {
    label: "Shadow Mode",
    className:
      "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    icon: <Shield className="h-3 w-3" />,
  },
  live: {
    label: "Live",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  optimizing: {
    label: "Optimizing",
    className: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
    icon: <Target className="h-3 w-3" />,
  },
  completed: {
    label: "Completed",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
};

// Phase progression for the visual pipeline
const phaseOrder: SprintPhase[] = [
  "planning",
  "building",
  "shadow",
  "live",
  "optimizing",
  "completed",
];

export default function DeploymentsPage() {
  const sprints = [
    {
      ...sampleSprint,
      workflow_name: sampleWorkflow.name,
      tasks: sampleSprintTasks,
    },
  ];

  const getTaskStats = (tasks: typeof sampleSprintTasks) => {
    const done = tasks.filter((t) => t.status === "done").length;
    const inProgress = tasks.filter((t) => t.status === "in_progress").length;
    const total = tasks.length;
    return { done, inProgress, total, pct: Math.round((done / total) * 100) };
  };

  return (
    <div className="space-y-6">
      <SampleBanner />

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deployments</h1>
          <p className="text-muted-foreground">
            Track automation sprints from build to production.
          </p>
        </div>
        <LinkButton href="/blueprints">
          <Plus className="mr-2 h-4 w-4" />
          New Sprint from Blueprint
        </LinkButton>
      </div>

      {/* Lifecycle overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <CardTitle className="text-base font-medium">
              Deployment Lifecycle
            </CardTitle>
          </div>
          <CardDescription>
            Every automation follows this path: Plan → Build → Shadow → Live →
            Optimize
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-1">
            {phaseOrder.map((phase, i) => {
              const config = phaseConfig[phase];
              const isActive =
                sprints.length > 0 && sprints[0].phase === phase;
              const isPast =
                sprints.length > 0 &&
                phaseOrder.indexOf(sprints[0].phase) > i;
              return (
                <div key={phase} className="flex items-center flex-1">
                  <div
                    className={`flex-1 flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-all ${
                      isActive
                        ? config.className + " ring-2 ring-primary/30"
                        : isPast
                          ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                          : "bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    {isPast ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : isActive ? (
                      config.icon
                    ) : (
                      <Circle className="h-3 w-3" />
                    )}
                    {config.label}
                  </div>
                  {i < phaseOrder.length - 1 && (
                    <ArrowRight className="h-3 w-3 text-muted-foreground/40 mx-0.5 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {sprints.length === 0 ? (
        <Card>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="relative mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5">
                  <Rocket className="h-8 w-8 text-primary/60" />
                </div>
                <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-3 w-3 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">
                No deployment sprints yet
              </h3>
              <p className="text-base text-muted-foreground max-w-md mb-5">
                Deployment sprints turn approved blueprints into live
                automations. Approve a blueprint and create your first sprint.
              </p>
              <LinkButton href="/blueprints">
                <Sparkles className="mr-2 h-4 w-4" />
                View Blueprints
              </LinkButton>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sprints.map((sprint) => {
            const phase = phaseConfig[sprint.phase];
            const stats = getTaskStats(sprint.tasks);
            return (
              <Card
                key={sprint.id}
                className="group hover:shadow-sm transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle>{sprint.name}</CardTitle>
                        {isSampleId(sprint.id) && <SampleBadge />}
                      </div>
                      <CardDescription>
                        {sprint.workflow_name} &middot; Started{" "}
                        {sprint.started_at
                          ? new Date(sprint.started_at).toLocaleDateString()
                          : "Not started"}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={phase.className}>
                        {phase.icon}
                        {phase.label}
                      </Badge>
                      <LinkButton
                        href={`/deployments/${sprint.id}`}
                        variant="outline"
                        size="sm"
                      >
                        View Sprint
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </LinkButton>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-medium text-muted-foreground">
                        Sprint Progress
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {stats.done}/{stats.total} tasks complete ({stats.pct}%)
                      </p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary transition-all"
                        style={{ width: `${stats.pct}%` }}
                      />
                    </div>
                    <div className="flex gap-3 mt-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        {stats.done} done
                      </span>
                      <span className="flex items-center gap-1">
                        <Loader2 className="h-3 w-3 text-blue-600" />
                        {stats.inProgress} in progress
                      </span>
                      <span className="flex items-center gap-1">
                        <Circle className="h-3 w-3" />
                        {stats.total - stats.done - stats.inProgress} remaining
                      </span>
                    </div>
                  </div>

                  {/* Success metrics */}
                  <div className="grid gap-3 sm:grid-cols-4">
                    {sprint.success_metrics.map((metric) => {
                      const progress =
                        metric.current !== null
                          ? Math.round(
                              ((metric.baseline - metric.current) /
                                (metric.baseline - metric.target)) *
                                100
                            )
                          : 0;
                      return (
                        <div
                          key={metric.name}
                          className="rounded-lg border p-3"
                        >
                          <p className="text-xs text-muted-foreground mb-1">
                            {metric.name}
                          </p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold">
                              {metric.current ?? "--"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {metric.unit}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Target: {metric.target} {metric.unit} &middot;{" "}
                            {Math.min(100, Math.max(0, progress))}% there
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Target automations */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1.5">
                      Target Automations
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {sprint.target_workflows.map((tw) => (
                        <Badge key={tw} variant="outline">
                          {tw}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
