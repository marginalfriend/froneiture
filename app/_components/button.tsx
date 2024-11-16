"use client";
import React from "react";

export const Button = (props: ButtonProps) => {
  const { children, className } = props;

  return (
    <button {...props} className={`px-8 py-3 rounded-full shadow ${className}`}>
      {children}
    </button>
  );
};
