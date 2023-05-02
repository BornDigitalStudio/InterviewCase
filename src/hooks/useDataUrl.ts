import { useEffect, useState } from "react";

export default function useDataUrl(): [
  dataUrl: string | null,
  setFile: React.Dispatch<React.SetStateAction<File | null>>
] {
  const [file, setFile] = useState<File | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const fileReader = new FileReader();

    if (file) {
      fileReader.onload = (e) => {
        const result = e.target?.result;
        if (result && typeof result === "string") {
          setDataUrl(result);
        }
      };
      fileReader.readAsDataURL(file);
    }

    return () => {
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return [dataUrl, setFile];
}
