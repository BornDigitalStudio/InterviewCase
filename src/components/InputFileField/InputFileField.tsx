import { LegacyRef, forwardRef } from "react";
import type { FieldError } from "react-hook-form";

import { classNames } from "@utils/functions/utils";

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ontoInputLabel: string;
  ontoLabelClassName?: string;
  label: React.ReactNode;
  labelClassName?: string;
  error?: FieldError | undefined;
  description?: React.ReactNode;
  descriptionClassName?: string;
}

const InputFileField = forwardRef(
  (
    {
      ontoInputLabel,
      ontoLabelClassName,
      error,
      label,
      labelClassName,
      description,
      descriptionClassName,
      required,
      ...rest
    }: InputFileProps,
    ref: LegacyRef<HTMLInputElement>
  ) => {
    return (
      <div
        id={ontoInputLabel?.split(" ").join("-").toLowerCase()}
        className="flex flex-col items-start justify-center w-full"
      >
        <p
          className={`relative first-letter:capitalize block text-body3/medium  text-gray-500  truncate whitespace-nowrap ${ontoLabelClassName} ${
            error ? "text-red-500" : ""
          }`}
        >
          {ontoInputLabel}
          {required && (
            <span className="absolute font-light text-red-500 -top-1.5">
              &lowast;
            </span>
          )}
        </p>

        <div className="cursor-pointer w-full h-24 border border-gray-300 border-dashed rounded-lg hover:bg-gray-50">
          <label
            htmlFor={ontoInputLabel}
            className={classNames(
              "mb-2 h-full w-full flex mt-1 flex-col justify-center items-center text-body3/regular cursor-pointer text-gray-900",
              labelClassName ? labelClassName : ""
            )}
          >
            {label}

            {description && (
              <p
                className={classNames(
                  "text-label/regular text-gray-500",
                  descriptionClassName ? descriptionClassName : ""
                )}
              >
                {description}
              </p>
            )}

            <input
              id={ontoInputLabel}
              {...rest}
              ref={ref}
              type="file"
              className="hidden"
            />
          </label>
        </div>
      </div>
    );
  }
);

export default InputFileField;
