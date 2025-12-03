import { createContext, type ReactNode, useContext } from "react";

type Entry = Readonly<{ key: symbol; node: ReactNode; order: number }>;
type Snapshot = readonly Entry[];

type Store = {
  getSnapshot: () => Snapshot;
  subscribe: (l: () => void) => () => void;
  upsert: (key: symbol, node: ReactNode, order: number) => void;
  remove: (key: symbol) => void;
};

export const createLiftStore = (): Store => {
  const map = new Map<symbol, { node: ReactNode; order: number }>();
  const listeners = new Set<() => void>();

  const notify = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  const getSnapshot = (): Snapshot => {
    const entries = Array.from(map.entries()).map(
      ([key, v]) => ({ key, node: v.node, order: v.order }) as Entry,
    );
    return entries.sort((a, b) => a.order - b.order);
  };

  const subscribe = (l: () => void): (() => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  };

  const upsert = (key: symbol, node: ReactNode, order: number): void => {
    const prev = map.get(key);
    if (prev && prev.node === node && prev.order === order) {
      return;
    }
    map.set(key, { node, order });
    notify();
  };

  const remove = (key: symbol): void => {
    if (!map.has(key)) {
      return;
    }
    map.delete(key);
    notify();
  };

  return { getSnapshot, subscribe, upsert, remove };
};

export const LiftStoreContext = createContext<Store | null>(null);

export const useLiftStore = (): Store => {
  const s = useContext(LiftStoreContext);
  if (!s) {
    throw new Error("SlotProvider not found. Please wrap your component tree with <SlotProvider>.");
  }
  return s;
};
