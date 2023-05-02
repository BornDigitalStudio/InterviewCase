interface AvatarProps {
  src: string;
  alt: string;
}

export default function Avatar({ src, alt }: AvatarProps) {
  return (
    <div>
      <img className="h-6 rounded-full w-6 object-cover" src={src} alt={alt} />
    </div>
  );
}
