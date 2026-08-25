"use client";

import { useState, type HTMLInputTypeAttribute } from "react";
import type {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;

  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;

  register: UseFormRegister<T>;

  validation?: RegisterOptions<
    T,
    Path<T>
  >;

  error?: FieldError;

  isPassword?: boolean;
  helperText?: string;
};

export default function FormInput<
  T extends FieldValues
>({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  register,
  validation,
  error,
  isPassword = false,
  helperText,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] =
    useState(false);

  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-[#25282B]"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register(name, validation)}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-[#25282B] outline-none transition duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-[#E60000]/15 ${
            isPassword ? "pr-20" : ""
          } ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 hover:border-gray-400 focus:border-[#E60000]"
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (current) => !current
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#E60000] transition hover:text-[#B80000]"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {error ? (
        <p className="mt-2 text-xs font-medium text-red-600">
          {error.message}
        </p>
      ) : (
        helperText && (
          <p className="mt-2 text-xs text-gray-500">
            {helperText}
          </p>
        )
      )}
    </div>
  );
}