"use client";

import { Button } from "@/app/_components/button";
import { useRouter } from "next/navigation";
import React from "react";

export const LogoutButton = () => {
  const router = useRouter();
  const onLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
  };
  return (
    <Button onClick={onLogout} className="w-full">
      Logout
    </Button>
  );
};
