import { Combobox, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { Fragment, InputHTMLAttributes } from "react";

import {
    FieldError,
    FieldValues,
    useController,
    UseControllerProps,
} from "react-hook-form";
import { classNames } from "../../utils/functions/utils";
import addPropsToChildren from "../helpers/addPropsToChildren";

type ComboBoxProps<T> = {
    children: React.ReactNode;
    placeholder?: string;
    multiple?: boolean;
    value?: any;
    className?: string;
    required?: boolean;
    by?: any;
    disabled?: boolean;
    name?: string;
    error?: FieldError;
    onChange?(value: T): void;
};

function ComboBox<T>(props: ComboBoxProps<T>) {
    return !props.multiple ? (
        <Combobox value={props.value} onChange={props.onChange} by={props.by}>
            {({ open }) => (
                <div className={classNames("relative", props.className)}>
                    {React.Children.map(props.children, (child) => {
                        if (!React.isValidElement(child)) return child;
                        if (child.type === ComboBox.Label) {
                            return React.cloneElement(child, {
                                ...child.props,
                                name: props.name,
                                required: props.required,
                                error: props.error,
                            });
                        }
                        if (child.type === ComboBox.InputWrapper) {
                            return React.cloneElement(child, {
                                ...child.props,
                                open,
                                placeholder: props.placeholder,
                                disabled: props.disabled,
                                error: props.error,
                                value: props.value,
                            });
                        }
                        if (child.type === ComboBox.Input) {
                            return React.cloneElement(child, {
                                ...child.props,
                                open,
                                placeholder: props.placeholder,
                                disabled: props.disabled,
                                error: props.error,
                                value: props.value,
                            });
                        } else {
                            return child;
                        }
                    })}
                    {props.error && (
                        <p
                            className={`p-0 pt-1 text-label/regular text-red-500 `}
                        >
                            {props.error.message}
                        </p>
                    )}
                </div>
            )}
        </Combobox>
    ) : (
        <Combobox
            multiple
            value={props.value}
            onChange={props.onChange}
            by={props.by}
        >
            {({ open }) => (
                <div className={classNames("relative", props.className)}>
                    {React.Children.map(props.children, (child) => {
                        if (!React.isValidElement(child)) return child;
                        if (child.type === ComboBox.Label) {
                            return React.cloneElement(child, {
                                ...child.props,
                                name: props.name,
                                error: props.error,
                                required: props.required,
                            });
                        }
                        if (child.type === ComboBox.Input) {
                            return React.cloneElement(child, {
                                ...child.props,
                                open,
                                placeholder: props.placeholder,
                                disabled: props.disabled,
                                error: props.error,
                                value: props.value,
                            });
                        } else {
                            return child;
                        }
                    })}
                    {props.error && (
                        <p
                            className={`p-0 pt-1 text-label/regular text-red-500 `}
                        >
                            {props.error.message}
                        </p>
                    )}
                </div>
            )}
        </Combobox>
    );
}

function ControlledComboBox<T extends FieldValues>(
    props: UseControllerProps<T> & ComboBoxProps<T>
) {
    const { children, ...rest } = props;

    const {
        field: { onBlur, onChange, value },
        fieldState,
    } = useController({
        ...rest,
        rules: {
            ...rest.rules,
            validate: (val) => {
                if (!rest.required) return true;
                if (!val) return `${rest?.name} field is required!`;
            },
        },
    });

    return (
        <>
            <ComboBox
                onChange={onChange}
                value={value}
                error={fieldState.error}
                {...rest}
            >
                {children}
            </ComboBox>
        </>
    );
}

ComboBox.Label = function Label({
    name,
    error,
    required,
    children,
    labelClassName,
}: {
    name?: string;
    error?: any;
    required?: boolean;
    children: React.ReactNode;
    labelClassName?: string;
}) {
    return (
        <Combobox.Label
            className={`relative block text-body3/medium  mb-1 text-gray-500  ${labelClassName} ${
                error?.message ? "text-red-500" : ""
            }`}
        >
            {children}
            {required && (
                <span className="absolute font-light text-red-500 -top-1.5">
                    &lowast;
                </span>
            )}
        </Combobox.Label>
    );
};

interface InputFieldInterface extends InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    disabled?: boolean;
    error?: FieldError;
    value?: string;
    displayValue?(value: any | any[]): string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

ComboBox.Input = function Input({
    placeholder,
    disabled,
    value,
    onChange,
    displayValue,
    className,
    ...props
}: InputFieldInterface) {
    return (
        <Combobox.Button
            as="div"
            className={classNames(
                "w-full h-full",
                disabled && "pointer-events-none"
            )}
        >
            <Combobox.Input
                placeholder={placeholder}
                autoComplete="off"
                displayValue={displayValue}
                className={classNames(
                    "truncate  flex border-none outline-none ring-0 pr-10 focus:ring-0 focus:outline-none h-full w-full",
                    disabled && "bg-gray-50 text-gray-400"
                )}
                onChange={onChange}
            />
            {props.children}
            <Combobox.Button
                className={classNames(
                    "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 "
                )}
            >
                {({ open }) => (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                        {open ? (
                            <ChevronUpIcon
                                className="w-4 h-4 text-gray-900 "
                                aria-hidden="true"
                            />
                        ) : (
                            <ChevronDownIcon
                                className="w-4 h-4 text-gray-500 "
                                aria-hidden="true"
                            />
                        )}
                    </span>
                )}
            </Combobox.Button>
        </Combobox.Button>
    );
};

interface InputWrapperInterface {
    children: React.ReactNode;
    error?: FieldError;
    disabled?: boolean;
    className?: string;
}

ComboBox.InputWrapper = function InputWrapper(props: InputWrapperInterface) {
    return (
        <div
            className={classNames(
                `relative border
     "mt-1" rounded-md `,
                props.error
                    ? "  mb-0 placeholder-red-300 border-red-500 ring-1 ring-red-500 focus:ring-red-500  focus:border-red-500  "
                    : "     border-gray-300   focus:ring-blue-500 focus:border-blue-500 text-gray-900",
                "placeholder:text-body2/regular border bg-white placeholder:text-gray-400 text-body2/regular truncate flex flex-wrap w-full rounded-md disabled:bg-gray-50/50 disabled:text-gray-400 disabled:border disabled:h-[38px] min-h-[38px] disabled:pl-3",
                props.className,
                props.disabled &&
                    "bg-gray-50/50 text-gray-400 border-gray-300 pointer-events-none"
            )}
        >
            {addPropsToChildren({
                children: props.children,
                props: {
                    error: props.error,
                },
            })}
        </div>
    );
};

ComboBox.List = function List({
    children,
    className,
    open,
}: {
    children: React.ReactNode;
    open?: boolean;
    className?: string;
}) {
    return (
        <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <Combobox.Options
                className={classNames(
                    "absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none ",
                    className
                )}
            >
                {children}
            </Combobox.Options>
        </Transition>
    );
};

ComboBox.Option = function Option<T>({
    children,
    ...props
}: {
    children: React.ReactNode;
    value: T;
    className?: string;
    disabled?: boolean;
}) {
    return (
        <Combobox.Option
            {...props}
            className={({ active, selected }) =>
                classNames(
                    active ? "bg-gray-50" : "",
                    selected ? "bg-gray-50 cursor-default" : "",
                    "relative cursor-pointer select-none first-letter:capitalize "
                )
            }
        >
            {({ active, disabled, selected }) => (
                <>
                    {addPropsToChildren({
                        children,
                        props: {
                            active,
                            disabled,
                            selected,
                        },
                    })}
                </>
            )}
        </Combobox.Option>
    );
};

export { ComboBox, ControlledComboBox };
