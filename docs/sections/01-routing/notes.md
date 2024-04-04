# Routing

## 1 - Fundamentals

### Basic terminology

- Tree: A convention for visualizing a hierarchical structure. For example, a component tree with parent and children components, a folder structure, etc.
- Subtree: Part of a tree, starting at a new root (first) and ending at the leaves (last).
- Root: The first node in a tree or subtree, such as a root layout.
- Leaf: Nodes in a subtree that have no children, such as the last segment in a URL path.
- URL Segment: Part of the URL path delimited by slashes.
- URL Path: Part of the URL that comes after the domain (composed of segments).

### The `app` directory

- In version 13, Next.js introduced a new App Router built on React Server Components, which supports shared layouts, nested routing, loading states, error handling, and more.
- The App Router takes priority over the Pages Router.
- By default, components inside app are React Server Components. This is a performance optimization

### Routes, Segments, Nested routes

- Each folder in a route represents a route segment. Each route segment is mapped to a corresponding segment in a URL path. Both are similar, but refered differently based on enviorments
  - Route segment: a folder in the `app` that becomes a route on the browser
  - Segment: each division inside the URL path in the browser

#### Nested routes

- The `/dashboard/settings` route is composed of three segments:
  - `/` (Root segment)
  - `dashboard` (Segment)
  - `settings` (Leaf segment)

### Component Hierarchy and colocation

- The React components defined in special files of a route segment are rendered in a specific hierarchy:

  - `layout.js`
  - `template.js`
  - `error.js` (React error boundary)
  - `loading.js` (React suspense boundary)
  - `not-found.js` (React error boundary)
  - `page.js` or nested `layout.js`

- Colocation:
  - In addition to special files, you have the option to colocate your own files (e.g. components, styles, tests, etc) inside folders in the app directory.

### Advanced routing patterns

- Parallel routes
- Intercepting routes

## 2 - Defining routes

### Creating UI

- Special file conventions are used to create UI for each route segment.
- The most common are pages using `page.tsx` to show UI unique to a route, and layouts using `layout.tsx` or `template.tsx` (specific re-rendering the layout UI) to show UI that is shared across all pages and subroutes inside that route.

## 3 - Pages and Layouts
