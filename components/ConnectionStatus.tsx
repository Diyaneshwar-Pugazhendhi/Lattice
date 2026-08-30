"use client";

import { Wifi, WifiOff } from "lucide-react";

export function ConnectionStatus({ connected }: { connected: boolean }) {
  return (
    <div className="flex items-center gap-1.5 text-xs">
      <div
        className={`h-2 w-2 rounded-full ${
          connected ? "bg-green-500 animate-pulse" : "bg-red-500"
        }`}
      />
      <span className="text-muted-foreground hidden sm:inline">
        {connected ? "Live" : "Offline"}
      </span>
    </div>
  );
}