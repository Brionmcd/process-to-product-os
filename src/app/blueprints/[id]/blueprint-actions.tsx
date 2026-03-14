"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Download } from "lucide-react";
import { toast } from "sonner";

export function ExportPdfButton() {
  return (
    <Button
      variant="outline"
      onClick={() => toast.info("Export coming soon")}
    >
      <Download className="mr-2 h-4 w-4" />
      Export PDF
    </Button>
  );
}

export function ApproveBlueprintButton({ approved }: { approved: boolean }) {
  return (
    <Button
      disabled={approved}
      onClick={() => toast.success("Blueprint approved")}
    >
      <CheckCircle2 className="mr-2 h-4 w-4" />
      {approved ? "Approved" : "Approve Blueprint"}
    </Button>
  );
}
