"use client";

import { MobileNav } from "./sidebar";
import { CommandBar } from "./command-bar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Zap } from "lucide-react";

export function AppHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-3">
        <MobileNav />
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
            <Zap className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-sm font-semibold">P2P OS</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <CommandBar />
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
            BM
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
