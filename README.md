# @bmthd/lift

[![npm version](https://badge.fury.io/js/@bmthd%2Flift.svg)](https://badge.fury.io/js/@bmthd%2Flift)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A React library for creating hoistable components that can render content in different parts of your application. Perfect for scenarios where you need to render UI elements like buttons, badges, or actions in a header, sidebar, or footer from anywhere in your component tree.

## ✨ Features

- 🎯 **Content Hoisting**: Render content from any component to designated slots
- 🏆 **Priority-based Ordering**: Control the order of hoisted elements with priorities
- ⚡ **TypeScript Support**: Fully typed with excellent TypeScript support
- 🪶 **Lightweight**: Minimal bundle size with zero dependencies
- 🔒 **Type Safe**: Built with TypeScript from the ground up
- ⚛️ **React 18+ Ready**: Uses modern React patterns and hooks

## 📦 Installation

```bash
# npm
npm install @bmthd/lift

# yarn
yarn add @bmthd/lift

# pnpm
pnpm add @bmthd/lift

# bun
bun add @bmthd/lift
```

## 🚀 Quick Start

```tsx
import { createHoistableComponent } from "@bmthd/lift";

// Create hoistable component instance
const { Provider, Slot, Hoist } = createHoistableComponent();

function App() {
  return (
    <Provider>
      <Header>
        <h1>My App</h1>
        {/* This is where hoisted content will render */}
        <Slot />
      </Header>
      <MainContent />
    </Provider>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
      {children}
    </header>
  );
}

function MainContent() {
  return (
    <div>
      <h2>Main Content</h2>
      
      {/* These elements will be hoisted to the header */}
      <Hoist priority={1}>
        <button>Settings</button>
      </Hoist>
      
      <Hoist priority={2}>
        <button>Profile</button>
      </Hoist>
      
      <p>The buttons above are rendered in the header, not here!</p>
    </div>
  );
}
```

## 💡 Concept

The hoisting pattern is useful when you need to render UI elements in a different location than where they're logically defined. Common use cases include:

- **Header Actions**: Render page-specific buttons in a global header
- **Sidebar Content**: Add contextual navigation or actions to a sidebar
- **Footer Elements**: Show page-specific footer content
- **Toolbar Items**: Dynamically populate toolbars based on current context

## 📖 API Reference

### `createHoistableComponent()`

Creates a new hoistable component instance with three components:

```tsx
const { Provider, Slot, Hoist } = createHoistableComponent();
```

#### Returns

An object containing:
- `Provider`: Context provider component
- `Slot`: Component that renders hoisted content
- `Hoist`: Component that hoists its children to the slot

### `<Provider>`

Provides the hoisting context to child components.

```tsx
<Provider>
  {/* Your app content */}
</Provider>
```

**Props:**
- `children`: React nodes to wrap with the hoisting context

### `<Slot>`

Renders all hoisted content in priority order.

```tsx
<Slot />
```

**Props:** None

### `<Hoist>`

Hoists its children to be rendered in the corresponding `<Slot>`.

```tsx
<Hoist priority={1}>
  <button>Hoisted Button</button>
</Hoist>
```

**Props:**
- `children`: React nodes to hoist
- `priority?`: Number (default: 0) - Lower numbers render first

## 🔧 Advanced Usage

### Component Naming and Re-exporting

Since `createHoistableComponent()` returns an object with `Provider`, `Slot`, and `Hoist` components, you cannot directly assign it to a variable like `HeaderActions`. Instead, you need to either:

**Option 1: Use destructuring with renamed variables**
```tsx
import { createHoistableComponent } from "@bmthd/lift";

// Create components with descriptive names
const {
  Provider: HeaderProvider,
  Slot: HeaderSlot,
  Hoist: HeaderHoist
} = createHoistableComponent();

const {
  Provider: SidebarProvider,
  Slot: SidebarSlot,
  Hoist: SidebarHoist
} = createHoistableComponent();

function App() {
  return (
    <HeaderProvider>
      <SidebarProvider>
        <Layout>
          <Header>
            <HeaderSlot />
          </Header>
          <Sidebar>
            <SidebarSlot />
          </Sidebar>
          <MainContent />
        </Layout>
      </SidebarProvider>
    </HeaderProvider>
  );
}

function MainContent() {
  return (
    <div>
      <HeaderHoist priority={1}>
        <button>Header Button</button>
      </HeaderHoist>
      
      <SidebarHoist>
        <nav>Sidebar Navigation</nav>
      </SidebarHoist>
    </div>
  );
}
```

**Option 2: Create separate modules and re-export**
```tsx
// header-actions.tsx
import { createHoistableComponent } from "@bmthd/lift";

export const { Provider, Slot, Hoist } = createHoistableComponent();

// sidebar-content.tsx
import { createHoistableComponent } from "@bmthd/lift";

export const { Provider, Slot, Hoist } = createHoistableComponent();

// App.tsx
import * as HeaderActions from "./header-actions";
import * as SidebarContent from "./sidebar-content";

function App() {
  return (
    <HeaderActions.Provider>
      <SidebarContent.Provider>
        <Layout>
          <Header>
            <HeaderActions.Slot />
          </Header>
          <Sidebar>
            <SidebarContent.Slot />
          </Sidebar>
          <MainContent />
        </Layout>
      </SidebarContent.Provider>
    </HeaderActions.Provider>
  );
}

function MainContent() {
  return (
    <div>
      <HeaderActions.Hoist priority={1}>
        <button>Header Button</button>
      </HeaderActions.Hoist>
      
      <SidebarContent.Hoist>
        <nav>Sidebar Navigation</nav>
      </SidebarContent.Hoist>
    </div>
  );
}
```

### Multiple Hoisting Systems

You can create multiple independent hoisting systems using either approach above. Each system maintains its own state and context.

### Priority Ordering

Elements with lower priority values render first:

```tsx
<Hoist priority={10}>Third</Hoist>
<Hoist priority={1}>First</Hoist>
<Hoist priority={5}>Second</Hoist>
```

Elements with the same priority maintain their insertion order.

### Conditional Hoisting

You can conditionally hoist content:

```tsx
function ConditionalContent({ showButton }: { showButton: boolean }) {
  return (
    <div>
      {showButton && (
        <Hoist priority={1}>
          <button>Conditional Button</button>
        </Hoist>
      )}
    </div>
  );
}
```

## 🎨 Real-world Example

Here's a more complete example showing a dashboard with dynamic header actions:

```tsx
// header-actions.tsx
import { createHoistableComponent } from "@bmthd/lift";

export const { Provider, Slot, Hoist } = createHoistableComponent();

// App.tsx
import * as HeaderActions from "./header-actions";

function Dashboard() {
  return (
    <HeaderActions.Provider>
      <Layout>
        <Header />
        <Router>
          <Route path="/users" component={UsersPage} />
          <Route path="/settings" component={SettingsPage} />
        </Router>
      </Layout>
    </HeaderActions.Provider>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Dashboard</h1>
      <div className="header-actions">
        <HeaderActions.Slot />
      </div>
    </header>
  );
}

function UsersPage() {
  return (
    <div>
      <h2>Users</h2>
      
      {/* These actions appear in the header */}
      <HeaderActions.Hoist priority={1}>
        <button>Add User</button>
      </HeaderActions.Hoist>
      
      <HeaderActions.Hoist priority={2}>
        <button>Export</button>
      </HeaderActions.Hoist>
      
      {/* Page content */}
      <UsersList />
    </div>
  );
}

function SettingsPage() {
  return (
    <div>
      <h2>Settings</h2>
      
      {/* Different actions for different pages */}
      <HeaderActions.Hoist priority={1}>
        <button>Save Settings</button>
      </HeaderActions.Hoist>
      
      <SettingsForm />
    </div>
  );
}
```

## 🔍 TypeScript Support

The library is built with TypeScript and provides full type safety:

```tsx
import { createHoistableComponent } from "@bmthd/lift";

const { Provider, Slot, Hoist } = createHoistableComponent();

// All components are properly typed
const MyComponent: React.FC = () => (
  <Provider>
    <Slot />
    <Hoist priority={1}>
      <button>Typed Button</button>
    </Hoist>
  </Provider>
);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/bmthd/lift)
- [npm Package](https://www.npmjs.com/package/@bmthd/lift)
- [Issues](https://github.com/bmthd/lift/issues)