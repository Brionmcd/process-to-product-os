"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  LayoutDashboard,
  Workflow,
  Lightbulb,
  FileStack,
  FileText,
  TrendingUp,
  Settings,
  Plus,
  Sparkles,
  Search,
} from "lucide-react";

const pages = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, group: "Navigate" },
  { name: "Workflows", href: "/workflows", icon: Workflow, group: "Navigate" },
  { name: "Opportunities", href: "/opportunities", icon: Lightbulb, group: "Navigate" },
  { name: "Blueprints", href: "/blueprints", icon: FileStack, group: "Navigate" },
  { name: "Deliverables", href: "/deliverables", icon: FileText, group: "Navigate" },
  { name: "ROI & Impact", href: "/roi", icon: TrendingUp, group: "Navigate" },
  { name: "Settings", href: "/settings", icon: Settings, group: "Navigate" },
];

const actions = [
  { name: "Map New Workflow", href: "/workflows/new", icon: Plus, group: "Actions" },
  { name: "Analyze Opportunities", href: "/opportunities", icon: Sparkles, group: "Actions" },
  { name: "Generate Blueprint", href: "/blueprints", icon: FileStack, group: "Actions" },
  { name: "Create Deliverable", href: "/deliverables", icon: FileText, group: "Actions" },
];

export function CommandBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted transition-colors"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search or jump to...</span>
        <kbd className="ml-4 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium sm:flex">
          <span className="text-xs">&#8984;</span>K
        </kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 overflow-hidden max-w-lg">
          <DialogTitle className="sr-only">Command palette</DialogTitle>
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
            <CommandInput placeholder="Search pages, actions..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Actions">
                {actions.map((action) => (
                  <CommandItem
                    key={action.href + action.name}
                    onSelect={() => runCommand(action.href)}
                    className="gap-2"
                  >
                    <action.icon className="h-4 w-4 text-primary" />
                    {action.name}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Navigate">
                {pages.map((page) => (
                  <CommandItem
                    key={page.href}
                    onSelect={() => runCommand(page.href)}
                    className="gap-2"
                  >
                    <page.icon className="h-4 w-4" />
                    {page.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
