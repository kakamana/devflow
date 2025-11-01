"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

const NavLinks = ({
  isMobileNav = false,
  userId,
}: {
  isMobileNav?: boolean;
  userId?: string;
}) => {
  const pathname = usePathname();

  return (
    <>
      {sidebarLinks.map((item) => {
        // Never mutate sidebarLinks; compute href dynamically to avoid SSR/CSR mismatch
        const isProfile = item.route === "/profile";
        const href = isProfile && userId ? `/profile/${userId}` : item.route;

        // Hide profile link if user not logged in
        if (isProfile && !userId) return null;

        // Use the computed href for active state comparison
        const isActive =
          (href.length > 1 && pathname.startsWith(href)) || pathname === href;

        const LinkComponent = (
          <Link
            href={href}
            key={`${item.label}-${href}`}
            className={cn(
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900",
              "flex items-center justify-start gap-4 bg-transparent p-4"
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn({ "invert-colors": !isActive })}
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {item.label}
            </p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose asChild key={`${item.label}-${href}`}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={`${item.label}-${href}`}>
            {LinkComponent}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
