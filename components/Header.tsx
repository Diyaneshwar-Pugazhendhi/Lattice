"use client";

import { signOut } from "next-auth/react";
import { Button } from "./Button";
import { LogOut, User as UserIcon } from "lucide-react";
import type { Session } from "next-auth";

export function Header({ session }: { session: Session | null }) {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">T</span>
          </div>
          <h1 className="font-semibold text-lg">TaskFlow</h1>
          <span className="text-xs text-muted-foreground ml-1">
            Real-time Board
          </span>
        </div>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <div className="flex items-center gap-2 text-sm">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="h-7 w-7 rounded-full"
                  />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center">
                    <UserIcon className="h-4 w-4" />
                  </div>
                )}
                <span className="hidden sm:inline">
                  {session.user.name || session.user.email}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="h-4 w-4 mr-1.5" />
                Sign out
              </Button>
            </>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <a href="/login">Sign in</a>
              </Button>
              <Button size="sm" asChild>
                <a href="/signup">Sign up</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}