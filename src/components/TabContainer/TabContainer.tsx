import React, { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { classNames } from "@utils/functions/utils";

interface TabContainerProps {
  title: string;
  children: React.ReactNode;
}

interface TargetProps {
  active?: boolean;
  defaultSelect?: boolean;
  containerId: string;
  children: React.ReactNode;
}

interface ContainerProps {
  children: React.ReactNode;
  id: string;
}

export default function TabContainer({ title, children }: TabContainerProps) {
  const { hash } = useLocation();

  return (
    <div className="p-2 sm:p-10">
      <h1 className="text-header/h2">{title}</h1>

      <div className="border-b my-9 flex flex-col sm:flex-row">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;

          if (child.type === TabContainer.Target) {
            return React.cloneElement(child, {
              ...child.props,
              children: child.props.children,
              active: `#${child.props.containerId}` === hash,
              containerId: child.props.containerId,
            });
          }
        })}
      </div>

      <div className="border min-h-12 rounded-lg bg-white">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;

          if (
            child.type === TabContainer.Container &&
            `#${child.props.id}` === hash
          ) {
            return (
              <div>
                {React.cloneElement(child, {
                  ...child.props,
                  children: child.props.children,
                  id: child.props.id,
                })}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

TabContainer.Target = ({
  children,
  defaultSelect,
  active,
  containerId,
}: TargetProps) => {
  const navigate = useNavigate();
  const { hash } = useLocation();

  useLayoutEffect(() => {
    if (defaultSelect && hash === "") {
      navigate(`#${containerId}`);
    }
  }, [defaultSelect]);

  return (
    <button
      className={classNames(
        "p-3 text-gray-500",
        active
          ? "text-gray-900 border-b-4 border-b-solid border-b-blue-600"
          : ""
      )}
      type="button"
    >
      <a href={`#${containerId}`}>{children}</a>
    </button>
  );
};

TabContainer.Container = ({ children, id }: ContainerProps) => {
  return (
    <div id={id} className="p-6">
      {children}
    </div>
  );
};
