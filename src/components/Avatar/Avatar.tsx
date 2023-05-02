interface AvatarProps {
  src: string;
  alt: string;
}

export default function Avatar({ src, alt }: AvatarProps) {
  return (
    <div>
      <img className="h-7 w-7 rounded-full object-cover" src={src} alt={alt} />
    </div>
  );
}
