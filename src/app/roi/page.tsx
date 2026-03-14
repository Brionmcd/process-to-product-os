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
import { SampleBanner } from "@/components/features/sample-banner";
import { sampleMetrics, sampleBeforeAfterData } from "@/lib/sample-data";
import type { MetricSnapshot, MetricConfidence } from "@/types";
import {
  TrendingUp,
  Clock,
  MousePointerClick,
  RotateCcw,
  Timer,
  BarChart3,
  ArrowDownRight,
  Plus,
} from "lucide-react";

// Sample data so users can see what the ROI dashboard looks like
const metricSnapshots: MetricSnapshot[] = sampleMetrics;

// Before/after projections from the sample blueprint
const beforeAfterData: {
  label: string;
  before: number | null;
  after: number | null;
  unit: string;
  icon: React.ReactNode;
  confidence: MetricConfidence;
  improvementDirection: "down" | "up";
}[] = sampleBeforeAfterData.map((item) => ({
  ...item,
  icon:
    item.label === "Cycle Time" ? <Clock className="h-4 w-4" /> :
    item.label === "Manual Touches" ? <MousePointerClick className="h-4 w-4" /> :
    item.label === "Rework Rate" ? <RotateCcw className="h-4 w-4" /> :
    <Timer className="h-4 w-4" />,
}));

function getConfidenceBadgeVariant(
  confidence: MetricConfidence
): "default" | "secondary" | "outline" {
  switch (confidence) {
    case "measured":
      return "default";
    case "estimated":
      return "secondary";
    case "projected":
      return "outline";
  }
}

function getConfidenceLabel(confidence: MetricConfidence): string {
  switch (confidence) {
    case "measured":
      return "Measured";
    case "estimated":
      return "Estimated";
    case "projected":
      return "Projected";
  }
}

function MetricCard({
  label,
  value,
  unit,
  icon,
  description,
}: {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">{label}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value}
          <span className="text-sm font-normal text-muted-foreground ml-1">
            {unit}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function BeforeAfterCard({
  label,
  before,
  after,
  unit,
  icon,
  confidence,
  improvementDirection,
}: {
  label: string;
  before: number | null;
  after: number | null;
  unit: string;
  icon: React.ReactNode;
  confidence: MetricConfidence;
  improvementDirection: "down" | "up";
}) {
  const change =
    before !== null && after !== null && before !== 0
      ? improvementDirection === "down"
        ? ((before - after) / before) * 100
        : ((after - before) / before) * 100
      : before === 0 && after !== null && after > 0
        ? null // Can't compute % change from 0; show the absolute value instead
        : null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            {icon}
            {label}
          </CardTitle>
          <Badge variant={getConfidenceBadgeVariant(confidence)}>
            {getConfidenceLabel(confidence)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Before</p>
            <p className="text-lg font-semibold">
              {before !== null ? before : "--"}
              <span className="text-xs font-normal text-muted-foreground ml-0.5">
                {unit}
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">After</p>
            <p className="text-lg font-semibold text-primary">
              {after !== null ? after : "--"}
              <span className="text-xs font-normal text-muted-foreground ml-0.5">
                {unit}
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Change</p>
            {change !== null ? (
              <p className="text-lg font-semibold text-green-600 flex items-center gap-1">
                <ArrowDownRight className="h-4 w-4" />
                {Math.round(change)}%
              </p>
            ) : (
              <p className="text-lg font-semibold text-muted-foreground">--</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ROIPage() {
  const hasMetrics = metricSnapshots.length > 0;

  return (
    <div className="space-y-6">
      {/* Sample data banner */}
      <SampleBanner />

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            ROI & Impact Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track the impact of automation across your workflows.
          </p>
        </div>
      </div>

      {!hasMetrics ? (
        /* Empty state */
        <Card>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <TrendingUp className="h-10 w-10 text-muted-foreground/50 mb-3" />
              <h3 className="text-lg font-medium mb-1">
                No metrics recorded yet
              </h3>
              <p className="text-base text-muted-foreground max-w-md">
                Metrics will appear here once workflows have been analyzed and
                automation blueprints have been implemented. Start by mapping a
                workflow and generating a blueprint.
              </p>
              <LinkButton
                href="/workflows"
                variant="outline"
                size="sm"
                className="mt-4"
              >
                <Plus className="mr-2 h-3 w-3" />
                Map a Workflow
              </LinkButton>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Summary metrics */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Cycle Time"
              value={metricSnapshots[metricSnapshots.length - 1]?.cycle_time_hours?.toFixed(1) ?? "--"}
              unit="hrs"
              icon={<Clock className="h-4 w-4" />}
              description="Average time from start to finish"
            />
            <MetricCard
              label="Touch Count"
              value={metricSnapshots[metricSnapshots.length - 1]?.touch_count?.toString() ?? "--"}
              unit="touches"
              icon={<MousePointerClick className="h-4 w-4" />}
              description="Manual interventions per workflow run"
            />
            <MetricCard
              label="Rework Rate"
              value={metricSnapshots[metricSnapshots.length - 1]?.rework_rate != null ? `${(metricSnapshots[metricSnapshots.length - 1].rework_rate! * 100).toFixed(0)}` : "--"}
              unit="%"
              icon={<RotateCcw className="h-4 w-4" />}
              description="Percentage of runs requiring rework"
            />
            <MetricCard
              label="Hours Saved"
              value={metricSnapshots[metricSnapshots.length - 1]?.hours_saved?.toString() ?? "--"}
              unit="hrs/mo"
              icon={<Timer className="h-4 w-4" />}
              description="Total hours saved across all workflows"
            />
          </div>

          {/* Before/After comparisons */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Before / After Comparison
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {beforeAfterData.map((item) => (
                <BeforeAfterCard key={item.label} {...item} />
              ))}
            </div>
          </div>

          {/* Chart placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Impact Over Time
              </CardTitle>
              <CardDescription>
                Trend of key metrics over time as automations are deployed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 rounded-md border border-dashed bg-muted/30">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-base text-muted-foreground">
                    Chart coming soon
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Time series visualization of cycle time, touch count, and
                    hours saved.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
