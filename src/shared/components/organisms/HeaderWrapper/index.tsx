"use client";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/shared/components/organisms/Header"), {
    ssr: false,
});

export default function HeaderWrapper() {
    return <Header />;
}
