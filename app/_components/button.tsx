"use client";
import React from "react";

export const Button = (props: ButtonProps) => {
  const { children, className, variant } = props;

  const getVariant = (variant?: ButtonVariants) => {
    switch (variant) {
      case "primary":
        return "px-5 py-2 h-min bg-primary text-white rounded-full shadow hover:brightness-150";
      case "secondary":
        return "px-5 py-2 h-min bg-white text-black rounded-full shadow hover:brightness-50";
      case "ghost":
        return "px-5 py-2 h-min bg-transparent text-black rounded-full hover:bg-gray-100";
      default:
        return "px-5 py-2 h-min bg-primary text-white rounded-full shadow";
    }
  };

  return (
    <button {...props} className={`${getVariant(variant)} ${className}`}>
      {children}
    </button>
  );
};
