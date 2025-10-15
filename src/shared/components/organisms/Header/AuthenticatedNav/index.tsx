"use client";

import { LogOutIcon, MoreVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/molecules/DropDownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/atoms/Avatar";
import { useSession, signOut } from "next-auth/react";

export default function AuthenticatedNav() {
  const { data: session } = useSession();

  // ⚠️ TEMPORAIRE : Désactiver l'authentification pour les tests Vercel
  const DISABLE_AUTH = process.env.NEXT_PUBLIC_DISABLE_AUTH === "true";

  if (DISABLE_AUTH) {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-8 ml-auto cursor-pointer focus:outline-none">
        <Avatar>
          <AvatarImage src={session?.user?.image ?? ""} />
          <AvatarFallback>
            {session?.user?.name?.[0] ?? "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1 text-left text-sm leading-tight px-2">
          <span className="truncate font-medium text-white">
            {session?.user?.name}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {session?.user?.email}
          </span>
        </div>
        <MoreVerticalIcon className="ml-auto size-4 text-white" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="end"
        sideOffset={4}>
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="cursor-pointer"
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}