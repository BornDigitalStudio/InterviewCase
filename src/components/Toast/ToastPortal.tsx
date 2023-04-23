import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useImperativeHandle, useState } from "react";
import ReactDOM from "react-dom";
import { v4 } from "uuid";
import { date } from "yup";
import { useToastAutoclose } from "../../hooks/useToastAutoClose";
import { useToastPortal } from "../../hooks/useToastPortal";

import { Toast } from "./Toast";

type Props = {
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    autoCloseTimeout?: number;
    autoClose?: boolean;
};

export type ToastType = {
    addToast(toast: {
        message: string;
        discription?: string;
        cloasable?: boolean;
        type: "info" | "confirm" | "alert" | "warning";
        position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    }): void;
};
// eslint-disable-next-line react/display-name
const ToastPortal = forwardRef(
    ({ position = "top-right", autoCloseTimeout, autoClose }: Props, ref) => {
        const { loaded, portalId } = useToastPortal(position);
        const [toasts, setToasts] = useState<
            {
                position?:
                    | "top-right"
                    | "top-left"
                    | "bottom-right"
                    | "bottom-left";
                id: string;
                message: string;
                discription?: string;
                type: "info" | "confirm" | "alert" | "warning";
                cloasable?: boolean;

                // onCloase: () => void;
            }[]
        >([]);
        const [lastChangedIndex, setLastChangedIndex] = useState<number>(0);
        useToastAutoclose({
            toasts,
            setToasts,
            autoClose,
            autoCloseTimeout,
        });
        const removeToast = (id: string) => {
            setToasts(toasts.filter((t) => t.id !== id));
            setLastChangedIndex(toasts.length - 1);
        };

        useImperativeHandle(ref, () => ({
            addToast(toast: {
                position?:
                    | "top-right"
                    | "top-left"
                    | "bottom-right"
                    | "bottom-left";
                message: string;
                discription?: string;
                type: "info" | "confirm" | "alert" | "warning";
                cloasable?: boolean;
            }) {
                setToasts([{ ...toast, id: Date.now().toString() }, ...toasts]);
                setLastChangedIndex(toasts.length + 1);
            },
        }));

        const animatingToast = toasts.slice(lastChangedIndex);

        return loaded ? (
            ReactDOM.createPortal(
                <AnimatePresence mode="popLayout" initial={false}>
                    {position.startsWith("top")
                        ? toasts.map((t) => (
                              <motion.div
                                  layout
                                  key={t.id}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  transition={{
                                      opacity: { duration: 0.2 },
                                      layout: {
                                          type: "spring",
                                          bounce: 0.4,
                                          duration: lastChangedIndex
                                              ? animatingToast.indexOf(t) *
                                                    0.15 +
                                                0.85
                                              : 1,
                                      },
                                  }}
                              >
                                  <Toast
                                      cloasable={t.cloasable}
                                      text={t.message}
                                      discription={t.discription}
                                      type={t.type}
                                      onClose={() => removeToast(t.id)}
                                  />
                              </motion.div>
                          ))
                        : toasts
                              .map((t) => (
                                  <motion.div
                                      layout
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.8 }}
                                      transition={{
                                          opacity: { duration: 0.2 },
                                          layout: {
                                              type: "spring",
                                              bounce: 0.4,
                                              duration: lastChangedIndex
                                                  ? animatingToast.indexOf(t) *
                                                        0.15 +
                                                    0.85
                                                  : 1,
                                          },
                                      }}
                                  >
                                      <Toast
                                          cloasable={t.cloasable}
                                          text={t.message}
                                          type={t.type}
                                          discription={t.discription}
                                          onClose={() => removeToast(t.id)}
                                      />
                                  </motion.div>
                              ))
                              .reverse()}
                </AnimatePresence>,
                document.getElementById(portalId)!
            )
        ) : (
            <></>
        );
    }
);

export { ToastPortal };
