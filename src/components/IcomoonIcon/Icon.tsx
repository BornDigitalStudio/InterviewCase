import IcomoonReact from "icomoon-react";
import selection from "../../assets/icons/selection.json";

interface IconProps {
    color?: string;
    size: string | number;
    icon: string;
}

export default function Icon(props: IconProps) {
    const { color, size, icon } = props;
    return (
        <IcomoonReact
            iconSet={selection}
            color={color}
            size={size}
            icon={icon}
        />
    );
}
