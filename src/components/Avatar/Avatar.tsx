import { classNames } from "@utils/functions/utils";

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}

export default function Avatar({ src, alt, className }: AvatarProps) {
  return (
    <img
      className={classNames(
        "h-7 w-7 rounded-full object-cover",
        className || ""
      )}
      src={src}
      alt={alt}
    />
  );
}
