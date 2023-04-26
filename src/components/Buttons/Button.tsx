import React, { forwardRef } from "react";
// import Loader from "../Loader/Loader";
//primary/secondary/text button with icon

export interface ButtonProps {
    btnType?: "primary" | "secondary" | "text";
    children?: React.ReactNode;
    onClick?: (e?: any) => void;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    underline?: boolean;
    loading?: boolean;
    className?: string;
    type: "button" | "submit" | "reset";
    form?: string;
}

const Button = (props: ButtonProps, ref: any) => {
    const {
        btnType = "primary",
        children,
        onClick,
        size = "sm",
        className,
        underline,
        form,
        loading,
        ...rest
    } = props;
    return (
        <button
            ref={ref}
            form={form}
            onClick={onClick}
            className={` ${
                btnType === "primary"
                    ? "bg-blue-500 text-white  hover:bg-blue-600"
                    : btnType === "secondary"
                    ? "border border-gray-100 text-gray-900 hover:text-blue-500 "
                    : btnType === "text"
                    ? "text-blue-500 hover:text-blue-600 "
                    : ""
            } 
                    
            ${
                size === "sm"
                    ? "px-4 py-1.5 text-button2/semibold"
                    : size === "md"
                    ? "px-4 py-2.5 text-button1/semibold"
                    : size === "lg"
                    ? "px-4 py-4 text-button/bold"
                    : ""
            } 
            ${underline ? "underline" : ""} 
            ${btnType === "text" ? "px-0 py-0 p-0 border-none" : ""} 
            outline-none relative rounded-md disabled:text-gray-400 disabled:border disabled:border-gray-100 disabled:bg-transparent flex items-center justify-center gap-x-1.5 whitespace-nowrap
            ${className}
            ${loading ? "relative" : ""}`}
            {...rest}
        >
            {/* {loading ? (
                <Loader
                    className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"}`}
                />
            ) : null} */}
            {/* <>
                <span
                    className={`${
                        loading
                            ? " w-5 h-5 border-t-2 border-b-2 opacity-100 border-gray-400 rounded-full animate-spin "
                            : "opacity-0 w-5 h-5"
                    }`}
                ></span>
                <span
                    className={`${
                        loading ? "opacity-0" : "opacity-100"
                    } absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 `}
                > */}
            {children}
            {/* </span>
            </> */}
        </button>
    );
};

export default forwardRef(Button);
