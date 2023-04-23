import React, { ReactElement, ReactNode } from "react";

function addPropsToReactElement<P extends Partial<unknown>>(
    element: ReactNode,
    props: P
): ReactElement<P> {
    return React.cloneElement(element as ReactElement, props);
}

function addPropsToChildren<P extends Partial<unknown>>({
    children,
    props,
}: {
    children: ReactNode;
    props: P;
}): ReactNode {
    return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return addPropsToReactElement<P>(child, {
                ...child.props,
                ...props,
            });
        }
        return child;
    });
}

export default addPropsToChildren;
