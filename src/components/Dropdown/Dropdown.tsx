import React, {
  forwardRef,
  ForwardRefExoticComponent,
  Fragment,
  LegacyRef,
} from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  FieldError,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { classNames } from "../../utils/functions/utils";
import addPropsToChildren from "../helpers/addPropsToChildren";

interface Wrapper<T> {
  children: React.ReactNode;
  value: T | T[];
  onChange: (value: T) => void;
  multiple?: boolean;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  error?: FieldError;
  placeholder?: string;
  by?: any;
}

interface LabelProps {
  error?: any;
  required?: boolean;
  children: React.ReactNode;
  labelClassName?: string;
}

interface ButtonWrapperProps {
  open?: boolean;
  error?: any;
  children: React.ReactNode;
  placeholder?: string;
  className?: string;
}

interface OptionsWrapperProps {
  open?: boolean;
  children: React.ReactNode;
}

interface OptionProps<T> {
  value: T;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

interface Mutations {
  Label: (props: LabelProps) => JSX.Element;
  ButtonWrapper: (props: ButtonWrapperProps) => JSX.Element;
  OptionsWrapper: (props: OptionsWrapperProps) => JSX.Element;
  Option: <T>(props: OptionProps<T>) => JSX.Element;
}

// const ListBox: ForwardRefExoticComponent<Wrapper<unknown>> & Mutations =

const ListBox = forwardRef(
  <T,>(props: Wrapper<T>, ref: React.Ref<HTMLElement>) => {
    return (
      <Listbox
        as="div"
        ref={ref}
        {...props}
        className={classNames("relative", props.className)}
      >
        {({ open }) => (
          <>
            {React.Children.map(props.children, (child) => {
              if (!React.isValidElement(child)) return child;
              if (child.type === ListBox.Label) {
                return React.cloneElement(child, {
                  ...child.props,
                  name: props.name,
                  required: props.required,
                  error: props.error,
                });
              }
              if (child.type === ListBox.ButtonWrapper) {
                return React.cloneElement(child, {
                  ...child.props,
                  open,
                  placeholder: props.placeholder,
                  disabled: props.disabled,
                  value: props.value,
                  error: props.error,
                });
              } else {
                return child;
              }
            })}
            {props.error && (
              <p className={`p-0 pt-1 text-label/regular text-red-500 `}>
                {props.error.message}
              </p>
            )}
          </>
        )}
      </Listbox>
    );
  }
) as ForwardRefExoticComponent<Wrapper<unknown>> & Mutations;

interface ControlledListBox {
  children: React.ReactNode;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
  by?: any;
}

function ControlledListBox<T extends FieldValues>(
  props: UseControllerProps<T> & ControlledListBox
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
      <ListBox
        onChange={onChange}
        value={value}
        error={fieldState.error}
        {...rest}
      >
        {children}
      </ListBox>
    </>
  );
}

ListBox.Label = function Label({ error, required, children, labelClassName }) {
  return (
    <Listbox.Label
      className={`relative block text-body3/medium mb-1  text-gray-500  ${labelClassName} ${
        error?.message ? "text-red-500" : ""
      }`}
    >
      {children}
      {required && (
        <span className="absolute first-letter:capitalize font-light text-red-500 -top-1.5">
          &lowast;
        </span>
      )}
    </Listbox.Label>
  );
};

ListBox.ButtonWrapper = function ButtonWrapper({
  open,
  error,
  children,
  placeholder,
  className,
}) {
  return (
    <>
      <Listbox.Button
        placeholder={placeholder}
        className={classNames(
          `relative focus:ring-1 border focus:ring-blue-500 focus:border-blue-500 flex items-center w-full h-10 gap-1 py-2 pl-2 overflow-hidden text-left bg-white  rounded-md shadow-sm cursor-default`,
          open && "border-blue-500 ",
          error?.message
            ? "  mb-0 placeholder-red-300 border-red-500 ring-1 ring-red-500 focus:ring-red-500  focus:border-red-500  "
            : "border-gray-300",
          className
        )}
      >
        {({ value }) => (
          <>
            {addPropsToChildren({ children, props: value })}
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
          </>
        )}
      </Listbox.Button>
    </>
  );
};

ListBox.OptionsWrapper = function OptionsWrapper(props) {
  return (
    <Transition
      show={props.open}
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none ">
        {props.children}
      </Listbox.Options>
    </Transition>
  );
};

ListBox.Option = function Option<T>(props: OptionProps<T>) {
  return (
    <Listbox.Option
      {...props}
      // disabled={selected.find(
      //     (e) => e.value === person.value
      // )}
      className={({ active, selected }) =>
        classNames(
          active ? "bg-gray-50" : "",
          selected ? "bg-gray-50 cursor-default" : "",
          "relative cursor-pointer select-none first-letter:capitalize ",
          props.className ? props.className : ""
        )
      }
      // disabled={person.unavailable}
    >
      {({ active, disabled, selected }) => (
        <>
          {addPropsToChildren({
            children: props.children,
            props: {
              active,
              disabled,
              selected,
              value: props.value,
            },
          })}
        </>
      )}
    </Listbox.Option>
  );
};

export { ListBox, ControlledListBox };
