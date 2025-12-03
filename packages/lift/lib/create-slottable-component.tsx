import {
  createContext,
  Fragment,
  type JSX,
  type PropsWithChildren,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";

export interface ProviderProps extends PropsWithChildren {}

export interface HoistProps extends PropsWithChildren {
  /**
   * The priority of the hoisted node. Nodes with lower priority values are rendered first.
   */
  priority?: number;
}

/**
 * Creates a set of components to hoist and slot React nodes.
 * @example
 * const HeaderAction = createHoistableComponent();
 *
 * function App() {
 *   return (
 *     <HeaderAction.Provider>
 *       <Header>
 *         <HeaderAction.Slot />
 *       </Header>
 *       <MainContent />
 *     </HeaderAction.Provider>
 *   );
 * }
 *
 * function MainContent() {
 *   return (
 *     <div>
 *       <HeaderAction.Hoist priority={1}>
 *         <button>This button renders in the header</button>
 *       </HeaderAction.Hoist>
 *       <HeaderAction.Hoist priority={2}>
 *         <button>This button renders second</button>
 *       </HeaderAction.Hoist>
 *     </div>
 *   );
 * }
 *
 * In this example, the `MainContent` component hoists two buttons to the `Header` component.
 * The buttons are rendered in the order specified by the `priority` prop.
 *
 * @returns An object containing the `Provider`, `Slot`, and `Hoist` components.
 */
export const createHoistableComponent = () => {
  type Entry = Readonly<{ key: symbol; keyId: string; node: ReactNode; priority: number }>;
  type Snapshot = readonly Entry[];

  type Store = {
    getSnapshot: () => Snapshot;
    subscribe: (l: () => void) => () => void;
    upsert: (key: symbol, node: ReactNode, priority: number) => void;
    remove: (key: symbol) => void;
  };

  const createLiftStore = (): Store => {
    const map = new Map<symbol, { node: ReactNode; priority: number; keyId: string }>();
    const listeners = new Set<() => void>();
    let keyCounter = 0;

    const notify = () => {
      for (const listener of listeners) {
        listener();
      }
    };

    const getSnapshot = (): Snapshot => {
      const entries = Array.from(map.entries()).map(
        ([key, v]) => ({ key, keyId: v.keyId, node: v.node, priority: v.priority }) as Entry,
      );
      return entries.sort((a, b) => a.priority - b.priority);
    };

    const subscribe = (l: () => void): (() => void) => {
      listeners.add(l);
      return () => listeners.delete(l);
    };

    const upsert = (key: symbol, node: ReactNode, priority: number): void => {
      const prev = map.get(key);
      const keyId = prev?.keyId || `lift-${++keyCounter}`;
      map.set(key, { node, priority, keyId });
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

  const LiftStoreContext = createContext<Store | null>(null);

  const useLiftStore = (): Store => {
    const s = useContext(LiftStoreContext);
    if (!s) {
      throw new Error(
        "Provider not found. Please wrap your component tree with a Provider component.",
      );
    }
    return s;
  };

  /**
   * Provider component for the hoistable component.
   */
  const Provider = ({ children }: ProviderProps): JSX.Element => {
    const store = useMemo(() => createLiftStore(), []);
    return <LiftStoreContext.Provider value={store}>{children}</LiftStoreContext.Provider>;
  };

  /**
   * Component that renders all hoisted nodes in priority order.
   */
  const Slot = (): JSX.Element | null => {
    const store = useLiftStore();
    const snap = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
    if (snap.length === 0) {
      return null;
    }
    return (
      <>
        {snap.map(({ keyId, node }) => (
          <Fragment key={keyId}>{node}</Fragment>
        ))}
      </>
    );
  };

  /**
   * Component that hoists its children to the corresponding Slot component.
   */
  const Hoist = ({ children, priority = 0 }: HoistProps): JSX.Element | null => {
    const store = useLiftStore();
    const keyRef = useRef<symbol>();
    if (!keyRef.current) {
      keyRef.current = Symbol("hoist-entry");
    }

    useEffect(() => {
      if (!keyRef.current) {
        return;
      }
      store.upsert(keyRef.current, children, priority);
      return () => {
        if (!keyRef.current) {
          return;
        }
        store.remove(keyRef.current);
      };
    }, [children, priority, store]);

    return null;
  };

  return { Provider, Slot, Hoist };
};
