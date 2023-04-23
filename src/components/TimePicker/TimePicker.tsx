import React, { Dispatch, SetStateAction } from "react";
import UncontrolledAutocomplete from "../Autocomplete/Autocomplete/UncontrolledAutocomplete";
import { BsThreeDots } from "react-icons/bs";
import { classNames } from "../../utils/functions/utils";

export interface TimePickerProps {
    value: number;
    onChange: (val: number) => void;
    error: any;
    label?: string;
    required?: boolean;
    placeholder?: string;
    className?: string;
}

function TimePicker({
    value,
    onChange,
    error,
    label,
    required,
    placeholder,
    className,
}: TimePickerProps) {
    return (
        <div
            className={classNames(
                " w-full  flex justify-center items-center",
                className
            )}
        >
            <UncontrolledAutocomplete
                inputFieldClassName="!w-[82px]"
                options={
                    new Date(value).getHours() >= 12
                        ? [
                              "12",
                              "23",
                              "22",
                              "21",
                              "20",
                              "19",
                              "18",
                              "17",
                              "16",
                              "15",
                              "14",
                              "13",
                          ]
                        : [
                              "0",
                              "1",
                              "2",
                              "3",
                              "4",
                              "5",
                              "6",
                              "7",
                              "8",
                              "9",
                              "10",
                              "11",
                          ]
                }
                value={new Date(value).getHours()}
                onChange={(val) => {
                    const date = new Date(value);
                    date.setHours(parseInt(val as string));
                    onChange(date.getTime());
                }}
                placeholder="hh"
            />
            <div className="flex items-center justify-center">
                <BsThreeDots size={20} className="text-gray-500 rotate-90" />
            </div>
            <UncontrolledAutocomplete
                inputFieldClassName="!w-[82px]"
                placeholder="mm"
                options={["00", "30"]}
                value={new Date(value).getMinutes()}
                onChange={(val) => {
                    const date = new Date(value);
                    date.setMinutes(parseInt(val as string));
                    onChange(date.getTime());
                }}
            />

            <UncontrolledAutocomplete
                inputFieldClassName="!w-[82px]"
                placeholder="AM/PM"
                className="ml-2"
                options={["AM", "PM"]}
                value={new Date(value).getHours() >= 12 ? "PM" : "AM"}
                onChange={(val) => {
                    const date = new Date(value);
                    date.setHours(date.getHours() + (val === "PM" ? 12 : -12));
                    onChange(date.getTime());
                }}
            />
        </div>
    );
}

export default TimePicker;
