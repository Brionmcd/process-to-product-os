"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Workflow,
  Lightbulb,
  FileStack,
  FileText,
  TrendingUp,
  Settings,
  Menu,
  Zap,
  Rocket,
  BookOpen,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workflows", label: "Workflows", icon: Workflow },
  { href: "/opportunities", label: "Opportunities", icon: Lightbulb },
  { href: "/blueprints", label: "Blueprints", icon: FileStack },
  { href: "/deployments", label: "Deployments", icon: Rocket },
  { href: "/deliverables", label: "Deliverables", icon: FileText },
  { href: "/roi", label: "ROI & Impact", icon: TrendingUp },
  { href: "/how-it-works", label: "How It Works", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];

function NavLinks({ variant = "sidebar", onClick }: { variant?: "sidebar" | "mobile"; onClick?: () => void }) {
  const pathname = usePathname();
  const isSidebar = variant === "sidebar";

  return (
    <nav className="flex flex-col gap-1 px-3">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
              isActive
                ? isSidebar
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "bg-primary text-primary-foreground"
                : isSidebar
                  ? "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-60 md:flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center gap-2.5 border-b border-sidebar-border px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sidebar-primary">
          <Zap className="h-4 w-4 text-sidebar-primary-foreground" />
        </div>
        <span className="font-semibold text-sm text-sidebar-foreground">P2P OS</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <NavLinks variant="sidebar" />
      </div>
      <div className="border-t border-sidebar-border px-5 py-3">
        <p className="text-xs text-sidebar-foreground/50">Process-to-Product OS</p>
        <p className="text-xs text-sidebar-foreground/40">v1.0 — Pilot</p>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden" />
        }
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-60 p-0">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex h-14 items-center gap-2.5 border-b px-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm">P2P OS</span>
        </div>
        <div className="py-4">
          <NavLinks variant="mobile" onClick={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
