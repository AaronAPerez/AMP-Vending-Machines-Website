'use client';

import { forwardRef } from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  ({ label, error, helpText, required, multiline, rows = 4, className = '', ...props }, ref) => {
    const inputClasses = `w-full px-4 py-2 bg-[#0a0a0a] border ${
      error ? 'border-red-500' : 'border-[#333333]'
    } rounded-lg text-[#F5F5F5] placeholder-[#A5ACAF] focus:border-[#FD5A1E] focus:outline-none transition-colors ${className}`;

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#F5F5F5]">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            className={inputClasses}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={inputClasses}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {helpText && !error && (
          <p className="text-xs text-[#A5ACAF]">{helpText}</p>
        )}

        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
