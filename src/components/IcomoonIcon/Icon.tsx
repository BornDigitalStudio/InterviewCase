import IcomoonReact from "icomoon-react";
import selection from "../../assets/icons/selection.json";

interface IconProps {
  color?: string;
  size: string | number;
  icon: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Icon(props: IconProps) {
  const { color, size, icon, onClick } = props;
  return (
    <div onClick={onClick}>
      <IcomoonReact
        iconSet={selection}
        className={`${onClick ? "cursor-pointer" : ""}`}
        color={color}
        size={size}
        icon={icon}
      />
    </div>
  );
}
