"use client";

import { ChevronRight, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-lg w-full cursor-pointer"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      <LogOut className="size-4 shrink-0 w-6! h-6!" />

      <span className="group-data-[collapsible=icon]:hidden">Sair</span>

      <ChevronRight className="ml-21 py-1 group-data-[collapsible=icon]:hidden" />
    </button>
  );
}
