import { cn } from "@/lib/utils";
import React from "react";

interface SelectProps {
  name: string;
  id?: string;
  options: { id: string; name: string }[] | never[];
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = (props) => {
  const {
    className,
    name,
    id,
    options,
    placeholder = "Select an option",
    onChange,
    value,
  } = props;
  return (
    <div className={cn("relative w-64", className)}>
      <select
        name={name}
        id={id || name}
        className="text-sm md:text-md appearance-none w-full px-4 py-2 bg-white border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={onChange}
        value={value}
      >
        {placeholder && (
          <option value="" className="text-gray-500" key={"placeholder"}>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {/* Custom dropdown icon */}
      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Select;
