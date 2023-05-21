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
  area?: boolean;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  area,
  disabled,
}) => {
  return (
    <div>
      <label
        className="font-extralight block text-sm  text-white/75 leading-6"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-2">
        {!area && (
          <input
            id={id}
            type={type}
            disabled={disabled}
            {...register(id, { required })}
            className={clsx(
              " font-extralight bg-white/75 form-input block w-full rounded-md border-0 py-1.5 text-rich-black shadow-sm  placeholder:text-gray-400 ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-rich-black sm:text-sm sm:leading-6 ",
              errors[id] && "focus:ring-rose-500",
              disabled && "opacity-50 cursor-default"
            )}
          />
        )}
        {area && (
          <textarea
            id={id}
            disabled={disabled}
            {...register(id, { required })}
            className={clsx(
              " bg-white/75 form-input block w-full rounded-md border-0 py-1.5 text-rich-black shadow-sm ring-1 ring-inset placeholder:text-gray-400 ring-ultra-violet focus:ring-2 focus:ring-inset focus:ring-rich-black sm:text-sm sm:leading-6 ",
              errors[id] && "focus:ring-rose-500",
              disabled && "opacity-50 cursor-default"
            )}
          />
        )}
      </div>
    </div>
  );
};
