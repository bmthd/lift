import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { createHoistableComponent } from "./create-hoistable-component";

describe("createHoistableComponent", () => {
  describe("Basic hoisting functionality", () => {
    it("should hoist content from Hoist to Slot", () => {
      const { Provider, Slot, Hoist } = createHoistableComponent();

      render(
        <Provider>
          <div data-testid="header">
            <Slot />
          </div>
          <div data-testid="content">
            <Hoist>
              <button>Hoisted Button</button>
            </Hoist>
          </div>
        </Provider>
      );

      // Button should appear in header, not in content
      const header = screen.getByTestId("header");
      const content = screen.getByTestId("content");
      const button = screen.getByRole("button", { name: "Hoisted Button" });

      expect(header).toContainElement(button);
      expect(content).not.toContainElement(button);
    });

    it("should render multiple hoisted elements", () => {
      const { Provider, Slot, Hoist } = createHoistableComponent();

      render(
        <Provider>
          <div data-testid="slot">
            <Slot />
          </div>
          <Hoist>
            <button>Button 1</button>
          </Hoist>
          <Hoist>
            <button>Button 2</button>
          </Hoist>
          <Hoist>
            <button>Button 3</button>
          </Hoist>
        </Provider>
      );

      expect(screen.getByRole("button", { name: "Button 1" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Button 2" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Button 3" })).toBeInTheDocument();
    });
  });

  describe("Priority-based ordering (as described in README)", () => {
    it("should render elements with lower priority first", () => {
      const { Provider, Slot, Hoist } = createHoistableComponent();

      render(
        <Provider>
          <div data-testid="slot">
            <Slot />
          </div>
          <Hoist priority={10}>
            <button>Third</button>
          </Hoist>
          <Hoist priority={1}>
            <button>First</button>
          </Hoist>
          <Hoist priority={5}>
            <button>Second</button>
          </Hoist>
        </Provider>
      );

      const slot = screen.getByTestId("slot");
      const buttons = slot.querySelectorAll("button");

      expect(buttons).toHaveLength(3);
      expect(buttons[0]).toHaveTextContent("First");
      expect(buttons[1]).toHaveTextContent("Second");
      expect(buttons[2]).toHaveTextContent("Third");
    });

    it("should maintain insertion order for elements with same priority", () => {
      const { Provider, Slot, Hoist } = createHoistableComponent();

      render(
        <Provider>
          <div data-testid="slot">
            <Slot />
          </div>
          <Hoist priority={1}>
            <button>First-A</button>
          </Hoist>
          <Hoist priority={1}>
            <button>First-B</button>
          </Hoist>
          <Hoist priority={1}>
            <button>First-C</button>
          </Hoist>
        </Provider>
      );

      const slot = screen.getByTestId("slot");
      const buttons = slot.querySelectorAll("button");

      expect(buttons).toHaveLength(3);
      expect(buttons[0]).toHaveTextContent("First-A");
      expect(buttons[1]).toHaveTextContent("First-B");
      expect(buttons[2]).toHaveTextContent("First-C");
    });

    it("should handle mixed priorities with correct order (README example)", () => {
      const { Provider, Slot, Hoist } = createHoistableComponent();

      function MainContent() {
        return (
          <div>
            <Hoist priority={1}>
              <button>Settings</button>
            </Hoist>

            <Hoist priority={2}>
              <button>Profile</button>
            </Hoist>
          </div>
        );
      }

      render(
        <Provider>
          <header data-testid="header">
            <Slot />
          </header>
          <MainContent />
        </Provider>
      );

      const header = screen.getByTestId("header");
      const buttons = header.querySelectorAll("button");

      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent("Settings");
      expect(buttons[1]).toHaveTextContent("Profile");
    });
  });

  describe("Multiple independent hoisting systems", () => {
    it("should maintain separate state for different hoisting systems", () => {
      const Header = createHoistableComponent();
      const Sidebar = createHoistableComponent();

      render(
        <Header.Provider>
          <Sidebar.Provider>
            <div data-testid="header">
              <Header.Slot />
            </div>
            <div data-testid="sidebar">
              <Sidebar.Slot />
            </div>
            <div>
              <Header.Hoist>
                <button>Header Button</button>
              </Header.Hoist>
              <Sidebar.Hoist>
                <button>Sidebar Button</button>
              </Sidebar.Hoist>
            </div>
          </Sidebar.Provider>
        </Header.Provider>
      );

      const header = screen.getByTestId("header");
      const sidebar = screen.getByTestId("sidebar");

      expect(header).toHaveTextContent("Header Button");
      expect(header).not.toHaveTextContent("Sidebar Button");
      expect(sidebar).toHaveTextContent("Sidebar Button");
      expect(sidebar).not.toHaveTextContent("Header Button");
    });
  });

  describe("Conditional hoisting", () => {
    it("should show/hide hoisted content based on condition", () => {
      const { Provider, Slot, Hoist } = createHoistableComponent();

      function ConditionalContent({ show }: { show: boolean }) {
        return (
          <div>
            {show && (
              <Hoist>
                <button>Conditional Button</button>
              </Hoist>
            )}
          </div>
        );
      }

      const { rerender } = render(
        <Provider>
          <div data-testid="slot">
            <Slot />
          </div>
          <ConditionalContent show={true} />
        </Provider>
      );

      expect(screen.getByRole("button", { name: "Conditional Button" })).toBeInTheDocument();

      rerender(
        <Provider>
          <div data-testid="slot">
            <Slot />
          </div>
          <ConditionalContent show={false} />
        </Provider>
      );

      expect(screen.queryByRole("button", { name: "Conditional Button" })).not.toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("should handle default priority (0)", () => {
      const { Provider, Slot, Hoist } = createHoistableComponent();

      render(
        <Provider>
          <div data-testid="slot">
            <Slot />
          </div>
          <Hoist>
            <button>No Priority</button>
          </Hoist>
          <Hoist priority={1}>
            <button>Priority 1</button>
          </Hoist>
          <Hoist priority={-1}>
            <button>Priority -1</button>
          </Hoist>
        </Provider>
      );

      const slot = screen.getByTestId("slot");
      const buttons = slot.querySelectorAll("button");

      expect(buttons).toHaveLength(3);
      expect(buttons[0]).toHaveTextContent("Priority -1");
      expect(buttons[1]).toHaveTextContent("No Priority");
      expect(buttons[2]).toHaveTextContent("Priority 1");
    });

    it("should render nothing when Slot has no hoisted content", () => {
      const { Provider, Slot } = createHoistableComponent();

      render(
        <Provider>
          <div data-testid="slot">
            <Slot />
          </div>
        </Provider>
      );

      const slot = screen.getByTestId("slot");
      expect(slot).toBeEmptyDOMElement();
    });

    it("should throw error when using Hoist without Provider", () => {
      const { Hoist } = createHoistableComponent();

      // Suppress console.error for this test
      const consoleError = console.error;
      console.error = () => {};

      expect(() => {
        render(
          <Hoist>
            <button>Orphan Button</button>
          </Hoist>
        );
      }).toThrow();

      console.error = consoleError;
    });

    it("should throw error when using Slot without Provider", () => {
      const { Slot } = createHoistableComponent();

      // Suppress console.error for this test
      const consoleError = console.error;
      console.error = () => {};

      expect(() => {
        render(<Slot />);
      }).toThrow();

      console.error = consoleError;
    });
  });

  describe("Dynamic updates", () => {
    it("should update hoisted content when children change", () => {
      const { Provider, Slot, Hoist } = createHoistableComponent();

      function DynamicContent({ text }: { text: string }) {
        return (
          <Hoist>
            <button>{text}</button>
          </Hoist>
        );
      }

      const { rerender } = render(
        <Provider>
          <div data-testid="slot">
            <Slot />
          </div>
          <DynamicContent text="Initial" />
        </Provider>
      );

      expect(screen.getByRole("button")).toHaveTextContent("Initial");

      rerender(
        <Provider>
          <div data-testid="slot">
            <Slot />
          </div>
          <DynamicContent text="Updated" />
        </Provider>
      );

      expect(screen.getByRole("button")).toHaveTextContent("Updated");
    });

    it("should update order when priority changes", () => {
      const { Provider, Slot, Hoist } = createHoistableComponent();

      function DynamicPriority({ priority }: { priority: number }) {
        return (
          <>
            <Hoist priority={priority}>
              <button>Dynamic</button>
            </Hoist>
            <Hoist priority={5}>
              <button>Static</button>
            </Hoist>
          </>
        );
      }

      const { rerender } = render(
        <Provider>
          <div data-testid="slot">
            <Slot />
          </div>
          <DynamicPriority priority={1} />
        </Provider>
      );

      let buttons = screen.getByTestId("slot").querySelectorAll("button");
      expect(buttons[0]).toHaveTextContent("Dynamic");
      expect(buttons[1]).toHaveTextContent("Static");

      rerender(
        <Provider>
          <div data-testid="slot">
            <Slot />
          </div>
          <DynamicPriority priority={10} />
        </Provider>
      );

      buttons = screen.getByTestId("slot").querySelectorAll("button");
      expect(buttons[0]).toHaveTextContent("Static");
      expect(buttons[1]).toHaveTextContent("Dynamic");
    });
  });
});
