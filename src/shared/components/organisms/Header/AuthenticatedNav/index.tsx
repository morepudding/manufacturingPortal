"use client";

// ⚠️ AUTHENTIFICATION DÉSACTIVÉE
// import { LogOutIcon, MoreVerticalIcon } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/shared/components/molecules/DropDownMenu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/atoms/Avatar";
// import { useSession, signOut } from "next-auth/react";

export default function AuthenticatedNav() {
  // Mode sans authentification
  return (
    <div className="flex items-center px-4">
      <div className="px-3 py-1 bg-amber-500/20 border border-amber-500/50 rounded-md">
        <span className="text-xs text-amber-200 font-medium">
          🔓 Mode Test (Auth désactivée)
        </span>
      </div>
    </div>
  );
}