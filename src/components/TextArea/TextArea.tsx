import React, { forwardRef, ForwardRefRenderFunction } from "react";

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
    error: any;
    className?: string;
    inputClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
}

const TextArea: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = (
    props: TextAreaProps,
    ref
) => {
    const {
        required,
        label,
        error,
        className,
        inputClassName,
        labelClassName,
        errorClassName,
    } = props;

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label
                    // data-tip={dataTip}
                    htmlFor={label}
                    className={`relative block text-body3/medium  text-gray-500  truncate whitespace-nowrap ${labelClassName} ${
                        error ? "text-red-500" : ""
                    }`}
                >
                    {label}
                    {required && (
                        <span className="absolute font-light text-red-500 -top-1.5">
                            &lowast;
                        </span>
                    )}
                </label>
            )}
            <div className="mt-1">
                <textarea
                    {...props}
                    rows={4}
                    className={`${
                        error
                            ? "block w-full pr-10 mb-0 placeholder-red-300 border-red-500 rounded-md focus:outline-none focus:ring-red-500  focus:border-red-500  "
                            : "block w-full  disabled:bg-gray-50/50 disabled:text-gray-400   border-gray-100 rounded-md  focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    } ${inputClassName}  placeholder:text-body2/regular placeholder:text-gray-400 text-body2/regular  truncate  `}
                />
            </div>
            {error && (
                <p
                    className={`p-0 pt-1 text-label/regular text-red-500 ${errorClassName}`}
                >
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default forwardRef(TextArea);
