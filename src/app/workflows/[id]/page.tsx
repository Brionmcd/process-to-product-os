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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  ArrowLeft,
  Clock,
  Edit,
  Lightbulb,
  Zap,
} from "lucide-react";
import { SampleBanner, SampleBadge } from "@/components/features/sample-banner";
import { sampleWorkflow, sampleSteps, isSampleId } from "@/lib/sample-data";
import type {
  Workflow,
  WorkflowStatus,
  WorkflowStep,
  StepType,
} from "@/types";

const statusConfig: Record<
  WorkflowStatus,
  { label: string; className: string }
> = {
  draft: {
    label: "Draft",
    className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
  mapped: {
    label: "Mapped",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
  scored: {
    label: "Scored",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  },
  blueprint_generated: {
    label: "Blueprint Generated",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  deploying: {
    label: "Deploying",
    className:
      "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300",
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
    className:
      "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
  },
  active: {
    label: "Active",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  },
};

const stepTypeConfig: Record<StepType, { label: string; className: string }> = {
  mechanical: {
    label: "Mechanical",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  hybrid: {
    label: "Hybrid",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  },
  judgment: {
    label: "Judgment",
    className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  },
};

// Uses centralized sample data — will be replaced with Supabase query

function getBottleneckScore(step: WorkflowStep): number {
  const duration = step.duration_minutes ?? 0;
  const errorRate = step.error_rate ?? 0;
  return duration * errorRate;
}

export default async function WorkflowDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // TODO: Fetch from Supabase using id
  const workflow = sampleWorkflow;
  const steps = sampleSteps;
  const isSample = isSampleId(id);
  const status = statusConfig[workflow.status];

  // Calculate bottleneck threshold (top 25% of duration * error_rate)
  const bottleneckScores = steps.map(getBottleneckScore);
  const sortedScores = [...bottleneckScores].sort((a, b) => b - a);
  const bottleneckThreshold = sortedScores[Math.floor(sortedScores.length * 0.25)] ?? 0;

  const totalDuration = steps.reduce(
    (sum, s) => sum + (s.duration_minutes ?? 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Sample data banner */}
      {isSample && <SampleBanner />}

      {/* Breadcrumb and back */}
      <div>
        <LinkButton
          href="/workflows"
          variant="ghost"
          size="sm"
          className="mb-2"
        >
          <ArrowLeft className="mr-1 h-3 w-3" />
          Back to Workflows
        </LinkButton>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              {workflow.name}
            </h1>
            <Badge variant="secondary" className={status.className}>
              {status.label}
            </Badge>
            {isSample && <SampleBadge />}
          </div>
          {workflow.description && (
            <p className="text-muted-foreground max-w-2xl">
              {workflow.description}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <LinkButton
            href={`/workflows/${id}/edit`}
            variant="outline"
            size="sm"
          >
            <Edit className="mr-1 h-3 w-3" />
            Edit
          </LinkButton>
          <LinkButton
            href="/opportunities"
            variant="outline"
            size="sm"
          >
            <Lightbulb className="mr-1 h-3 w-3" />
            Analyze Opportunities
          </LinkButton>
          <LinkButton href={`/blueprints/${id}`} size="sm">
            <Zap className="mr-1 h-3 w-3" />
            Generate Blueprint
          </LinkButton>
        </div>
      </div>

      {/* Metadata cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card size="sm">
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-1">Frequency</p>
            <p className="text-lg font-semibold capitalize">
              {workflow.frequency ?? "Not set"}
            </p>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-1">Pain Score</p>
            <p
              className={`text-lg font-semibold ${
                (workflow.pain_score ?? 0) >= 4
                  ? "text-red-600"
                  : (workflow.pain_score ?? 0) >= 3
                    ? "text-amber-600"
                    : ""
              }`}
            >
              {workflow.pain_score != null ? `${workflow.pain_score}/5` : "—"}
            </p>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-1">Total Steps</p>
            <p className="text-lg font-semibold">{steps.length}</p>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-1">
              Total Duration
            </p>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="text-lg font-semibold">
                {totalDuration >= 60
                  ? `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}m`
                  : `${totalDuration}m`}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trigger and output */}
      <div className="grid gap-4 lg:grid-cols-2">
        {workflow.trigger_description && (
          <Card size="sm">
            <CardHeader>
              <CardTitle className="text-base">Trigger</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base">{workflow.trigger_description}</p>
            </CardContent>
          </Card>
        )}
        {workflow.final_output && (
          <Card size="sm">
            <CardHeader>
              <CardTitle className="text-base">Final Output</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base">{workflow.final_output}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Steps table */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Steps</CardTitle>
          <CardDescription>
            Each step in the process, color-coded by type. Steps with high
            duration and error rates are flagged as bottlenecks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Order</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>System</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Duration</TableHead>
                <TableHead className="text-right">Error Rate</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {steps.map((step) => {
                const typeInfo = stepTypeConfig[step.step_type];
                const score = getBottleneckScore(step);
                const isBottleneck =
                  bottleneckThreshold > 0 && score >= bottleneckThreshold;

                return (
                  <TableRow
                    key={step.id}
                    className={
                      isBottleneck ? "bg-amber-50 dark:bg-amber-950/20" : ""
                    }
                  >
                    <TableCell className="font-medium">
                      {step.step_order}
                    </TableCell>
                    <TableCell>{step.action}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {step.system_name ?? "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={typeInfo.className}
                      >
                        {typeInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {step.duration_minutes != null
                        ? `${step.duration_minutes}m`
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      {step.error_rate != null
                        ? `${(step.error_rate * 100).toFixed(0)}%`
                        : "—"}
                    </TableCell>
                    <TableCell>
                      {isBottleneck && (
                        <div className="flex items-center" title="Bottleneck: high duration and error rate">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
