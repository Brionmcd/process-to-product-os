"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export function AIThinking({
  label = "Analyzing...",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3",
        className
      )}
    >
      <div className="relative flex h-8 w-8 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">
          AI is processing your request
        </p>
      </div>
    </div>
  );
}

export function AIStreamingText({
  text,
  isStreaming,
  className,
}: {
  text: string;
  isStreaming: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="prose prose-sm max-w-none whitespace-pre-wrap">
        {text}
        {isStreaming && (
          <span className="inline-block h-4 w-0.5 animate-pulse bg-primary ml-0.5 align-middle" />
        )}
      </div>
    </div>
  );
}

export function ConfidenceBadge({
  level,
  className,
}: {
  level: "high" | "medium" | "low";
  className?: string;
}) {
  const config = {
    high: {
      label: "High confidence",
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
    },
    medium: {
      label: "Medium confidence",
      bg: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
    },
    low: {
      label: "Low confidence",
      bg: "bg-red-50 text-red-700 border-red-200",
      dot: "bg-red-500",
    },
  };

  const c = config[level];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium",
        c.bg,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", c.dot)} />
      {c.label}
    </span>
  );
}

export function ReasoningPanel({
  reasoning,
  isOpen,
  onToggle,
}: {
  reasoning: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-lg border border-primary/15 bg-primary/[0.03]">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-primary hover:bg-primary/5 transition-colors rounded-lg"
      >
        <Sparkles className="h-3.5 w-3.5" />
        <span>AI Reasoning</span>
        <span className="ml-auto text-xs text-muted-foreground">
          {isOpen ? "Hide" : "Show"}
        </span>
      </button>
      {isOpen && (
        <div className="border-t border-primary/10 px-4 py-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {reasoning}
          </p>
        </div>
      )}
    </div>
  );
}

export function InsightCard({
  title,
  insight,
  icon,
  action,
  onAction,
}: {
  title: string;
  insight: string;
  icon?: React.ReactNode;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="group relative rounded-xl border border-primary/15 bg-gradient-to-br from-primary/[0.04] to-transparent p-4 transition-all hover:border-primary/25 hover:shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon || <Sparkles className="h-4 w-4" />}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            {insight}
          </p>
          {action && onAction && (
            <button
              onClick={onAction}
              className="mt-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {action} &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
