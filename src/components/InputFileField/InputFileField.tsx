import { classNames } from "@root/utils/functions/utils";
import type { FieldError } from "react-hook-form";

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelClassName?: string;
  caption: React.ReactNode;
  cationClassName?: string;
  error?: FieldError | undefined;
  description?: React.ReactNode;
  descriptionClassName?: string;
}

export default function InputFileField({
  label,
  labelClassName,
  error,
  caption,
  cationClassName,
  description,
  descriptionClassName,
}: InputFileProps) {
  return (
    <div
      id={label?.split(" ").join("-").toLowerCase()}
      className="flex flex-col items-start justify-center w-full"
    >
      <label
        className={`relative first-letter:capitalize block text-body3/medium  text-gray-500  truncate whitespace-nowrap ${labelClassName} ${
          error ? "text-red-500" : ""
        }`}
      >
        {label}
      </label>

      <div className="flex mt-1 flex-col items-center cursor-pointer justify-center w-full h-24 border border-gray-300 border-dashed rounded-lg hover:bg-gray-50 pt-5 pb-6">
        <p
          className={classNames(
            "mb-2 text-body3/regular text-gray-900",
            cationClassName ? cationClassName : ""
          )}
        >
          {caption}
        </p>

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
      </div>

      <input type="file" className="hidden" />
    </div>
  );
}
