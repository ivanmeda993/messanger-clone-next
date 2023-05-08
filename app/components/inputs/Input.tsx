"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}
const Input = ({
  errors,
  register,
  id,
  disabled,
  label,
  required,
  type = "text",
}: InputProps) => {
  return (
    <div className="mt-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        {...register(id, { required })}
        className={clsx(
          `
            form-input
            block
            w-full
            rounded-md
            border-0
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-gray-300
            ring-inset
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-sky-600
            sm:text-sm
            sm:leading-6
        `,
          errors[id] &&
            `border-red-300 text-red-900 placeholder-red-300 focus:ring-rose-500`,
          disabled && `opacity-50 cursor-default`
        )}
      />
    </div>
  );
};

export default Input;
