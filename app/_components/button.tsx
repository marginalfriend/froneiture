"use client";
import React from "react";

export const Button = (props: ButtonProps) => {
  const { children, className, variant } = props;

  const getVariant = (variant?: ButtonVariants) => {
    switch (variant) {
      case "primary":
        return "bg-primary text-white rounded-full shadow hover:brightness-125";
      case "secondary":
        return "bg-white text-black rounded-full shadow hover:brightness-50";
      case "ghost":
        return "bg-transparent text-black rounded-full hover:bg-gray-100";
      default:
        return "bg-primary text-white rounded-full shadow";
    }
  };

  return (
    <button
      {...props}
      className={`px-5 py-2 h-min text-sm ${getVariant(variant)} ${className}`}
    >
      {children}
    </button>
  );
};
