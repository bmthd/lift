import { useCallback, useEffect, useLayoutEffect, useState } from "react";

/**
 * Use isomorphic layout effect for SSR compatibility.
 * Uses useLayoutEffect on client, useEffect on server.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Hook to detect if component is mounted on the client side.
 * Returns false during SSR and initial hydration, true once mounted.
 */
export const useMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};

/**
 * Hook that provides a stable callback to force component re-render.
 * Useful for triggering updates from external state changes.
 */
export const useForceUpdate = (): (() => void) => {
  const [, setState] = useState({});

  return useCallback(() => setState({}), []);
};
