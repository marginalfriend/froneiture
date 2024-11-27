"use client";

import { Button } from "@/app/_components/button";
import { Input, Label } from "@/app/_components/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (key: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formState),
      });

      const { status, ok } = response;

      if (status === 403 || status === 401)
        return setError("Invalid credentials");

      if (!ok) return setError("Failed to login");

      router.push("/admin/products");
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white shadow space-y-6 px-4 pb-8 pt-6 rounded-xl">
      <h1 className="font-bold text-xl text-center">Login as Admin</h1>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              placeholder="email@example.com"
              type="email"
              required
              value={formState.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              placeholder="**********"
              type="password"
              required
              value={formState.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button
          className="w-full"
          type="submit"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};
