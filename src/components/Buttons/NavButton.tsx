import React, { forwardRef } from "react";
// import Loader from "../Loader/Loader";
//primary/secondary/text button with icon

export interface ButtonProps {
    btnType?: "primary" | "secondary" | "text";
    children?: React.ReactNode;
    onClick?: (e?: any) => void;
    disabled?: boolean;
    active?: boolean;
    loading?: boolean;
    className?: string;
    type: "button" | "submit" | "reset";
}

const NavButton = (props: ButtonProps, ref: any) => {
    const {
        btnType = "primary",
        children,
        onClick,
        className,
        active,
        ...rest
    } = props;
    return (
        <button
            ref={ref}
            onClick={onClick}
            className={`p-3 font-medium ${active ? "active" : "disabled"} `}
            {...rest}
        >
            {children}
        </button>
    );
};

export default forwardRef(NavButton);
