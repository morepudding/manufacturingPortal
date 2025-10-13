"use client";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/shared/components/molecules/NavigationMenu";
import Image from "next/image";
import Link from "next/link";
import AuthenticatedNav from "./AuthenticatedNav";

export default function Header() {
    return (
        <div className="flex w-full h-16 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 items-center px-6 shadow-lg">
            {/* Logo + Titre */}
            <Link href="/" className="flex items-center gap-3 group mr-8">
                <div className="relative w-10 h-10 transition-transform group-hover:scale-110 duration-300">
                    <Image
                        src="/logo.png"
                        alt="Manufacturing Portal"
                        fill
                        className="object-contain drop-shadow-lg"
                    />
                </div>
                <div className="hidden sm:block">
                    <h1 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                        Manufacturing Portal
                    </h1>
                </div>
            </Link>

            {/* Navigation Links avec icônes */}
            <NavigationMenu className="flex-none">
                <NavigationMenuList>
                    <NavigationMenuItem className="px-2">
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-white/10 text-white flex items-center gap-2`}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span>Homepage</span>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="px-2">
                        <Link href="/boat-configuration" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-white/10 text-white flex items-center gap-2`}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>Boat Configuration Editor</span>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            {/* User Section */}
            <div className="ml-auto">
                <AuthenticatedNav />
            </div>
        </div>
    );
}
