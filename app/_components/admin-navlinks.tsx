"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import { routes } from "@/constants/route";

export const AdminNavlinks = () => {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  return (
    <nav>
      <ul className="appearance-none space-y-2">
        {routes.admin.map((route) => (
          <li key={route.route}>
            <Link href={route.route}>
              <Button
                variant="ghost"
                className={`w-full text-left ${
                  isActive(route.route) && "bg-gray-200 hover:bg-gray-200"
                }`}
              >
                {route.label}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
