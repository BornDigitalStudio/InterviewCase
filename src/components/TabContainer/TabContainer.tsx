import React, { useEffect, useLayoutEffect, useState } from "react";

import { classNames } from "@utils/functions/utils";

interface TabContainerProps {
  title: string;
  children: React.ReactNode;
}

interface TargetProps {
  active?: boolean;
  defaultSelect?: boolean;
  handleSetTab?: (containerId: string) => void;
  containerId: string;
  children: React.ReactNode;
}

interface ContainerProps {
  children: React.ReactNode;
  id: string;
}

export default function TabContainer({ title, children }: TabContainerProps) {
  const [activeTab, setActiveTab] = useState();

  return (
    <div className="p-10">
      <h1 className="text-header/h2">{title}</h1>

      <div className="border-b my-9">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;

          if (child.type === TabContainer.Target) {
            return React.cloneElement(child, {
              ...child.props,
              children: child.props.children,
              active: child.props.containerId === activeTab,
              containerId: child.props.containerId,
              handleSetTab: setActiveTab,
            });
          }
        })}
      </div>

      <div className="border min-h-12 rounded-lg bg-white">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;

          if (
            child.type === TabContainer.Container &&
            child.props.id === activeTab
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
  handleSetTab,
  containerId,
}: TargetProps) => {
  const handleNavigate = () => handleSetTab && handleSetTab(containerId!);

  useLayoutEffect(() => {
    if (defaultSelect && handleSetTab) {
      handleSetTab(containerId);
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
      onClick={handleNavigate}
    >
      {children}
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
