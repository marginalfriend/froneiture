"use client";
import { routes } from "@/constants/route";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const UserNavlinks = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-[60%] h-full hidden md:flex align-middle my-auto">
      <ul className="inline-flex justify-between w-full font-medium	text-sm">
        {routes.user.map((route) => (
          <li key={route.route}>
            <Link
              className={` hover:text-gray-900 ${
                isActive(route.route) ? "text-primary" : "text-black"
              } font-medium`}
              href={route.route}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
