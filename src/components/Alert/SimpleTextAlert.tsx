import React from "react";

interface SimpleTextAlertProps {
    text: string;
}

function SimpleTextAlert({ text }: SimpleTextAlertProps) {
    return (
        <div className="flex items-start gap-x-2 ">
            <img src="/assets/icons/info-icon.svg" alt="info" />
            <p className="pt-0.5 text-gray-500 text-body3/regular">{text}</p>
        </div>
    );
}

export default SimpleTextAlert;
