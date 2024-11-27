"use client";

import { Button } from "@/app/_components/button";
import { Input, Label } from "@/app/_components/input";
import React from "react";

export const LoginForm = () => {
  return (
    <div className="w-full max-w-sm bg-white shadow space-y-6 px-4 pb-8 pt-6 rounded-xl">
      <h1 className="font-bold text-xl text-center">Login as Admin</h1>
      <form className="space-y-6">
        <div>
          <div className="space-y-1">
            <Label>Email</Label>
            <Input placeholder="email@example.com" type="email" />
          </div>
          <div className="space-y-1">
            <Label>Password</Label>
            <Input placeholder="**********" type="password" />
          </div>
        </div>
        <Button className="w-full">Login</Button>
      </form>
    </div>
  );
};
