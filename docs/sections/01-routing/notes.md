# Routing

## 00 - Fundamentals

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

- Each folder in a route represents a route segment. Each route segment is mapped to a corresponding segment in a URL path. Both are similar, but refered differently based on environments
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

## 01 - Defining routes

### Creating UI

- Special file conventions are used to create UI for each route segment.
- The most common are pages using `page.tsx` to show UI unique to a route, and layouts using `layout.tsx` or `template.tsx` (specific re-rendering the layout UI) to show UI that is shared across all pages and subroutes inside that route.

## 02 - Pages and Layouts

## 03 - Links and Navigation

There are four ways to navigate between routes in Next.js:

- Using the `<Link>` Component
- Using the `useRouter` hook (Client Components)
- Using the `redirect` function (Server Components)
- Using the native `History API`

### `<Link>` component

- `<Link>` is a built-in component that extends the HTML `<a>` tag to provide prefetching and client-side navigation between routes.

- use it by importing it from "next/link", and passing a `href` prop to the component:

  ```ts
  import Link from "next/link";

  export default function Page() {
    return <Link href="/dashboard">Dashboard</Link>;
  }
  ```

- Checking active links

  - Use `usePathname()` from "next/navigation and conditionally style the `<Link>`

  ```ts
  export function Links() {
    const pathname = usePathname();

    return (
      <nav>
        <Link
          className={`link ${pathname === "/about" ? "active" : ""}`}
          href="/about"
        >
          Home
        </Link>
      </nav>
    );
  }
  ```

- Scrolling to id

  - The default behavior of the Next.js App Router is to scroll to the top of a new route or to maintain the scroll position for backwards and forwards navigation.

  - To disable this, scroll behavior, pass `scroll={false}` to the` <Link>` component, or `scroll: false` to `router.push()` or `router.replace()`.

  ```ts
  // next/link

  <Link href="/dashboard/settings" scroll={false}>
    Settings
  </Link>;

  // use Router

  import { useRouter } from "next/navigation";

  const router = useRouter();

  router.push("/dashboard", { scroll: false });
  ```

- use the "#" just like you would use in `<a>` element

  ```ts
  <Link href="/dashboard#settings">Settings</Link>
  ```

### `useRouter()` from "next/navigation" for Client components

```ts
"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push("/dashboard")}>
      Dashboard
    </button>
  );
}
```

### `redirect` from "next/navigation" for Server components

```ts
import { redirect } from "next/navigation";

export default async function Profile({ params }: { params: { id: string } }) {
  const team = await fetchTeam(params.id);
  if (!team) {
    redirect("/login");
  }

  // ...
}
```

- `redirect` returns a 307 (Temporary Redirect) status code by default.
- `redirect` internally throws an error so it should be called outside of try/catch blocks.
- `redirect` can be called in Client Components during the rendering process but not in event handlers.

### How Routing and Navigation Works

- The App Router uses a hybrid approach for routing and navigation.
- On the server, your application code is automatically code-split by route segments.
- And on the client, Next.js prefetches and caches the route segments

#### 1 - Code splitting

- Code splitting allows you to split your application code into smaller bundles to be downloaded and executed by the browser.
- This reduces the amount of data transferred and execution time for each request, leading to improved performance.

#### 2 - Prefetching

- Prefetching is like preparing things in advance before you actually need them. In the context of web development, it means loading some parts of a web page before the user even requests to go to that page.

In Next.js, there are two main ways to prefetch routes:

- Using the `<Link>` component:

  - When you use a `<Link>` to navigate between pages in your Next.js app, Next.js automatically prefetches (loads in the background) the next page that the user might visit.
  - This happens either when the page first loads or as the user scrolls through the page.

- Using router.prefetch():
  - It allows you to manually tell Next.js to load a specific page in the background before the user navigates to it.
  - You can use this method to prefetch routes based on user actions or other events in your app.

#### 3 - Caching

- Next.js has an in-memory client-side cache called the Router Cache.
- As users navigate around the app, the React Server Component Payload of prefetched route segments and visited routes are stored in the cache.

#### 4 - Partial rendering

- Partial rendering means only the route segments that change on navigation re-render on the client, and any shared segments are preserved.

- For example, when navigating between two sibling routes, /dashboard/settings and /dashboard/analytics, the settings and analytics pages will be rendered, and the shared dashboard layout will be preserved.

#### 5 - Soft navigation, Backward & Forward navigation

- "soft navigation" between pages, ensuring only the route segments that have changed are re-rendered (partial rendering). Doesn't enable hard-refreshing inside the browser

- In forward and backward navigation, the scroll position is maintained
