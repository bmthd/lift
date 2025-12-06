import type { DetailedHTMLProps, HTMLAttributes, JSX, ReactNode } from "react";
import { Fragment, useEffect, useRef } from "react";
import { useForceUpdate, useMounted } from "./hooks";

export interface HoistProps {
  children: ReactNode;
  /**
   * The priority of the hoisted node. Nodes with lower priority values are rendered first.
   */
  priority?: number;
}

export interface SlotProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

/**
 * Creates a set of components to hoist and slot React nodes using React Portals.
 *
 * @returns An object containing the `Slot` and `Hoist` components.
 *
 * @example
 * const { Slot, Hoist } = createHoistableComponent();
 *
 * function App() {
 *   return (
 *     <div>
 *       <Header>
 *         <Slot />
 *       </Header>
 *       <MainContent />
 *     </div>
 *   );
 * }
 *
 * function MainContent() {
 *   return (
 *     <div>
 *       <Hoist priority={1}>
 *         <button>This button renders in the header</button>
 *       </Hoist>
 *       <Hoist priority={2}>
 *         <button>This button renders second</button>
 *       </Hoist>
 *     </div>
 *   );
 * }
 *
 * // In this example, the `MainContent` component hoists two buttons to the `Header` component.
 * // The buttons are rendered in the order specified by the `priority` prop.
 */
export const createHoistableComponent = () => {
  const uniqueId = `hoist-${crypto.randomUUID()}`;

  type Entry = {
    key: symbol;
    keyId: string;
    node: ReactNode;
    priority: number;
  };

  let globalEntries: Entry[] = [];
  let keyCounter = 0;
  const slotRerenderCallbacks = new Set<() => void>();

  const sortEntries = (entries: Entry[]): Entry[] => {
    return [...entries].sort((a, b) => {
      const priorityDiff = a.priority - b.priority;
      if (priorityDiff !== 0) {
        return priorityDiff;
      }
      return a.keyId.localeCompare(b.keyId, undefined, { numeric: true });
    });
  };

  const triggerSlotRerenders = () => {
    for (const callback of slotRerenderCallbacks) {
      callback();
    }
  };

  /**
   * Component that renders all hoisted nodes in priority order.
   */
  const Slot = (props: SlotProps): JSX.Element => {
    const rerender = useForceUpdate();

    useEffect(() => {
      slotRerenderCallbacks.add(rerender);
      return () => {
        slotRerenderCallbacks.delete(rerender);
      };
    }, [rerender]);

    const sortedEntries = sortEntries(globalEntries);

    return (
      <div id={uniqueId} {...props}>
        {sortedEntries.map(({ keyId, node }) => (
          <Fragment key={keyId}>{node}</Fragment>
        ))}
      </div>
    );
  };

  /**
   * Component that hoists its children to the corresponding Slot component using Portal.
   */
  const Hoist = ({ children, priority = 0 }: HoistProps): JSX.Element | null => {
    const keyRef = useRef<symbol | null>(null);
    const keyIdRef = useRef<string | null>(null);
    const isMounted = useMounted();

    if (!keyRef.current) {
      keyRef.current = Symbol("hoist-entry");
      keyIdRef.current = `lift-${++keyCounter}`;
    }

    useEffect(() => {
      if (!isMounted || !keyRef.current || !keyIdRef.current) {
        return;
      }

      const key = keyRef.current;
      const keyId = keyIdRef.current;

      const existingIndex = globalEntries.findIndex((entry) => entry.key === key);
      const newEntry: Entry = { key, keyId, node: children, priority };

      if (existingIndex >= 0) {
        globalEntries[existingIndex] = newEntry;
      } else {
        globalEntries.push(newEntry);
      }

      triggerSlotRerenders();

      return () => {
        globalEntries = globalEntries.filter((entry) => entry.key !== key);
        triggerSlotRerenders();
      };
    }, [children, priority, isMounted]);

    if (isMounted && typeof window !== "undefined") {
      const targetElement = document.getElementById(uniqueId);
      if (targetElement) {
        return null;
      }
    }

    return null;
  };

  return { Slot, Hoist };
};
