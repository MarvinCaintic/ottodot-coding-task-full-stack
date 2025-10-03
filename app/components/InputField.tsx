
import React from "react";

interface InputFieldProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export default function InputField({
  type = "text",
  value,
  onChange,
  placeholder = "",
  label = "",
  required = false,
  className = "",
}: InputFieldProps) {
  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`app-input ${className}`}
      />
    </div>
  );
}
