"use client";

import { Button } from "@/app/_components/button";
import { useRouter } from "next/navigation";
import React from "react";
import swal from "sweetalert";

export const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
  };

  const onLogout = () =>
    swal({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleLogout();
      } else {
      }
    });
  return (
    <Button onClick={onLogout} className="w-full">
      Logout
    </Button>
  );
};
