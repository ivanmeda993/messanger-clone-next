"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IMessageInputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

const MessageInput = ({
  errors,
  placeholder,
  required,
  register,
  id,
  type = "text",
}: IMessageInputProps) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        placeholder={placeholder}
        {...register(id, { required })}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none focus:ring-1 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-neutral-100"
      />
    </div>
  );
};

export default MessageInput;
