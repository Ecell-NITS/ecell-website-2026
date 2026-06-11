import React from "react";
import { AlertCircle } from "lucide-react";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

export const inputClassName =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-[15px] text-white placeholder-gray-500 transition-all duration-200 hover:bg-white/[0.06] hover:border-white/20 focus:border-blue-500 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm";

export const textareaClassName =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-[15px] text-white placeholder-gray-500 transition-all duration-200 hover:bg-white/[0.06] hover:border-white/20 focus:border-blue-500 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm resize-y min-h-[120px]";

export default function FormField({
  label,
  error,
  required,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between pl-1">
        <label className="text-[15px] font-medium text-white">
          {label}
          {required && <span className="ml-1 text-white">*</span>}
        </label>
        {hint && <span className="text-xs font-medium text-gray-400">{hint}</span>}
      </div>
      <div className="relative">{children}</div>
      {error && (
        <div className="flex items-center gap-1.5 mt-1 text-sm font-medium text-red-400 pl-1">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
