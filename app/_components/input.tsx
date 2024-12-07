import { cn } from "@/lib/utils";
import React, { InputHTMLAttributes, LabelHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
export const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className="border px-4 py-2 rounded-full w-full text-sm"
    />
  );
};

export const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  const { children, className } = props;
  return (
    <label className={cn("text-sm text-gray-500 pl-2", className)} {...props}>
      {children}
    </label>
  );
};
