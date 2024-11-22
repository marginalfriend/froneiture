import React, { InputHTMLAttributes, LabelHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
export const Input = (props: InputProps) => {
  return <input {...props} className="border px-2 py-1 rounded-full w-full" />;
};

export const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  const { children } = props;
  return <label className="text-sm text-gray-500 pl-2">{children}</label>;
};
