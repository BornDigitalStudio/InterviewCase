import { XMarkIcon } from "@heroicons/react/24/outline";
import Icon from "@components/IcomoonIcon/Icon";

export const Toast = ({
    text,
    type = "info",
    discription,
    onClose,
    cloasable,
}: {
    text: string;
    cloasable?: boolean;
    discription?: string;
    type: "info" | "confirm" | "alert" | "warning";
    onClose?: () => void;
}) => {
    return (
        <div
            // layout
            // initial={{ opacity: 0, y: -50 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ opacity: { duration: 0.2 }, y: { duration: 0.4 } }}
            // exit={{
            //     opacity: 0,
            //     y: -50,
            //     transition: { opacity: { duration: 0.5 }, y: { duration: 1 } },
            // }}
            className={` max-w-[540px] w-full h-full min-h-[50px] text-body2/medium text-gray-900 flex shadow-sm items-start justify-between p-5 gap-4 my-3  rounded-lg border-l-8 ${
                type === "info"
                    ? "bg-blue-50 border-blue-500"
                    : type === "confirm"
                    ? "bg-green-50 border-green-500"
                    : type === "alert"
                    ? "bg-red-50 border-red-500"
                    : "bg-yellow-50 border-yellow-500"
            } `}
        >
            <div className={`flex  space-x-4 `}>
                {type === "info" && (
                    <Icon size={16} icon="help-circle" color="blue" />
                )}
                {type === "confirm" && (
                    <Icon size={16} icon="checkmark" />
                )}
                {type === "alert" && (
                    <Icon size={16} icon="minus-outline" />
                )}
                {type === "warning" && (
                    <Icon size={16} icon="warning" />
                )}
                <div className="flex flex-col gap-2">
                    <p className="font-medium text-gray-900 text-body2/regular">
                        {text}
                    </p>
                    <p className="text-gray-500 text-body2/regular">
                        {discription}
                    </p>
                </div>
            </div>
            {cloasable && (
                <button onClick={onClose}>
                    <XMarkIcon className="w-5 h-5 " />
                </button>
            )}
        </div>
    );
};
