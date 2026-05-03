import { useEffect, useState } from "react";
import { getMatchRadiusKm } from "@/lib/settings";

/** React hook returning the current configurable hub-matching radius (km). */
export const useMatchRadiusKm = () => {
  const [r, setR] = useState<number>(() => getMatchRadiusKm());
  useEffect(() => {
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<number>).detail;
      if (typeof detail === "number") setR(detail);
      else setR(getMatchRadiusKm());
    };
    window.addEventListener("hd-radius-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("hd-radius-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);
  return r;
};
