"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { SampleBanner } from "@/components/features/sample-banner";
import { sampleOpportunities } from "@/lib/sample-data";
import type { Opportunity } from "@/types";
import {
  Lightbulb,
  Sparkles,
  ArrowUpRight,
  Zap,
  Clock,
  GripVertical,
} from "lucide-react";

// Placeholder data — includes sample data so users can see the Kanban in action
const opportunities: Opportunity[] = sampleOpportunities;

function getPriorityColor(score: number | null): string {
  if (score === null) return "bg-muted-foreground";
  if (score >= 80) return "bg-red-500";
  if (score >= 60) return "bg-orange-500";
  if (score >= 40) return "bg-yellow-500";
  return "bg-green-500";
}

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <Card size="sm">
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <div
            className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${getPriorityColor(opportunity.priority_score)}`}
          />
          <div className="min-w-0 flex-1">
            <p className="font-medium leading-snug">{opportunity.title}</p>
            {opportunity.description && (
              <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">
                {opportunity.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {opportunity.priority_score !== null && (
            <Badge variant="secondary">
              <Zap className="h-3 w-3" />
              {opportunity.priority_score}
            </Badge>
          )}
          {opportunity.impact_score !== null && (
            <Badge variant="outline">
              <ArrowUpRight className="h-3 w-3" />
              Impact {opportunity.impact_score}
            </Badge>
          )}
          {opportunity.effort_score !== null && (
            <Badge variant="outline">
              <Clock className="h-3 w-3" />
              Effort {opportunity.effort_score}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function KanbanColumn({
  title,
  phase,
  items,
}: {
  title: string;
  phase: string;
  items: Opportunity[];
}) {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">{title}</h3>
        <Badge variant="secondary">{items.length}</Badge>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-dashed border-border/60 bg-muted/30 p-2 min-h-[200px]">
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
            <GripVertical className="h-6 w-6 text-muted-foreground/40 mb-2" />
            <p className="text-xs text-muted-foreground">
              No {phase} opportunities yet
            </p>
          </div>
        ) : (
          items.map((item) => (
            <OpportunityCard key={item.id} opportunity={item} />
          ))
        )}
      </div>
    </div>
  );
}

export default function OpportunitiesPage() {
  const nowItems = opportunities.filter((o) => o.phase === "now");
  const nextItems = opportunities.filter((o) => o.phase === "next");
  const laterItems = opportunities.filter((o) => o.phase === "later");

  return (
    <div className="space-y-6">
      {/* Sample data banner */}
      <SampleBanner />

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Opportunity Board
          </h1>
          <p className="text-muted-foreground">
            Automation opportunities prioritized by impact and effort.
          </p>
        </div>
        <LinkButton href="/workflows">
          <Sparkles className="mr-2 h-4 w-4" />
          Analyze Workflow
        </LinkButton>
      </div>

      {/* Kanban board */}
      {opportunities.length === 0 ? (
        <Card>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="relative mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50">
                  <Lightbulb className="h-8 w-8 text-amber-500/60" />
                </div>
                <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-3 w-3 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">
                No opportunities discovered yet
              </h3>
              <p className="text-base text-muted-foreground max-w-md mb-5">
                Once you map a workflow, AI will analyze each step and surface the highest-value automation targets — scored by impact, effort, and risk.
              </p>
              <LinkButton href="/workflows/new">
                <Sparkles className="mr-2 h-4 w-4" />
                Map a Workflow to Start
              </LinkButton>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <KanbanColumn title="Now" phase="now" items={nowItems} />
          <KanbanColumn title="Next" phase="next" items={nextItems} />
          <KanbanColumn title="Later" phase="later" items={laterItems} />
        </div>
      )}
    </div>
  );
}
