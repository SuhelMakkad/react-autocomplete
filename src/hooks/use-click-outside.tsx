import { useEffect, useRef } from "react";

export const useClickOutside = (
  callback: (event: MouseEvent) => void
): React.RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback(event);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return ref;
};
