"use client";
import React from "react";

export const Button = (props: ButtonProps) => {
  const { children } = props;

  return (
    <button {...props} className="px-[60px] py-20px rounded-full shadow">
      {children}
    </button>
  );
};
