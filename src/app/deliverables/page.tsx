"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Deliverable, DeliverableType } from "@/types";
import {
  FileText,
  ClipboardList,
  BarChart3,
  Rocket,
  Sparkles,
  History,
  Send,
  FileStack,
  CheckCircle2,
  Clock,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { SampleBanner, SampleBadge } from "@/components/features/sample-banner";
import { sampleDeliverables, isSampleId } from "@/lib/sample-data";

const templateLabels: Record<
  DeliverableType,
  { label: string; icon: React.ReactNode; description: string }
> = {
  sop: {
    label: "SOP",
    icon: <FileText className="h-4 w-4" />,
    description:
      "Standard Operating Procedures documenting automated and manual steps.",
  },
  report: {
    label: "Client Report",
    icon: <BarChart3 className="h-4 w-4" />,
    description:
      "Impact reports showing before/after metrics and ROI projections.",
  },
  checklist: {
    label: "Checklist",
    icon: <ClipboardList className="h-4 w-4" />,
    description:
      "Go-live and quality assurance checklists for deployment sprints.",
  },
  rollout_plan: {
    label: "Rollout Plan",
    icon: <Rocket className="h-4 w-4" />,
    description:
      "Phased rollout plans with timelines, success criteria, and risk mitigation.",
  },
  client_package: {
    label: "Client Package",
    icon: <FileStack className="h-4 w-4" />,
    description:
      "Complete client-ready packages combining reports, SOPs, and rollout plans.",
  },
};

const statusConfig: Record<
  Deliverable["status"],
  { label: string; className: string; icon: React.ReactNode }
> = {
  draft: {
    label: "Draft",
    className: "bg-gray-100 text-gray-700",
    icon: <Clock className="h-3 w-3" />,
  },
  review: {
    label: "In Review",
    className: "bg-amber-100 text-amber-700",
    icon: <Eye className="h-3 w-3" />,
  },
  approved: {
    label: "Approved",
    className: "bg-blue-100 text-blue-700",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  published: {
    label: "Published",
    className: "bg-green-100 text-green-700",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
};

const activeTypes: DeliverableType[] = [
  "sop",
  "report",
  "checklist",
  "rollout_plan",
];

export default function DeliverablesPage() {
  const [selectedType, setSelectedType] = useState<DeliverableType>("sop");
  const [viewingId, setViewingId] = useState<string | null>(
    sampleDeliverables.find((d) => d.type === "sop")?.id ?? null
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const deliverables = sampleDeliverables;

  const filteredDeliverables = deliverables.filter(
    (d) => d.type === selectedType
  );
  const viewingDeliverable = viewingId
    ? deliverables.find((d) => d.id === viewingId)
    : filteredDeliverables[0] ?? null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsGenerating(false);
    toast.success("Draft generated successfully");
  };

  const handlePublish = () => {
    toast.success("Publish coming soon");
  };

  return (
    <div className="space-y-6">
      <SampleBanner />

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Deliverables Studio
          </h1>
          <p className="text-muted-foreground">
            Generate SOPs, reports, checklists, and rollout plans from your
            workflows.
          </p>
        </div>
      </div>

      {/* Template selector and content area */}
      <Tabs
        defaultValue="sop"
        onValueChange={(value) => {
          const type = value as DeliverableType;
          setSelectedType(type);
          const first = deliverables.find((d) => d.type === type);
          setViewingId(first?.id ?? null);
        }}
      >
        <TabsList>
          {activeTypes.map((type) => (
            <TabsTrigger key={type} value={type}>
              {templateLabels[type].icon}
              <span className="hidden sm:inline">
                {templateLabels[type].label}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {activeTypes.map((type) => {
          const typeDeliverables = deliverables.filter(
            (d) => d.type === type
          );
          const currentDoc =
            type === selectedType ? viewingDeliverable : typeDeliverables[0];

          return (
            <TabsContent key={type} value={type}>
              <div className="grid gap-4 lg:grid-cols-3">
                {/* Main content area */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">
                              {currentDoc?.title ??
                                templateLabels[type].label}
                            </CardTitle>
                            {currentDoc && isSampleId(currentDoc.id) && (
                              <SampleBadge />
                            )}
                          </div>
                          <CardDescription className="mt-1">
                            {currentDoc
                              ? `Version ${currentDoc.version} · Last updated ${new Date(currentDoc.updated_at).toLocaleDateString()}`
                              : templateLabels[type].description}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {currentDoc && (
                            <Badge
                              className={
                                statusConfig[currentDoc.status].className
                              }
                            >
                              {statusConfig[currentDoc.status].icon}
                              {statusConfig[currentDoc.status].label}
                            </Badge>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleGenerate}
                            disabled={isGenerating}
                          >
                            <Sparkles className="mr-2 h-3 w-3" />
                            {isGenerating ? "Generating..." : "Generate Draft"}
                          </Button>
                          <Button
                            size="sm"
                            onClick={handlePublish}
                            disabled={!currentDoc}
                          >
                            <Send className="mr-2 h-3 w-3" />
                            Publish
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {currentDoc?.generated_content ? (
                        <div className="min-h-[400px] rounded-md border bg-muted/30 p-6">
                          <div className="prose prose-sm max-w-none">
                            <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                              {currentDoc.generated_content}
                            </pre>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                          <div className="mb-3 text-muted-foreground/50">
                            <FileText className="h-10 w-10" />
                          </div>
                          <h3 className="text-lg font-medium mb-1">
                            No{" "}
                            {templateLabels[type].label.toLowerCase()}{" "}
                            generated yet
                          </h3>
                          <p className="text-muted-foreground max-w-sm">
                            Click &ldquo;Generate Draft&rdquo; to create a{" "}
                            {templateLabels[type].label.toLowerCase()} from
                            your workflow data.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Version history sidebar */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <History className="h-4 w-4" />
                        Documents
                      </CardTitle>
                      <CardDescription>
                        {typeDeliverables.length} {templateLabels[type].label.toLowerCase()}
                        {typeDeliverables.length !== 1 ? "s" : ""} generated
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {typeDeliverables.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <History className="h-6 w-6 text-muted-foreground/40 mb-2" />
                          <p className="text-sm text-muted-foreground">
                            No versions yet. Generate your first draft to
                            start tracking history.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {typeDeliverables.map((d) => {
                            const status = statusConfig[d.status];
                            const isActive = viewingId === d.id;
                            return (
                              <button
                                key={d.id}
                                onClick={() => setViewingId(d.id)}
                                className={`w-full text-left rounded-lg border p-3 transition-all hover:bg-muted/50 ${
                                  isActive
                                    ? "border-primary/30 bg-primary/[0.03] ring-1 ring-primary/20"
                                    : ""
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0">
                                    <p className="text-sm font-medium truncate">
                                      {d.title.length > 50
                                        ? d.title.slice(0, 50) + "..."
                                        : d.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                      v{d.version} ·{" "}
                                      {new Date(
                                        d.updated_at
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <Badge
                                    className={`text-xs shrink-0 ${status.className}`}
                                  >
                                    {status.icon}
                                    {status.label}
                                  </Badge>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Quick stats */}
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Deliverable Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-md border p-2 text-center">
                          <p className="text-xl font-bold">
                            {deliverables.length}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Total
                          </p>
                        </div>
                        <div className="rounded-md border p-2 text-center">
                          <p className="text-xl font-bold">
                            {
                              deliverables.filter(
                                (d) => d.status === "published"
                              ).length
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Published
                          </p>
                        </div>
                        <div className="rounded-md border p-2 text-center">
                          <p className="text-xl font-bold">
                            {
                              deliverables.filter(
                                (d) => d.status === "approved"
                              ).length
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Approved
                          </p>
                        </div>
                        <div className="rounded-md border p-2 text-center">
                          <p className="text-xl font-bold">
                            {
                              deliverables.filter(
                                (d) =>
                                  d.status === "draft" ||
                                  d.status === "review"
                              ).length
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">
                            In Progress
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
