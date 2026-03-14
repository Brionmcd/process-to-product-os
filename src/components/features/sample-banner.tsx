"use client";

import { Badge } from "@/components/ui/badge";
import { FlaskConical, X } from "lucide-react";
import { useState } from "react";

export function SampleBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm dark:border-amber-900 dark:bg-amber-950/30">
      <FlaskConical className="h-4 w-4 text-amber-600 shrink-0" />
      <div className="flex-1">
        <span className="font-medium text-amber-900 dark:text-amber-300">
          Sample data
        </span>
        <span className="text-amber-700 dark:text-amber-400">
          {" "}— This is an example workflow showing the full journey from process mapping to ROI. Create your own to get started.
        </span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200 shrink-0"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function SampleBadge() {
  return (
    <Badge
      variant="outline"
      className="border-amber-300 bg-amber-50 text-amber-700 text-xs font-semibold dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400"
    >
      <FlaskConical className="h-3 w-3" />
      SAMPLE
    </Badge>
  );
}
