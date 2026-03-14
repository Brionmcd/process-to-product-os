import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Workflow as WorkflowIcon, Sparkles, ArrowRight } from "lucide-react";
import { SampleBanner, SampleBadge } from "@/components/features/sample-banner";
import { sampleWorkflow, isSampleId } from "@/lib/sample-data";
import type { Workflow, WorkflowStatus } from "@/types";

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

// Placeholder data - will be replaced with Supabase query
// Include sample workflow so users can see what a completed workflow looks like
const workflows: (Workflow & { steps_count?: number })[] = [sampleWorkflow];

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      {/* Sample data banner */}
      <SampleBanner />

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workflows</h1>
          <p className="text-muted-foreground">
            Map, analyze, and optimize your business processes.
          </p>
        </div>
        <LinkButton href="/workflows/new">
          <Plus className="mr-2 h-4 w-4" />
          New Workflow
        </LinkButton>
      </div>

      {/* Workflow table or empty state */}
      <Card>
        <CardHeader>
          <CardTitle>All Workflows</CardTitle>
          <CardDescription>
            A list of all mapped workflows and their current status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {workflows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="relative mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5">
                  <WorkflowIcon className="h-8 w-8 text-primary/60" />
                </div>
                <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-3 w-3 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">Map your first workflow</h3>
              <p className="text-base text-muted-foreground max-w-sm mb-5">
                Walk through your process step-by-step. Our AI will classify each step, identify automation targets, and generate a prioritized blueprint.
              </p>
              <LinkButton href="/workflows/new">
                <Plus className="mr-2 h-4 w-4" />
                Map New Workflow
              </LinkButton>
              <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
                Takes about 5 minutes <ArrowRight className="h-3 w-3" /> AI analysis in seconds
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead className="text-right">Pain Score</TableHead>
                  <TableHead className="text-right">Steps</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workflows.map((workflow) => {
                  const status = statusConfig[workflow.status];
                  return (
                    <TableRow key={workflow.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <LinkButton
                            href={`/workflows/${workflow.id}`}
                            variant="link"
                            size="sm"
                            className="p-0 h-auto font-medium"
                          >
                            {workflow.name}
                          </LinkButton>
                          {isSampleId(workflow.id) && <SampleBadge />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={status.className}
                        >
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {workflow.frequency ?? "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        {workflow.pain_score != null ? (
                          <span
                            className={
                              workflow.pain_score >= 4
                                ? "text-red-600 font-medium"
                                : workflow.pain_score >= 3
                                  ? "text-amber-600 font-medium"
                                  : "text-muted-foreground"
                            }
                          >
                            {workflow.pain_score}/5
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {workflow.steps_count ?? 0}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(workflow.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
