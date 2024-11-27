import { useEffect, useRef } from "react";

export const useClickOutside = (
  callback: (event: MouseEvent) => void
): React.RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };

    console.log("called");

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [callback]);

  return ref;
};
