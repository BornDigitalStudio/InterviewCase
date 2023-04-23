import { format, getDate, startOfMonth, startOfToday } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import {
    UseControllerProps,
    useController,
    FieldValues,
} from "react-hook-form";
import { Tooltip } from "react-tooltip";
import { classNames } from "../../utils/functions/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import TimePicker from "../TimePicker/TimePicker";


const Calendar = <T extends FieldValues>({
    disabled,
    label,
    errorClassName,
    time,
    className,
    dataTip,
    name,
    control,
    rules,
    shouldUnregister,
    defaultValue,
    required,
    labelClassName,
    minDate,
    maxDate,
}: {
    disabled?: boolean;
    errorClassName?: string;
    label: string;
    minDate?: boolean;
    maxDate?: boolean;
    className?: string;
    time?: boolean;
    dataTip?: string;
    required?: boolean;
    labelClassName?: string;
} & UseControllerProps<T>) => {
    const today = startOfToday();

    const {
        field: { onChange: setSelectedDay, value: selectedDay, ref },
        fieldState: { error },
    } = useController<T>({
        shouldUnregister,
        rules: {
            ...rules,
            validate: (value) => {
                if (required && !value) {
                    return `${label || name} is required`;
                }
                return true;
            },
        },
        name,
        control,
        defaultValue,
    });

    // const [selectedDay, setSelectedDay] = useState(today);

    return (
        <div className={classNames("w-full h-full", className)}>
            {label && (
                <>
                    {dataTip ? (
                        <Tooltip
                            anchorId={label?.split(" ").join("-").toLowerCase()}
                            content={dataTip}
                            delayShow={500}
                            style={{
                                fontWeight: 400,
                                lineHeight: "16.8px",
                                fontSize: "12px",
                            }}
                            classNameArrow="!left-10"
                            // place="top"
                        />
                    ) : null}
                    <label
                        // data-tooltip-content={dataTip}

                        htmlFor={label}
                        className={`relative first-letter:capitalize block text-body3/medium  text-gray-500  truncate whitespace-nowrap ${labelClassName} ${
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
                </>
            )}
            <div className="relative mt-1">
                <ReactDatePicker
                    autoComplete="off"
                    openToDate={minDate ? new Date(today) : undefined}
                    minDate={minDate ? new Date(today) : undefined}
                    // maxDate={maxDate ? new Date(today.setMonth(today.getMonth() + 3)) : undefined}
                    renderCustomHeader={({
                        date,
                        decreaseMonth,
                        increaseMonth,
                    }) => (
                        <HeaderComponent
                            date={date}
                            decreaseMonth={decreaseMonth}
                            increaseMonth={increaseMonth}
                        />
                    )}
                    id={label}
                    disabled={disabled}
                    dateFormat={time ? "dd-MM-yyyy, HH:mm" : "dd-MM-yyyy"}
                    timeFormat="HH:mm aa"
                    selected={selectedDay ? new Date(selectedDay) : null}
                    className={classNames(
                        error
                            ? "block w-full  mb-0 placeholder-red-300 border-red-500 rounded-md focus:outline-none focus:ring-red-500  focus:border-red-500  "
                            : "block w-full  disabled:bg-gray-50/50 disabled:text-gray-400   border-gray-100 rounded-md  focus:ring-blue-500 focus:border-blue-500 text-gray-900",
                        "placeholder:text-body2/regular placeholder:text-gray-400 text-body2/regular",
                        "truncate"
                    )}
                    popperPlacement="bottom-start"
                    placeholderText="DD-Mon-YYYY"
                    showPopperArrow={false}
                    popperClassName="!pt-1 !flex !flex-col !items-center !justify-center !text-center"
                    calendarClassName="!bg-white  !p-4 !border !border-gray-100 rounded-md shadow-lg !w-full  !flex !flex-col !items-center !justify-center !text-center"
                    onChange={(date) => {
                        setSelectedDay(date?.getTime());
                    }}
                    showTimeInput={time}
                    timeInputLabel=""
                    // dayClassName={( date ) => {

                    // }}

                    renderDayContents={(day, date) => {
                        if (date)
                            return (
                                <div
                                    className={classNames(
                                        "!flex !items-center !justify-center !text-center w-[38px]  !h-[38px]",
                                        startOfMonth(date) ===
                                            startOfMonth(today)
                                            ? "!text-gray-300"
                                            : ""
                                    )}
                                >
                                    {getDate(date)}{" "}
                                </div>
                            );
                    }}
                    customTimeInput={
                        <div className="w-full mt-3">
                            <TimePicker
                                value={selectedDay || today.getTime()}
                                onChange={setSelectedDay}
                                error={error}
                            />
                        </div>
                    }
                />
                <img
                    src="/assets/icons/date/calendar.svg"
                    alt="calendar"
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 right-1.5 top-1/2 cursor-pointer"
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

export default Calendar;

const HeaderComponent = ({
    decreaseMonth,
    increaseMonth,
    date,
}: {
    decreaseMonth: () => void;
    increaseMonth: () => void;
    date: Date;
}) => {
    return (
        <div className="!flex !items-center !justify-center p-2 !text-body1/medium">
            <button
                type="button"
                onClick={decreaseMonth}
                className="flex items-center justify-center flex-none text-gray-400 hover:text-gray-500"
            >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            <h2
                onClick={(e: any) => e.preventDefault()}
                className="flex-auto text-center mt-1 text-gray-900 sm:!text-body1/medium !text-body2/medium"
            >
                {format(date, "MMMM yyyy")}
            </h2>
            <button
                onClick={increaseMonth}
                type="button"
                className="flex items-center justify-center flex-none text-gray-400 hover:text-gray-500"
            >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </button>
        </div>
    );
};
