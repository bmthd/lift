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
  useState,
  useCallback,
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

  type Store = {
    entries: Entry[];
    upsert: (key: symbol, node: ReactNode, priority: number) => void;
    remove: (key: symbol) => void;
  };

  const LiftStoreContext = createContext<Store | null>(null);

  const useLiftStore = (): Store => {
    const store = useContext(LiftStoreContext);
    if (!store) {
      throw new Error(
        "Hoistable Provider not found. Please wrap your component tree with `<Hoistable.Provider>` (e.g. `<HeaderAction.Provider>`).",
      );
    }
    return store;
  };

  /**
   * Provider component for the hoistable component.
   */
  const Provider = ({ children }: ProviderProps): JSX.Element => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const keyCounterRef = useRef(0);

    const upsert = useCallback((key: symbol, node: ReactNode, priority: number): void => {
      setEntries((prevEntries) => {
        const existingIndex = prevEntries.findIndex((entry) => entry.key === key);
        let keyId: string;
        
        if (existingIndex >= 0) {
          keyId = prevEntries[existingIndex].keyId;
        } else {
          keyId = `lift-${++keyCounterRef.current}`;
        }

        const newEntry: Entry = { key, keyId, node, priority };
        const newEntries = existingIndex >= 0 
          ? prevEntries.map((entry, index) => index === existingIndex ? newEntry : entry)
          : [...prevEntries, newEntry];

        return newEntries.sort((a, b) => {
          // Primary sort: priority (lower numbers first)
          const priorityDiff = a.priority - b.priority;
          if (priorityDiff !== 0) {
            return priorityDiff;
          }
          // Secondary sort: insertion order via keyId (stable sort)
          return a.keyId.localeCompare(b.keyId, undefined, { numeric: true });
        });
      });
    }, []);

    const remove = useCallback((key: symbol): void => {
      setEntries((prevEntries) => prevEntries.filter((entry) => entry.key !== key));
    }, []);

    const store = useMemo(() => ({ entries, upsert, remove }), [entries, upsert, remove]);

    return <LiftStoreContext.Provider value={store}>{children}</LiftStoreContext.Provider>;
  };

  /**
   * Component that renders all hoisted nodes in priority order.
   */
  const Slot = (): JSX.Element | null => {
    const { entries } = useLiftStore();
    
    if (entries.length === 0) {
      return null;
    }
    
    return (
      <>
        {entries.map(({ keyId, node }) => (
          <Fragment key={keyId}>{node}</Fragment>
        ))}
      </>
    );
  };

  /**
   * Component that hoists its children to the corresponding Slot component.
   */
  const Hoist = ({ children, priority = 0 }: HoistProps): JSX.Element | null => {
    const { upsert, remove } = useLiftStore();
    const keyRef = useRef<symbol>();
    
    if (!keyRef.current) {
      keyRef.current = Symbol("hoist-entry");
    }

    useEffect(() => {
      if (!keyRef.current) {
        return;
      }
      upsert(keyRef.current, children, priority);
      return () => {
        if (!keyRef.current) {
          return;
        }
        remove(keyRef.current);
      };
    }, [children, priority, upsert, remove]);

    return null;
  };

  return { Provider, Slot, Hoist };
};
