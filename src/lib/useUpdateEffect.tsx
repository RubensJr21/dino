import { useEffect, useRef } from "react";

export function useUpdateEffect(effect: () => void, deps: any[]) {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      return effect();
    }
    mounted.current = true;
  }, deps);
}