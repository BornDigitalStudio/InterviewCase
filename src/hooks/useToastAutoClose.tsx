import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
    toasts: {
        id: string;
        message: string;
        type: "info" | "confirm" | "alert" | "warning";
        discription?: string;
        cloasable?: boolean;
    }[];
    setToasts: Dispatch<
        SetStateAction<
            {
                id: string;
                message: string;
                discrition?: string;
                type: "info" | "confirm" | "alert" | "warning";
                cloasable?: boolean;
            }[]
        >
    >;
    autoClose?: boolean;
    autoCloseTimeout?: number;
};

export const useToastAutoclose = ({
    toasts,
    setToasts,
    autoClose,
    autoCloseTimeout,
}: Props) => {
    const [removing, setRemoving] = useState<string>();

    useEffect(() => {
        let currTimeout: string | number | NodeJS.Timeout | undefined;
        if (toasts.length && autoClose) {
            const id = toasts[toasts.length - 1].id;
            currTimeout = setTimeout(() => {
                setRemoving(id);
            }, autoCloseTimeout);
        }
        return () => clearTimeout(currTimeout);
    }, [toasts, autoCloseTimeout, autoClose]);

    useEffect(() => {
        if (removing) {
            setToasts((t) => t.filter((_t) => _t.id !== removing));
        }
    }, [removing, setToasts]);
};
