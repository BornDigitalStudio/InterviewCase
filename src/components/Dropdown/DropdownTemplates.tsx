import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FieldErrors } from "react-hook-form";
import { classNames } from "../../utils/functions/utils";


function TextWithCheckIcon({
    active,
    selected,
    children,
    disabled,
}: {
    active?: boolean;
    selected?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div
            className={classNames(
                active ? "text-white bg-blue-500" : "text-gray-900",
                "relative cursor-pointer select-none py-2 pl-3 pr-9 first:rounded-t-md last:rounded-b-md first-letter:capitalize",

                disabled &&
                    "opacity-70 bg-blue-50 text-gray-900 cursor-default text-body2/regular"
            )}
        >
            <span
                className={classNames(
                    selected || active || disabled
                        ? "font-semibold"
                        : "font-normal",
                    "block truncate "
                )}
            >
                {children}
            </span>

            <span
                className={classNames(
                    active && "text-white",
                    selected && "text-blue-500",
                    "absolute inset-y-0 right-0 flex items-center pr-4 ",
                    disabled && "hidden"
                )}
            >
                <CheckIcon className="w-5 h-5" aria-hidden="true" />
            </span>
        </div>
    );
}

function NormalButton({
    error,
    children,
}: {
    error?: FieldErrors;
    children?: React.ReactNode;
}) {
    return (
        <div className="flex items-center px-2 py-1 text-black border border-gray-100 rounded-md cursor-pointer text-body3/regular bg-gray-50">
            <span className="block truncate">{children}</span>

            <XMarkIcon
                className={`w-4 h-4 ${
                    error?.message
                        ? "text-red-500 hover:text-red-600"
                        : "text-gray-500 hover:text-gray-600"
                }`}
            />
        </div>
    );
}

function ButtonWithDeleteIcon(props: {
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

    children: React.ReactNode;
}) {
    return (
        <div
            onClick={props.onClick}
            className="flex items-center gap-0.5 px-2 py-1 text-black border border-gray-100 rounded-md cursor-pointer text-body3/regular bg-gray-50"
        >
            <span className="block truncate">{props.children}</span>
            <XMarkIcon
                className={`w-3 h-3 ${"text-gray-500 hover:text-gray-600"}`}
            />
        </div>
    );
}

export { TextWithCheckIcon, ButtonWithDeleteIcon };
