import {
  Fragment,
  type JSX,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import { createLiftStore, LiftStoreContext, useLiftStore } from "./store.ts";

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
 *       <HeaderAction.Hoist>
 *         <button>This button renders in the header</button>
 *       </HeaderAction.Hoist>
 *     </div>
 *   );
 * }
 *
 * In this example, the `MainContent` component hoists two buttons to the `Header` component.
 * The buttons are rendered in the order specified by the `order` prop.
 *
 * @returns An object containing the `Provider`, `Slot`, and `Hoist` components.
 */
export const createHoistableComponent = () => {
  /**
   * Provider component for the hoistable component.
   */
  const Provider = ({ children }: ProviderProps): JSX.Element => {
    const store = useMemo(createLiftStore, []);
    return <LiftStoreContext.Provider value={store}>{children}</LiftStoreContext.Provider>;
  };

  /**
   * Component that renders all hoisted nodes in order.
   */
  const Slot = (): JSX.Element | null => {
    const store = useLiftStore();
    const snap = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
    if (snap.length === 0) {
      return null;
    }
    return (
      <>
        {snap.map(({ key, node }) => (
          <Fragment key={String(key)}>{node}</Fragment>
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
