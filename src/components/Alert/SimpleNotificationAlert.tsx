import React from "react";

interface SimpleNotificationAlertProps {
    text: string;
}

function SimpleNotificationAlert({ text }: SimpleNotificationAlertProps) {
    return (
        <div className="flex items-center gap-4 p-4 text-gray-900 rounded-md bg-blue-50">
            <img src="/assets/icons/info-icon-2.svg" alt="info" />
            <p className="text-body3/regular">{text}</p>
        </div>
    );
}

export default SimpleNotificationAlert;
