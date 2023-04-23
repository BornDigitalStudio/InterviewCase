import { Dialog, Transition } from "@headlessui/react";
import React, { Children, Fragment, useState } from "react";
import { classNames } from "../../utils/functions/utils";
import Button, { ButtonProps } from "../Buttons/Button";
import addPropsToChildren from "../helpers/addPropsToChildren";
import Icon from "../IcomoonIcon/Icon";

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    closeModal(): void;
    openModal(): void;
    className?: string;
}

function Modal(props: ModalProps) {
    return (
        <Transition appear show={props.isOpen} as={Fragment}>
            <Dialog
                onClose={props.closeModal}
                as="div"
                className={classNames("relative z-20 ", props.className)}
            >
                {addPropsToChildren({
                    children: props.children,
                    props: {
                        closeModal: props.closeModal,
                        openModal: props.openModal,
                    },
                })}
            </Dialog>
        </Transition>
    );
}

Modal.Background = function Background(props: {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div
                style={props.style}
                className={classNames(
                    "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm  overflow-hidden",
                    props.className
                )}
            />
        </Transition.Child>
    );
};

Modal.ContentWrapper = function ContentWrapper({
    children,
    className,
    dialogClassName,
    openModal,
    closeModal,
}: {
    children: React.ReactNode;
    className?: string;
    dialogClassName?: string;
    openModal?(): void;
    closeModal?(): void;
}) {
    return (
        <div className="fixed inset-0 overflow-y-auto">
            <div
                className={classNames(
                    `flex justify-center items-start  text-center `,
                    className
                )}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel
                        className={classNames(
                            dialogClassName,
                            `w-full h-full   max-w-md overflow-y-auto lg:mt-10 p-10 lg:min-w-[600px] text-left align-middle transition-all transform bg-white rounded-md shadow-lg`
                        )}
                    >
                        {Children.map(children, (child) => {
                            if (!React.isValidElement(child)) return child;
                            if (child) {
                                if (child.type === Modal.Title) {
                                    return React.cloneElement(child, {
                                        ...child.props,
                                        openModal,
                                        closeModal,
                                    });
                                } else return child;
                            }
                        })}
                        {/* {props.children} */}
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </div>
    );
};

Modal.Title = function Title({
    children,
    className,
    closeModal,
    openModal,
}: {
    children: React.ReactNode;
    className?: string;
    closeModal?(): void;
    openModal?(): void;
}) {
    return (
        <div
            className={classNames(
                "w-full flex flex-row items-center text-left p-0 gap-[10px] mb-10",
                className
            )}
        >
            <Dialog.Title className="w-full text-gray-900 text-h2">
                {children}
            </Dialog.Title>
            <button className="cursor-pointer" onClick={closeModal}>
                <Icon icon="x_Thin" size={16} />
            </button>
        </div>
    );
};

Modal.OpenModalButton = function OpenModalButton(
    props: ButtonProps & {
        openModal?: () => void;
        closeModal?(): void;
    }
) {
    const { openModal, closeModal, onClick, ...rest } = props;
    return (
        <Button
            {...rest}
            onClick={() => {
                openModal && openModal();
                onClick && onClick();
            }}
        >
            {props.children}
        </Button>
    );
};

Modal.CloseModalButton = function CloseModalButton(
    props: ButtonProps & {
        closeModal?(): void;
        openModal?(): void;
    }
) {
    const { closeModal, openModal, onClick, ...rest } = props;
    return (
        <Button
            {...rest}
            onClick={() => {
                closeModal && closeModal();
                onClick && onClick();
            }}
        >
            {props.children}
        </Button>
    );
};

function useModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return { isOpen, openModal, closeModal };
}

export { Modal, useModal };
