import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  Workflow,
  FileStack,
  Rocket,
  FileText,
  ArrowRight,
  ArrowDown,
  Clock,
  Shield,
  TrendingUp,
  Zap,
  Target,
  Users,
  Building2,
  CheckCircle2,
  XCircle,
  Mic,
  LayoutTemplate,
  PenLine,
  Eye,
  BarChart3,
  Layers,
  BrainCircuit,
} from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-12">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] via-primary/[0.03] to-transparent p-8 md:p-12">
        <div className="absolute top-6 right-6 opacity-[0.07]">
          <BrainCircuit className="h-32 w-32 text-primary" />
        </div>
        <div className="relative space-y-4 max-w-2xl">
          <Badge variant="secondary" className="text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            Process-to-Product OS
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Transform Manual Processes into AI-Powered Workflows
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            P2P OS maps your team&apos;s existing processes, identifies what can be automated,
            builds an implementation plan with projected ROI, and deploys AI agents that work
            alongside your people — safely, gradually, and measurably.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <LinkButton href="/workflows/new" size="lg">
              <Sparkles className="mr-2 h-4 w-4" />
              Map Your First Workflow
            </LinkButton>
            <LinkButton href="/workflows" variant="outline" size="lg">
              Explore Sample Data
              <ArrowRight className="ml-2 h-4 w-4" />
            </LinkButton>
          </div>
        </div>
      </div>

      {/* ── The Problem ───────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Your team is drowning in manual work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every business has processes that consume hours of skilled people&apos;s time —
            repetitive, error-prone tasks that never seem to get better. Sound familiar?
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Clock, label: "Hours wasted", desc: "Staff spend 40%+ of their time on repetitive mechanical tasks" },
            { icon: XCircle, label: "Human errors", desc: "Manual data entry and handoffs create costly mistakes" },
            { icon: Users, label: "Inconsistency", desc: "Different people do the same process different ways" },
            { icon: TrendingUp, label: "No visibility", desc: "No way to measure cycle time, bottlenecks, or improvement" },
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* ── How It Works: 5-Step Journey ──────────────────────────────────── */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="secondary" className="text-xs font-semibold uppercase tracking-wider">
            How It Works
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight">
            From manual process to AI agent in 5 steps
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            P2P OS guides you through the entire journey — from documenting what your team does today
            to deploying AI agents that do it better, faster, and more consistently.
          </p>
        </div>

        <div className="space-y-4">
          {/* Step 1 */}
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  1
                </div>
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Workflow className="h-5 w-5 text-primary" />
                    Map Your Process
                  </CardTitle>
                  <CardDescription>
                    Capture your current workflow exactly as your team does it today
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="ml-14">
              <p className="text-base text-muted-foreground mb-4">
                Choose the input method that works best for you. P2P OS meets you where you are —
                no special formatting required. Just describe what your team does, and AI structures it for you.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: LayoutTemplate, label: "Industry Templates", desc: "Pre-built workflows for accounting, consulting, healthcare, and more" },
                  { icon: PenLine, label: "Type or Paste", desc: "Describe your process in plain text — AI extracts the steps" },
                  { icon: Mic, label: "Voice Dictation", desc: "Speak your workflow naturally with real-time transcription" },
                  { icon: FileText, label: "From Scratch", desc: "Build step-by-step using the guided form editor" },
                ].map((method) => (
                  <div key={method.label} className="flex items-start gap-2.5 rounded-lg border border-dashed p-3">
                    <method.icon className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{method.label}</p>
                      <p className="text-xs text-muted-foreground">{method.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <ArrowDown className="h-5 w-5 text-muted-foreground/40" />
          </div>

          {/* Step 2 */}
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white font-bold">
                  2
                </div>
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    AI Analyzes Every Step
                  </CardTitle>
                  <CardDescription>
                    Each step is classified, scored, and evaluated for automation potential
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="ml-14">
              <p className="text-base text-muted-foreground mb-4">
                AI examines every step in your workflow and determines what can be automated,
                what needs human oversight, and what should stay fully manual. You get a clear
                picture of where automation will have the biggest impact.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Zap className="h-3 w-3" />
                  Mechanical — Fully automatable
                </Badge>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  <Layers className="h-3 w-3" />
                  Hybrid — AI + human review
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <BrainCircuit className="h-3 w-3" />
                  Judgment — Human decision required
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <ArrowDown className="h-5 w-5 text-muted-foreground/40" />
          </div>

          {/* Step 3 */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                  3
                </div>
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <FileStack className="h-5 w-5 text-blue-500" />
                    Generate Automation Blueprint
                  </CardTitle>
                  <CardDescription>
                    A prioritized implementation plan with ROI projections
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="ml-14">
              <p className="text-base text-muted-foreground mb-4">
                AI generates a complete automation blueprint — which steps to automate first,
                what technology to use, dependencies between automations, and projected return
                on investment. No guesswork. Data-driven prioritization.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Clock, label: "Hours Saved / Month", value: "Projected time savings" },
                  { icon: Target, label: "Cycle Time Reduction", value: "Faster process completion" },
                  { icon: Shield, label: "Error Rate Reduction", value: "Fewer mistakes" },
                ].map((metric) => (
                  <div key={metric.label} className="flex items-center gap-3 rounded-lg border p-3">
                    <metric.icon className="h-5 w-5 text-blue-500 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{metric.label}</p>
                      <p className="text-xs text-muted-foreground">{metric.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <ArrowDown className="h-5 w-5 text-muted-foreground/40" />
          </div>

          {/* Step 4 */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white font-bold">
                  4
                </div>
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-purple-500" />
                    Deploy with Shadow Mode
                  </CardTitle>
                  <CardDescription>
                    AI agents run alongside your team before going fully live
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="ml-14">
              <p className="text-base text-muted-foreground mb-4">
                This is where the magic happens — safely. Sprint-based deployment puts AI agents
                to work alongside your people in <strong>Shadow Mode</strong>. Both human and AI
                process the same inputs, and you compare the results side-by-side. Only when the
                AI consistently matches or exceeds human output does it go live.
              </p>
              <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                <p className="text-sm font-semibold flex items-center gap-2">
                  <Eye className="h-4 w-4 text-purple-500" />
                  Shadow Mode: Human vs. AI Comparison
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-md border bg-background p-3 space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Human Output</p>
                    <p className="text-sm">Your team processes the task as usual</p>
                  </div>
                  <div className="rounded-md border bg-background p-3 space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-purple-500">AI Agent Output</p>
                    <p className="text-sm">AI processes the same task independently</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-muted-foreground">Results compared automatically — AI only goes live when match rate exceeds your threshold</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <ArrowDown className="h-5 w-5 text-muted-foreground/40" />
          </div>

          {/* Step 5 */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-white font-bold">
                  5
                </div>
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-500" />
                    Auto-Generate Deliverables
                  </CardTitle>
                  <CardDescription>
                    SOPs, reports, checklists, and rollout plans — created automatically
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="ml-14">
              <p className="text-base text-muted-foreground mb-4">
                Every automation project needs documentation. P2P OS generates it automatically —
                standard operating procedures, client-ready impact reports, quality checklists, and
                phased rollout plans. Your stakeholders get professional deliverables without anyone
                spending hours writing them.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Standard Operating Procedures", "Impact Reports", "QA Checklists", "Rollout Plans", "Client Packages"].map((d) => (
                  <Badge key={d} variant="secondary">{d}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* ── Before & After ────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            The transformation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what changes when your manual processes become AI-powered workflows.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Before */}
          <Card className="border-red-200 bg-red-50/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <XCircle className="h-5 w-5" />
                Before P2P OS
              </CardTitle>
              <CardDescription className="text-red-600/70">
                Manual, inconsistent, and invisible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Staff spend hours on data entry and copy-paste tasks",
                  "Every person does the process slightly differently",
                  "Errors discovered days or weeks later",
                  "No metrics on cycle time, throughput, or quality",
                  "Onboarding new staff takes weeks of shadowing",
                  "Process improvements are guesswork",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-red-900/80">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* After */}
          <Card className="border-green-200 bg-green-50/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle2 className="h-5 w-5" />
                After P2P OS
              </CardTitle>
              <CardDescription className="text-green-600/70">
                Automated, consistent, and measurable
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "AI agents handle mechanical steps instantly and accurately",
                  "Every process runs the same way, every time",
                  "Errors caught in real-time with built-in validation",
                  "Live dashboards showing hours saved, quality scores, and ROI",
                  "New staff follow auto-generated SOPs from day one",
                  "Data-driven insights reveal the next optimization opportunity",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-green-900/80">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* ── Value Propositions ─────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            The business impact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            P2P OS doesn&apos;t just automate — it measures and proves the value of every change.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Clock,
              label: "Save Hours Weekly",
              value: "40%+",
              desc: "reduction in time spent on mechanical tasks",
              color: "text-primary bg-primary/10",
            },
            {
              icon: Shield,
              label: "Reduce Errors",
              value: "90%+",
              desc: "fewer errors on automated steps",
              color: "text-blue-600 bg-blue-100",
            },
            {
              icon: Rocket,
              label: "Deploy Safely",
              value: "Zero risk",
              desc: "Shadow mode validates before going live",
              color: "text-purple-600 bg-purple-100",
            },
            {
              icon: BarChart3,
              label: "Prove ROI",
              value: "Real-time",
              desc: "dashboards tracking hours saved and cost reduction",
              color: "text-green-600 bg-green-100",
            },
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="pt-6 text-center space-y-3">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className="font-semibold text-sm">{item.label}</p>
                </div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* ── Who It's For ───────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Built for teams with repeatable processes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            If your business runs on processes that follow a pattern, P2P OS can help.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Building2,
              label: "Professional Services",
              examples: ["Accounting firms", "Consulting agencies", "Legal practices"],
              desc: "Automate client reporting, compliance workflows, and recurring deliverables.",
            },
            {
              icon: Users,
              label: "Operations Teams",
              examples: ["Healthcare admin", "Real estate ops", "Education"],
              desc: "Streamline intake processes, scheduling, documentation, and approvals.",
            },
            {
              icon: Target,
              label: "Growing Businesses",
              examples: ["E-commerce", "SaaS companies", "Service businesses"],
              desc: "Scale your processes without scaling headcount. Do more with the team you have.",
            },
          ].map((item) => (
            <Card key={item.label}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{item.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.examples.map((ex) => (
                    <Badge key={ex} variant="secondary" className="text-xs">{ex}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* ── CTA Footer ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] via-primary/[0.03] to-transparent p-8 md:p-12 text-center">
        <div className="absolute top-4 right-4 opacity-[0.07]">
          <Sparkles className="h-24 w-24 text-primary" />
        </div>
        <div className="relative space-y-4 max-w-xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to automate your first workflow?
          </h2>
          <p className="text-muted-foreground text-lg">
            Start with one process. See the analysis. Review the blueprint.
            Deploy an AI agent. Measure the results. It takes minutes to begin.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <LinkButton href="/workflows/new" size="lg">
              <Sparkles className="mr-2 h-4 w-4" />
              Map Your First Workflow
            </LinkButton>
            <LinkButton href="/workflows" variant="outline" size="lg">
              Explore Sample Workflow
              <ArrowRight className="ml-2 h-4 w-4" />
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
