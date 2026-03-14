"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Sparkles,
  FileText,
  LayoutTemplate,
  PenLine,
  Loader2,
  Check,
  FilePlus2,
  Mic,
  MicOff,
  Square,
  Building2,
  Briefcase,
  Calculator,
  HeartPulse,
  Scale,
  ShoppingCart,
  GraduationCap,
  Wrench,
  ChevronRight,
} from "lucide-react";
import type { StepType } from "@/types";

// ─── Web Speech API types ────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SpeechRecognitionType = any;

// ─── Types ───────────────────────────────────────────────────────────────────

interface WorkflowStep {
  action: string;
  system: string;
  type: StepType;
  duration: number;
}

interface WorkflowData {
  name: string;
  description: string;
  frequency: string;
  painScore: number;
  steps: WorkflowStep[];
  systems: string[];
  finalOutput: string;
}

type InputMode = "choose" | "template" | "describe" | "dictate" | "refine";

// ─── Template Data ───────────────────────────────────────────────────────────

const industries = [
  { id: "accounting", label: "Accounting & Finance", icon: Calculator },
  { id: "consulting", label: "Consulting & Professional Services", icon: Briefcase },
  { id: "healthcare", label: "Healthcare", icon: HeartPulse },
  { id: "legal", label: "Legal", icon: Scale },
  { id: "realestate", label: "Real Estate", icon: Building2 },
  { id: "ecommerce", label: "E-Commerce & Retail", icon: ShoppingCart },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "operations", label: "General Operations", icon: Wrench },
];

interface WorkflowTemplate {
  name: string;
  description: string;
  frequency: string;
  painScore: number;
  finalOutput: string;
  steps: WorkflowStep[];
  systems: string[];
}

const templates: Record<string, WorkflowTemplate[]> = {
  accounting: [
    {
      name: "Monthly Client Financial Reporting",
      description: "Generate and deliver monthly financial reports to clients including P&L, Balance Sheet, and Cash Flow with management commentary.",
      frequency: "monthly",
      painScore: 4,
      finalOutput: "PDF financial report package delivered to client via portal and email.",
      steps: [
        { action: "Export trial balance from accounting system", system: "QuickBooks", type: "mechanical", duration: 10 },
        { action: "Reconcile accounts and verify balances", system: "Excel", type: "judgment", duration: 45 },
        { action: "Generate financial statements (P&L, Balance Sheet, Cash Flow)", system: "QuickBooks", type: "mechanical", duration: 15 },
        { action: "Write management commentary and variance analysis", system: "Word", type: "judgment", duration: 60 },
        { action: "Format and compile report package", system: "Excel / Word", type: "hybrid", duration: 30 },
        { action: "Manager reviews and approves final report", system: "Email", type: "judgment", duration: 20 },
        { action: "Upload to client portal and send notification email", system: "Portal / Email", type: "mechanical", duration: 10 },
      ],
      systems: ["QuickBooks", "Excel", "Word", "Email", "Client Portal"],
    },
    {
      name: "Accounts Payable Processing",
      description: "Process vendor invoices from receipt through payment, including approval routing, coding, and payment scheduling.",
      frequency: "daily",
      painScore: 3,
      finalOutput: "Processed and paid invoices with proper GL coding and approval trail.",
      steps: [
        { action: "Receive and scan vendor invoice", system: "Email / Scanner", type: "mechanical", duration: 5 },
        { action: "Match invoice to purchase order", system: "ERP", type: "hybrid", duration: 10 },
        { action: "Code to correct GL accounts", system: "QuickBooks", type: "judgment", duration: 8 },
        { action: "Route for approval based on amount", system: "Email", type: "mechanical", duration: 5 },
        { action: "Enter approved invoice into system", system: "QuickBooks", type: "mechanical", duration: 5 },
        { action: "Schedule payment based on terms", system: "QuickBooks", type: "mechanical", duration: 3 },
      ],
      systems: ["QuickBooks", "Email", "Scanner", "ERP"],
    },
    {
      name: "Payroll Processing",
      description: "End-to-end payroll cycle including timesheet collection, calculations, tax withholdings, and payment distribution.",
      frequency: "biweekly",
      painScore: 4,
      finalOutput: "Completed payroll run with direct deposits, tax filings, and pay stubs.",
      steps: [
        { action: "Collect and review timesheets", system: "Time Tracking", type: "hybrid", duration: 30 },
        { action: "Calculate gross pay, overtime, and adjustments", system: "Payroll System", type: "mechanical", duration: 15 },
        { action: "Verify tax withholdings and deductions", system: "Payroll System", type: "judgment", duration: 20 },
        { action: "Review payroll summary for anomalies", system: "Excel", type: "judgment", duration: 15 },
        { action: "Submit payroll for processing", system: "Payroll System", type: "mechanical", duration: 5 },
        { action: "Distribute pay stubs and reports", system: "Email / Portal", type: "mechanical", duration: 10 },
      ],
      systems: ["Time Tracking", "Payroll System", "Excel", "Email"],
    },
  ],
  consulting: [
    {
      name: "Client Onboarding",
      description: "Onboard new clients from signed engagement letter through project kickoff, including setup in all systems.",
      frequency: "weekly",
      painScore: 3,
      finalOutput: "Fully set up client with access, project plan, and kickoff meeting completed.",
      steps: [
        { action: "Receive signed engagement letter", system: "DocuSign / Email", type: "mechanical", duration: 5 },
        { action: "Create client record in CRM", system: "CRM", type: "mechanical", duration: 10 },
        { action: "Set up project workspace and folders", system: "SharePoint / Drive", type: "mechanical", duration: 15 },
        { action: "Send welcome package and access credentials", system: "Email", type: "mechanical", duration: 10 },
        { action: "Schedule and conduct kickoff meeting", system: "Calendar / Zoom", type: "judgment", duration: 60 },
        { action: "Create initial project plan and timeline", system: "Project Management", type: "judgment", duration: 45 },
      ],
      systems: ["CRM", "DocuSign", "SharePoint", "Email", "Zoom", "Project Management"],
    },
    {
      name: "Weekly Status Reporting",
      description: "Compile and send weekly status updates to clients covering progress, blockers, and next steps.",
      frequency: "weekly",
      painScore: 3,
      finalOutput: "Weekly status report email sent to client stakeholders.",
      steps: [
        { action: "Collect updates from team members", system: "Slack / Email", type: "hybrid", duration: 20 },
        { action: "Review project tracker for progress", system: "Project Management", type: "mechanical", duration: 10 },
        { action: "Write status summary and key highlights", system: "Word / Email", type: "judgment", duration: 25 },
        { action: "Draft client-facing status email", system: "Email", type: "judgment", duration: 15 },
        { action: "Review and send", system: "Email", type: "judgment", duration: 5 },
      ],
      systems: ["Slack", "Project Management", "Email", "Word"],
    },
  ],
  healthcare: [
    {
      name: "Patient Intake & Registration",
      description: "Register new patients including insurance verification, medical history collection, and initial assessment scheduling.",
      frequency: "daily",
      painScore: 4,
      finalOutput: "Complete patient record with verified insurance and scheduled initial appointment.",
      steps: [
        { action: "Collect patient demographics and contact info", system: "EHR", type: "mechanical", duration: 10 },
        { action: "Verify insurance eligibility and benefits", system: "Insurance Portal", type: "hybrid", duration: 15 },
        { action: "Collect and review medical history forms", system: "EHR", type: "judgment", duration: 20 },
        { action: "Enter medical history into patient record", system: "EHR", type: "mechanical", duration: 15 },
        { action: "Schedule initial assessment appointment", system: "Scheduling System", type: "mechanical", duration: 5 },
        { action: "Send welcome packet and pre-visit instructions", system: "Email / Portal", type: "mechanical", duration: 5 },
      ],
      systems: ["EHR", "Insurance Portal", "Scheduling System", "Email"],
    },
  ],
  legal: [
    {
      name: "Contract Review & Approval",
      description: "Review incoming contracts, flag risks, negotiate terms, and route for internal approval before execution.",
      frequency: "weekly",
      painScore: 4,
      finalOutput: "Approved and executed contract filed in document management system.",
      steps: [
        { action: "Receive contract and log in tracking system", system: "Email / DMS", type: "mechanical", duration: 5 },
        { action: "Perform initial contract review and risk assessment", system: "Word", type: "judgment", duration: 60 },
        { action: "Flag non-standard terms and prepare redlines", system: "Word", type: "judgment", duration: 45 },
        { action: "Send redlines to counterparty", system: "Email", type: "mechanical", duration: 10 },
        { action: "Negotiate and finalize terms", system: "Email / Phone", type: "judgment", duration: 30 },
        { action: "Route for internal approval signatures", system: "DocuSign", type: "mechanical", duration: 10 },
        { action: "Execute and file final agreement", system: "DMS", type: "mechanical", duration: 5 },
      ],
      systems: ["Email", "Word", "DocuSign", "DMS"],
    },
  ],
  realestate: [
    {
      name: "Property Listing Creation",
      description: "Create and publish property listings across multiple platforms from initial photos through live publication.",
      frequency: "weekly",
      painScore: 3,
      finalOutput: "Live property listing on MLS and marketing channels with all media and details.",
      steps: [
        { action: "Collect property details and disclosures from seller", system: "Email / Forms", type: "hybrid", duration: 20 },
        { action: "Schedule and coordinate photography/staging", system: "Calendar", type: "mechanical", duration: 15 },
        { action: "Write property description and marketing copy", system: "Word", type: "judgment", duration: 30 },
        { action: "Enter listing data into MLS", system: "MLS", type: "mechanical", duration: 20 },
        { action: "Upload photos and virtual tour", system: "MLS / Website", type: "mechanical", duration: 15 },
        { action: "Syndicate to marketing channels", system: "Marketing Platform", type: "mechanical", duration: 10 },
      ],
      systems: ["MLS", "Email", "Calendar", "Marketing Platform"],
    },
  ],
  ecommerce: [
    {
      name: "Order Fulfillment",
      description: "Process customer orders from receipt through shipping confirmation and tracking notification.",
      frequency: "daily",
      painScore: 3,
      finalOutput: "Shipped order with tracking number sent to customer.",
      steps: [
        { action: "Receive and validate new order", system: "Shopify / WooCommerce", type: "mechanical", duration: 2 },
        { action: "Check inventory availability", system: "Inventory System", type: "mechanical", duration: 3 },
        { action: "Generate pick list and packing slip", system: "WMS", type: "mechanical", duration: 2 },
        { action: "Pick, pack, and label items", system: "Warehouse", type: "mechanical", duration: 10 },
        { action: "Generate shipping label and schedule pickup", system: "Shipping Platform", type: "mechanical", duration: 3 },
        { action: "Send shipping confirmation with tracking", system: "Email / SMS", type: "mechanical", duration: 2 },
      ],
      systems: ["Shopify", "Inventory System", "WMS", "Shipping Platform", "Email"],
    },
  ],
  education: [
    {
      name: "Course Content Publishing",
      description: "Create, review, and publish course materials including lesson plans, assessments, and multimedia content.",
      frequency: "monthly",
      painScore: 3,
      finalOutput: "Published course module with all materials accessible to students.",
      steps: [
        { action: "Draft lesson content and learning objectives", system: "Google Docs", type: "judgment", duration: 60 },
        { action: "Create assessment questions and rubrics", system: "Google Docs", type: "judgment", duration: 30 },
        { action: "Record or source multimedia content", system: "Recording Tools", type: "hybrid", duration: 45 },
        { action: "Upload materials to LMS", system: "LMS", type: "mechanical", duration: 15 },
        { action: "Peer review and quality check", system: "LMS", type: "judgment", duration: 20 },
        { action: "Publish and notify students", system: "LMS / Email", type: "mechanical", duration: 5 },
      ],
      systems: ["Google Docs", "LMS", "Recording Tools", "Email"],
    },
  ],
  operations: [
    {
      name: "Employee Expense Reporting",
      description: "Collect, review, approve, and reimburse employee expense reports with proper documentation and coding.",
      frequency: "monthly",
      painScore: 3,
      finalOutput: "Approved expense report with reimbursement processed.",
      steps: [
        { action: "Employee submits expense report with receipts", system: "Expense Tool / Email", type: "mechanical", duration: 15 },
        { action: "Review receipts and verify policy compliance", system: "Expense Tool", type: "judgment", duration: 20 },
        { action: "Code expenses to correct GL accounts", system: "Accounting System", type: "hybrid", duration: 10 },
        { action: "Route for manager approval", system: "Email / Expense Tool", type: "mechanical", duration: 5 },
        { action: "Process reimbursement", system: "Accounting System", type: "mechanical", duration: 5 },
      ],
      systems: ["Expense Tool", "Accounting System", "Email"],
    },
    {
      name: "Vendor Procurement & Onboarding",
      description: "Evaluate, select, and onboard new vendors including due diligence, contract negotiation, and system setup.",
      frequency: "monthly",
      painScore: 3,
      finalOutput: "Approved vendor set up in procurement system with signed agreement.",
      steps: [
        { action: "Define requirements and evaluation criteria", system: "Word / Sheets", type: "judgment", duration: 30 },
        { action: "Solicit quotes from potential vendors", system: "Email", type: "mechanical", duration: 20 },
        { action: "Evaluate proposals and check references", system: "Sheets", type: "judgment", duration: 45 },
        { action: "Negotiate terms and finalize agreement", system: "Email / Word", type: "judgment", duration: 30 },
        { action: "Set up vendor in procurement system", system: "ERP / Accounting", type: "mechanical", duration: 15 },
        { action: "Distribute vendor info to relevant teams", system: "Email / Slack", type: "mechanical", duration: 5 },
      ],
      systems: ["Email", "Word", "Sheets", "ERP"],
    },
  ],
};

const stepTypeConfig: Record<StepType, { label: string; className: string }> = {
  mechanical: {
    label: "Mechanical",
    className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  hybrid: {
    label: "Hybrid",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  },
  judgment: {
    label: "Judgment",
    className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function NewWorkflowPage() {
  const router = useRouter();
  const [mode, setMode] = useState<InputMode>("choose");
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [freeformText, setFreeformText] = useState("");
  const [workflow, setWorkflow] = useState<WorkflowData>({
    name: "",
    description: "",
    frequency: "",
    painScore: 3,
    steps: [],
    systems: [],
    finalOutput: "",
  });

  // ── Voice dictation (Web Speech API / Whisper-ready) ────────────────────

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [speechSupported, setSpeechSupported] = useState(true);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Check browser support
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
    return () => {
      // Cleanup on unmount
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let final = "";
      let interim = "";
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript + " ";
        } else {
          interim += result[0].transcript;
        }
      }
      if (final) {
        setTranscript((prev) => prev + final);
      }
      setInterimTranscript(interim);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      if (event.error !== "aborted") {
        console.error("Speech recognition error:", event.error);
      }
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    recognition.onend = () => {
      // Auto-restart if still in recording mode (handles browser auto-stop)
      if (isRecording) {
        try {
          recognition.start();
        } catch {
          setIsRecording(false);
          if (timerRef.current) clearInterval(timerRef.current);
        }
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
    setRecordingDuration(0);
    timerRef.current = setInterval(() => {
      setRecordingDuration((d) => d + 1);
    }, 1000);
  }, [isRecording]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
    setInterimTranscript("");
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  function formatDuration(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function useDictationAsDescription() {
    const text = transcript.trim();
    if (text.length < 10) return;
    setFreeformText(text);
    setMode("describe");
  }

  // ── Template selection ──────────────────────────────────────────────────

  function selectTemplate(template: WorkflowTemplate) {
    setWorkflow({
      name: template.name,
      description: template.description,
      frequency: template.frequency,
      painScore: template.painScore,
      steps: [...template.steps],
      systems: [...template.systems],
      finalOutput: template.finalOutput,
    });
    setMode("refine");
  }

  // ── Free-form text parsing (simulated AI) ──────────────────────────────

  async function parseDescription() {
    setIsAnalyzing(true);
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Parse the free-form text into structured steps
    const lines = freeformText
      .split(/\n/)
      .map((l) => l.replace(/^[\s\-\d.•*]+/, "").trim())
      .filter((l) => l.length > 5);

    const name = lines[0] || "Untitled Workflow";
    const steps: WorkflowStep[] = lines.slice(1).map((line) => {
      // Simple heuristic for step type classification
      const lower = line.toLowerCase();
      let type: StepType = "mechanical";
      if (lower.includes("review") || lower.includes("analyze") || lower.includes("decide") || lower.includes("evaluate") || lower.includes("write") || lower.includes("draft") || lower.includes("assess")) {
        type = "judgment";
      } else if (lower.includes("check") || lower.includes("verify") || lower.includes("adjust") || lower.includes("edit")) {
        type = "hybrid";
      }

      // Try to extract system names
      const systemMatch = line.match(/\b(in|using|via|from|on|through)\s+([A-Z][a-zA-Z\s]+?)(?:\s*[,.\-]|\s*$)/);
      const system = systemMatch ? systemMatch[2].trim() : "";

      return {
        action: line,
        system,
        type,
        duration: type === "judgment" ? 30 : type === "hybrid" ? 15 : 10,
      };
    });

    if (steps.length === 0) {
      steps.push({ action: "Step 1", system: "", type: "mechanical", duration: 10 });
    }

    const systems = [...new Set(steps.map((s) => s.system).filter(Boolean))];

    setWorkflow({
      name,
      description: freeformText,
      frequency: "",
      painScore: 3,
      steps,
      systems,
      finalOutput: "",
    });
    setIsAnalyzing(false);
    setMode("refine");
  }

  // ── Step editing helpers ────────────────────────────────────────────────

  function addStep() {
    setWorkflow((prev) => ({
      ...prev,
      steps: [...prev.steps, { action: "", system: "", type: "mechanical", duration: 10 }],
    }));
  }

  function removeStep(index: number) {
    if (workflow.steps.length <= 1) return;
    setWorkflow((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  }

  function updateStep(index: number, field: keyof WorkflowStep, value: string | number) {
    setWorkflow((prev) => {
      const updated = [...prev.steps];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, steps: updated };
    });
  }

  // ── Save ────────────────────────────────────────────────────────────────

  async function handleSave() {
    console.log("Saving workflow:", workflow);
    router.push("/workflows");
  }

  // ─── MODE: Choose input method ─────────────────────────────────────────

  if (mode === "choose") {
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Workflow Mapper
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Map New Workflow
          </h1>
          <p className="text-muted-foreground mt-1">
            Choose how you&apos;d like to get started. You can always edit everything later.
          </p>
        </div>

        <div className="grid gap-4">
          {/* Template option */}
          <button
            onClick={() => setMode("template")}
            className="group text-left rounded-xl border-2 border-transparent hover:border-primary/20 bg-card p-6 transition-all hover:shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <LayoutTemplate className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Start from a template</h3>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-muted-foreground mt-1">
                  Pick a common workflow for your industry. Pre-filled with typical steps, systems, and timing — just customize what&apos;s different for you.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <Badge variant="secondary">Accounting</Badge>
                  <Badge variant="secondary">Consulting</Badge>
                  <Badge variant="secondary">Healthcare</Badge>
                  <Badge variant="secondary">Legal</Badge>
                  <Badge variant="secondary">+4 more</Badge>
                </div>
              </div>
            </div>
          </button>

          {/* Describe option */}
          <button
            onClick={() => setMode("describe")}
            className="group text-left rounded-xl border-2 border-transparent hover:border-primary/20 bg-card p-6 transition-all hover:shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <PenLine className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Describe it in your own words</h3>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-muted-foreground mt-1">
                  Type or paste a description of your process — a bulleted list, numbered steps, or even a paragraph. AI will structure it for you.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="text-sm text-primary font-medium">AI auto-structures your text into workflow steps</span>
                </div>
              </div>
            </div>
          </button>

          {/* Voice dictation option */}
          {speechSupported ? (
            <button
              onClick={() => { setTranscript(""); setInterimTranscript(""); setMode("dictate"); }}
              className="group text-left rounded-xl border-2 border-transparent hover:border-primary/20 bg-card p-6 transition-all hover:shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Dictate your workflow</h3>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-muted-foreground mt-1">
                    Speak your process out loud and we&apos;ll transcribe it in real-time. Just describe your steps naturally — AI will structure everything.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span className="text-sm text-primary font-medium">Real-time voice-to-text powered by speech recognition</span>
                  </div>
                </div>
              </div>
            </button>
          ) : null}

          {/* Blank / start from scratch option */}
          <button
            onClick={() => {
              setWorkflow({
                name: "",
                description: "",
                frequency: "",
                painScore: 3,
                steps: [{ action: "", system: "", type: "mechanical", duration: 10 }],
                systems: [],
                finalOutput: "",
              });
              setMode("refine");
            }}
            className="group text-left rounded-xl border-2 border-transparent hover:border-primary/20 bg-card p-6 transition-all hover:shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <FilePlus2 className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Start from scratch</h3>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-muted-foreground mt-1">
                  Build your workflow step by step using the guided form. Add steps, systems, and timing manually.
                </p>
              </div>
            </div>
          </button>

          {/* Upload option (future) */}
          <div className="rounded-xl border border-dashed bg-muted/30 p-6 opacity-60">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-muted-foreground">Upload a document</h3>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
                <p className="text-muted-foreground mt-1">
                  Upload an existing SOP, process doc, or training manual. AI will extract the workflow steps automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── MODE: Template browser ────────────────────────────────────────────

  if (mode === "template") {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => { setMode("choose"); setSelectedIndustry(null); }}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {selectedIndustry ? industries.find((i) => i.id === selectedIndustry)?.label : "Choose your industry"}
            </h1>
            <p className="text-muted-foreground">
              {selectedIndustry
                ? "Pick a workflow to use as a starting point. You can customize everything."
                : "Select your industry to see relevant workflow templates."}
            </p>
          </div>
        </div>

        {!selectedIndustry ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {industries.map((industry) => {
              const Icon = industry.icon;
              const count = templates[industry.id]?.length ?? 0;
              return (
                <button
                  key={industry.id}
                  onClick={() => setSelectedIndustry(industry.id)}
                  disabled={count === 0}
                  className="group text-left rounded-lg border p-4 hover:bg-muted/50 hover:border-primary/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{industry.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {count} template{count !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedIndustry(null)}>
              <ArrowLeft className="mr-2 h-3 w-3" />
              All Industries
            </Button>

            <div className="grid gap-4">
              {(templates[selectedIndustry] ?? []).map((template, i) => {
                const totalTime = template.steps.reduce((sum, s) => sum + s.duration, 0);
                const mechanicalCount = template.steps.filter((s) => s.type === "mechanical").length;
                const judgmentCount = template.steps.filter((s) => s.type === "judgment").length;
                return (
                  <Card key={i} className="group hover:shadow-sm transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{template.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {template.description}
                          </CardDescription>
                        </div>
                        <Button
                          onClick={() => selectTemplate(template)}
                          size="sm"
                        >
                          Use Template
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span>{template.steps.length} steps</span>
                        <span>·</span>
                        <span>~{totalTime} min total</span>
                        <span>·</span>
                        <span className="capitalize">{template.frequency}</span>
                        <span>·</span>
                        <span>{mechanicalCount} mechanical, {judgmentCount} judgment</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {template.systems.map((sys) => (
                          <Badge key={sys} variant="outline" className="text-xs">
                            {sys}
                          </Badge>
                        ))}
                      </div>
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

  // ─── MODE: Describe in free-form text ──────────────────────────────────

  if (mode === "describe") {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setMode("choose")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Describe your workflow
            </h1>
            <p className="text-muted-foreground">
              Type or paste your process. AI will parse it into structured steps.
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label>Your process description</Label>
              <Textarea
                placeholder={`Paste or type your workflow here. For example:\n\nMonthly Client Financial Reporting\n1. Export trial balance from QuickBooks\n2. Reconcile accounts and verify balances in Excel\n3. Generate P&L, Balance Sheet, and Cash Flow\n4. Write management commentary with variance analysis\n5. Format and compile report package\n6. Manager reviews and approves\n7. Upload to client portal and send notification email\n\nYou can also write it as a paragraph — AI will figure out the steps.`}
                value={freeformText}
                onChange={(e) => setFreeformText(e.target.value)}
                rows={14}
                className="font-mono text-sm"
                autoFocus
              />
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-primary/5 border border-primary/10 px-3 py-2.5">
              <Sparkles className="h-4 w-4 text-primary shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">AI will:</span> extract steps, classify each as mechanical/hybrid/judgment, identify systems, and estimate durations. You can edit everything after.
              </p>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={parseDescription}
                disabled={freeformText.trim().length < 10 || isAnalyzing}
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Structure with AI
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─── MODE: Voice dictation ─────────────────────────────────────────────

  if (mode === "dictate") {
    const fullTranscript = transcript + interimTranscript;

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => { stopRecording(); setMode("choose"); }}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Dictate your workflow
            </h1>
            <p className="text-muted-foreground">
              Speak your process naturally. Describe each step and the systems you use.
            </p>
          </div>
        </div>

        {/* Recording controls */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center py-6 space-y-6">
              {/* Mic button */}
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`relative flex h-24 w-24 items-center justify-center rounded-full transition-all ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                }`}
              >
                {isRecording && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-20" />
                )}
                {isRecording ? (
                  <Square className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </button>

              <div className="text-center space-y-1">
                {isRecording ? (
                  <>
                    <div className="flex items-center gap-2 justify-center">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                      </span>
                      <span className="text-base font-medium text-red-600">Recording</span>
                      <span className="text-sm text-muted-foreground font-mono">{formatDuration(recordingDuration)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Speak clearly. Click the button to stop when you&apos;re done.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-base font-medium">
                      {fullTranscript ? "Recording paused" : "Ready to record"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {fullTranscript
                        ? "Click the mic to continue, or review your transcript below."
                        : "Click the microphone to start speaking. Describe your workflow steps naturally."}
                    </p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transcript */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Transcript</CardTitle>
            <CardDescription>
              {fullTranscript
                ? "Your dictation will appear here in real-time. You can edit it before processing."
                : "Start speaking to see your words appear here..."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-[200px] rounded-lg border bg-muted/30 p-4">
              {fullTranscript ? (
                <p className="text-base leading-relaxed whitespace-pre-wrap">
                  <span>{transcript}</span>
                  {interimTranscript && (
                    <span className="text-muted-foreground/60">{interimTranscript}</span>
                  )}
                </p>
              ) : (
                <p className="text-muted-foreground/40 italic">
                  &ldquo;Every month, we start by exporting the trial balance from QuickBooks. Then we reconcile accounts in Excel, checking for any discrepancies...&rdquo;
                </p>
              )}
            </div>

            {/* Tips */}
            <div className="flex items-start gap-2 rounded-lg bg-primary/5 border border-primary/10 px-3 py-2.5 mt-4">
              <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground space-y-1">
                <p><span className="font-medium text-foreground">Tips for best results:</span></p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>Name your workflow first (e.g., &ldquo;Monthly Client Reporting&rdquo;)</li>
                  <li>Describe each step in order</li>
                  <li>Mention the tools or systems you use (e.g., &ldquo;in QuickBooks,&rdquo; &ldquo;using Excel&rdquo;)</li>
                  <li>Note which steps need human judgment vs. are mechanical</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => { setTranscript(""); setInterimTranscript(""); }}
            disabled={!fullTranscript || isRecording}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Transcript
          </Button>
          <Button
            onClick={useDictationAsDescription}
            disabled={transcript.trim().length < 10 || isRecording}
            size="lg"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Structure with AI
          </Button>
        </div>
      </div>
    );
  }

  // ─── MODE: Refine (edit structured workflow) ───────────────────────────

  const totalTime = workflow.steps.reduce((sum, s) => sum + s.duration, 0);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setMode("choose")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Review & Customize
          </h1>
          <p className="text-muted-foreground">
            Edit the details below, then save to run AI analysis.
          </p>
        </div>
      </div>

      {/* Workflow basics */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="wf-name">Name</Label>
              <Input
                id="wf-name"
                value={workflow.name}
                onChange={(e) => setWorkflow((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Workflow name"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="wf-desc">Description</Label>
              <Textarea
                id="wf-desc"
                value={workflow.description}
                onChange={(e) => setWorkflow((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this workflow"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select
                value={workflow.frequency}
                onValueChange={(val) => setWorkflow((prev) => ({ ...prev, frequency: val ?? "" }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="How often?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="ad-hoc">Ad-hoc</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Pain Score</Label>
                <Badge variant="secondary" className="font-mono">
                  {workflow.painScore}/5
                </Badge>
              </div>
              <Slider
                min={1}
                max={5}
                step={1}
                value={[workflow.painScore]}
                onValueChange={(val) => setWorkflow((prev) => ({ ...prev, painScore: Array.isArray(val) ? val[0] : val }))}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Final Output</Label>
            <Input
              value={workflow.finalOutput}
              onChange={(e) => setWorkflow((prev) => ({ ...prev, finalOutput: e.target.value }))}
              placeholder="What does this workflow produce? (e.g., PDF report, approved invoice)"
            />
          </div>
        </CardContent>
      </Card>

      {/* Steps */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                Steps ({workflow.steps.length})
              </CardTitle>
              <CardDescription>
                ~{totalTime} minutes total · Edit, reorder, add, or remove steps
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addStep}>
              <Plus className="mr-2 h-3 w-3" />
              Add Step
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {workflow.steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-lg border p-3"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium mt-0.5">
                {index + 1}
              </span>
              <div className="flex-1 space-y-2">
                <Input
                  value={step.action}
                  onChange={(e) => updateStep(index, "action", e.target.value)}
                  placeholder="What happens in this step?"
                  className="font-medium"
                />
                <div className="grid gap-2 grid-cols-3">
                  <Input
                    value={step.system}
                    onChange={(e) => updateStep(index, "system", e.target.value)}
                    placeholder="System/tool"
                    className="text-sm"
                  />
                  <Select
                    value={step.type}
                    onValueChange={(val) => updateStep(index, "type", val as StepType)}
                  >
                    <SelectTrigger className="w-full text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mechanical">Mechanical</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="judgment">Judgment</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      min={1}
                      value={step.duration}
                      onChange={(e) => updateStep(index, "duration", parseInt(e.target.value) || 0)}
                      className="text-sm"
                    />
                    <span className="text-sm text-muted-foreground shrink-0">min</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeStep(index)}
                disabled={workflow.steps.length <= 1}
                className="mt-0.5"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Systems summary */}
      {workflow.systems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Systems & Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {workflow.systems.map((sys) => (
                <Badge key={sys} variant="secondary">
                  {sys}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI analysis preview + save */}
      <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] to-transparent p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">What happens when you save</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="flex items-start gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">1</div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Classify</span> — AI categorizes each step as mechanical, hybrid, or judgment
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">2</div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Score</span> — Opportunities ranked by impact, effort, and risk
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">3</div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Blueprint</span> — Implementation plan with ROI projections
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pb-8">
        <Button variant="outline" onClick={() => setMode("choose")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Start Over
        </Button>
        <Button onClick={handleSave} size="lg" disabled={!workflow.name.trim()}>
          <Sparkles className="mr-2 h-4 w-4" />
          Save & Analyze
        </Button>
      </div>
    </div>
  );
}
