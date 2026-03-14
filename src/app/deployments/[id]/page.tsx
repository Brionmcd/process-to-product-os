"use client";

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
  sampleShadowRuns,
  sampleWorkflow,
  isSampleId,
} from "@/lib/sample-data";
import type { TaskCategory, TaskStatus, SprintPhase } from "@/types";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  Loader2,
  AlertTriangle,
  Shield,
  Plug,
  Bot,
  MessageSquare,
  ShieldCheck,
  TestTube,
  Rocket,
  Settings,
  Target,
  ArrowRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const categoryConfig: Record<
  TaskCategory,
  { label: string; icon: React.ReactNode; color: string }
> = {
  integration: {
    label: "Integration",
    icon: <Plug className="h-3.5 w-3.5" />,
    color: "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
  },
  agent_setup: {
    label: "Agent Setup",
    icon: <Bot className="h-3.5 w-3.5" />,
    color:
      "bg-violet-50 border-violet-200 dark:bg-violet-950 dark:border-violet-800",
  },
  prompt_config: {
    label: "Prompt Config",
    icon: <MessageSquare className="h-3.5 w-3.5" />,
    color:
      "bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800",
  },
  approval_gate: {
    label: "Approval Gate",
    icon: <ShieldCheck className="h-3.5 w-3.5" />,
    color:
      "bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800",
  },
  qa_check: {
    label: "QA Check",
    icon: <TestTube className="h-3.5 w-3.5" />,
    color:
      "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
  },
  rollout: {
    label: "Rollout",
    icon: <Rocket className="h-3.5 w-3.5" />,
    color:
      "bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800",
  },
  optimization: {
    label: "Optimization",
    icon: <Settings className="h-3.5 w-3.5" />,
    color: "bg-cyan-50 border-cyan-200 dark:bg-cyan-950 dark:border-cyan-800",
  },
};

const statusConfig: Record<
  TaskStatus,
  { label: string; icon: React.ReactNode; className: string }
> = {
  done: {
    label: "Done",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    className: "text-green-600",
  },
  in_progress: {
    label: "In Progress",
    icon: <Loader2 className="h-3.5 w-3.5" />,
    className: "text-blue-600",
  },
  blocked: {
    label: "Blocked",
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
    className: "text-red-600",
  },
  todo: {
    label: "To Do",
    icon: <Circle className="h-3.5 w-3.5" />,
    className: "text-muted-foreground",
  },
};

const phaseConfig: Record<SprintPhase, { label: string; className: string }> = {
  planning: {
    label: "Planning",
    className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
  building: {
    label: "Building",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
  shadow: {
    label: "Shadow Mode",
    className:
      "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  },
  live: {
    label: "Live",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  },
  optimizing: {
    label: "Optimizing",
    className: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
  },
  completed: {
    label: "Completed",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
};

const verdictConfig: Record<
  "pass" | "needs_tuning" | "fail",
  { label: string; className: string; icon: React.ReactNode }
> = {
  pass: {
    label: "Pass",
    className: "bg-green-100 text-green-700",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  needs_tuning: {
    label: "Needs Tuning",
    className: "bg-amber-100 text-amber-700",
    icon: <Settings className="h-3 w-3" />,
  },
  fail: {
    label: "Fail",
    className: "bg-red-100 text-red-700",
    icon: <AlertTriangle className="h-3 w-3" />,
  },
};

// Group tasks by category
const categoryOrder: TaskCategory[] = [
  "integration",
  "agent_setup",
  "prompt_config",
  "approval_gate",
  "qa_check",
  "rollout",
  "optimization",
];

export default function SprintDetailPage() {
  const sprint = sampleSprint;
  const tasks = sampleSprintTasks;
  const shadowRuns = sampleShadowRuns;
  const isSample = isSampleId(sprint.id);
  const phase = phaseConfig[sprint.phase];

  const doneCount = tasks.filter((t) => t.status === "done").length;
  const progressPct = Math.round((doneCount / tasks.length) * 100);

  // Group tasks
  const tasksByCategory = categoryOrder
    .map((cat) => ({
      category: cat,
      config: categoryConfig[cat],
      tasks: tasks.filter((t) => t.category === cat),
    }))
    .filter((group) => group.tasks.length > 0);

  return (
    <div className="space-y-6">
      {isSample && <SampleBanner />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LinkButton href="/deployments" variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </LinkButton>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {sprint.name}
              </h1>
              {isSample && <SampleBadge />}
              <Badge variant="secondary" className={phase.className}>
                {phase.label}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {sampleWorkflow.name} &middot; Started{" "}
              {sprint.started_at
                ? new Date(sprint.started_at).toLocaleDateString()
                : "Not started"}
            </p>
          </div>
        </div>
      </div>

      {/* Progress + Metrics row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Overall progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Sprint Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl font-bold">{progressPct}%</span>
                  <span className="text-sm text-muted-foreground">
                    {doneCount}/{tasks.length} tasks
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted">
                  <div
                    className="h-3 rounded-full bg-primary transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {(["done", "in_progress", "blocked", "todo"] as TaskStatus[]).map(
                  (status) => {
                    const config = statusConfig[status];
                    const count = tasks.filter(
                      (t) => t.status === status
                    ).length;
                    return (
                      <div key={status} className="rounded-md border p-2">
                        <div
                          className={`flex items-center justify-center gap-1 ${config.className}`}
                        >
                          {config.icon}
                          <span className="text-lg font-bold">{count}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {config.label}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Target className="h-4 w-4" />
              Success Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {sprint.success_metrics.map((metric) => {
                const progress =
                  metric.current !== null
                    ? Math.min(
                        100,
                        Math.max(
                          0,
                          Math.round(
                            ((metric.baseline - metric.current) /
                              (metric.baseline - metric.target)) *
                              100
                          )
                        )
                      )
                    : 0;
                const isImproving =
                  metric.current !== null && metric.current < metric.baseline;
                return (
                  <div key={metric.name} className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">
                      {metric.name}
                    </p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-bold">
                        {metric.current ?? "--"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {metric.unit}
                      </span>
                      {isImproving && (
                        <TrendingDown className="h-3 w-3 text-green-600 ml-1" />
                      )}
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted mt-2">
                      <div
                        className="h-1.5 rounded-full bg-primary transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        Baseline: {metric.baseline}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Target: {metric.target}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task board by category */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Task Board</h2>
        <div className="space-y-4">
          {tasksByCategory.map((group) => (
            <Card key={group.category}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    {group.config.icon}
                    {group.config.label}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {group.tasks.filter((t) => t.status === "done").length}/
                    {group.tasks.length} done
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {group.tasks.map((task) => {
                    const status = statusConfig[task.status];
                    return (
                      <div
                        key={task.id}
                        className={`rounded-lg border p-3 ${group.config.color}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5 min-w-0">
                            <div className={`mt-0.5 ${status.className}`}>
                              {status.icon}
                            </div>
                            <div className="min-w-0">
                              <p
                                className={`text-base font-medium ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}
                              >
                                {task.title}
                              </p>
                              {task.description && (
                                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                                  {task.description}
                                </p>
                              )}
                              {task.notes && (
                                <p className="text-sm text-muted-foreground/80 mt-1 italic">
                                  💬 {task.notes}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {task.assignee && (
                              <Badge variant="outline" className="text-xs">
                                {task.assignee}
                              </Badge>
                            )}
                            <Badge
                              variant="secondary"
                              className={`text-xs ${status.className}`}
                            >
                              {status.label}
                            </Badge>
                          </div>
                        </div>
                        {task.blocked_by.length > 0 && (
                          <div className="flex items-center gap-1 mt-2 ml-6">
                            <span className="text-xs text-muted-foreground">
                              Depends on:
                            </span>
                            {task.blocked_by.map((depId) => {
                              const dep = tasks.find((t) => t.id === depId);
                              return (
                                <Badge
                                  key={depId}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {dep ? dep.title.slice(0, 30) : depId}
                                  {dep?.status === "done" && (
                                    <CheckCircle2 className="h-2.5 w-2.5 ml-0.5 text-green-600" />
                                  )}
                                </Badge>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Shadow Run Comparisons */}
      {shadowRuns.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Shadow Run Comparisons
          </h2>
          <div className="space-y-4">
            {shadowRuns.map((run) => {
              const verdict = verdictConfig[run.verdict];
              return (
                <Card key={run.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">
                          Run: {new Date(run.run_date).toLocaleDateString()}
                        </CardTitle>
                        <CardDescription>
                          Agent vs. Human comparison
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-2xl font-bold">{run.match_score}%</p>
                          <p className="text-xs text-muted-foreground">
                            Match Score
                          </p>
                        </div>
                        <Badge className={verdict.className}>
                          {verdict.icon}
                          {verdict.label}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border p-3">
                        <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                          👤 Human Output
                        </p>
                        <p className="text-base">
                          {run.human_output_summary}
                        </p>
                      </div>
                      <div className="rounded-lg border border-primary/20 bg-primary/[0.02] p-3">
                        <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                          🤖 Agent Output
                        </p>
                        <p className="text-base">
                          {run.agent_output_summary}
                        </p>
                      </div>
                    </div>

                    {run.discrepancies.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Discrepancies
                        </p>
                        <ul className="space-y-1">
                          {run.discrepancies.map((d, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <AlertTriangle className="h-3 w-3 mt-0.5 text-amber-500 shrink-0" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {run.notes && (
                      <div className="rounded-md bg-muted/50 p-2">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Notes:</span>{" "}
                          {run.notes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
