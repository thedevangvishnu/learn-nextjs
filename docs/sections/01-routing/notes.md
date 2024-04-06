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

## 04 - Loading UI and Streaming

### `laoding.ts` file

- loading.js helps you create meaningful Loading UI with React Suspense.
- With this convention, you can show an instant loading state from the server while the content of a route segment loads

```ts
// inside /app/dashboard/loading.tsx

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />;
}
```

### Streaming with Suspense

#### What is Streaming

- Streaming is a data fetching technique in programming that essentially divides a large dataset into smaller chunks called "streams." Each of these streams are accessed as they are made available.

- Streaming allows you to break down the page's HTML into smaller chunks and progressively send those chunks from the server to the client.

- Streaming works well with React's component model because each component can be considered a chunk.

#### `<Suspense>` component

- This is a component provided by React that allows to implement streaming and also provides a way to show loading/error UI when the streaming suspends.

- `<Suspense>` works by wrapping a component that performs an asynchronous action (e.g. fetch data), showing fallback UI (e.g. skeleton, spinner) while it's happening, and then swapping in your component once the action completes.

```ts
import { Suspense } from "react";
import { PostFeed, Weather } from "./Components";

export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
    </section>
  );
}
```

## 07 - Route Groups

- Better understanding through visual. View them [here](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

- Route groups are useful for:

  - Organizing routes into groups e.g. by site section, intent, or team.
  - Enabling nested layouts in the same route segment level:
    - Creating multiple nested layouts in the same segment, including multiple root layouts
    - Adding a layout to a subset of routes in a common segment

- A route group can be created by wrapping a folder's name in parenthesis: (folderName)

### Creating multiple root layouts

- To create multiple root layouts, remove the top-level `layout.js` file, and add a `layout.js` file inside each route groups.

- This is useful for partitioning an application into sections that have a completely different UI or experience.

- The `<html> `and `<body>` tags need to be added to each root layout.

- To note:

  - The naming of route groups has no special significance other than for organization. They do not affect the URL path.

  - Routes that include a route group should not resolve to the same URL path as other routes. For example, `(marketing)/about/page.js` and `(shop)/about/page.js` would both resolve to `/about` and cause an error.

  - If you use multiple root layouts without a top-level `layout.js` file, your home page.js file should be defined in one of the route groups, For example: `app/(marketing)/page.js`.

  - Navigating across multiple root layouts will cause a full page load. For example, navigating from `/cart` that uses `app/(shop)/layout.js` to `/blog` that uses `app/(marketing)/layout.js` will cause a full page load. This only applies to multiple root layouts.

## 08 - Project Organization

- Better understanding through visual. View them [here](https://nextjs.org/docs/app/building-your-application/routing/colocation#module-path-aliases)

### Colocation

- Even though route structure is defined through folders, a route is not publicly accessible until a page.js or route.js file is added to a route segment.

- This means that project files can be safely colocated inside route segments in the app directory without accidentally being routable.

- Note: This is different from the pages directory, where any file in pages is considered a route.

### Project organization features

#### A - Private folders (`_<foldername>`)

- Private folders can be created by prefixing a folder with an underscore: `_folderName`

- This indicates the folder is a private implementation detail and should not be considered by the routing system, thereby opting the folder and all its subfolders out of routing, even if any folder has page.ts or route.ts inside it.

- You can create URL segments that start with an underscore by prefixing the folder name with `%5F` (the URL-encoded form of an underscore): `%5FfolderName`.

#### B - Route groups

- Route groups can be created by wrapping a folder in parenthesis: (folderName)

- View section 07 notes

#### C - `src` folder

- Next.js supports storing application code (including app) inside an optional src directory. This separates application code from project configuration files which mostly live in the root of a project.

#### D - Module path aliases

- `@` syntax for importing.
- Can be configured in `tsconfig.json` file by adding `paths` in `compilerOptions`

```ts
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }

  // all imports can be made from `@/`  ---> root of the project
}
```

### Project organization strategies

#### A - Storing all files inside `app` folder

- This strategy stores all application code in shared folders in the root of your project and keeps the app directory purely for routing purposes.

#### B - Storing all files outside `app` folder

- This strategy stores all application code in shared folders in the root of the app directory.

#### C - Storing files based on feature or split

- This strategy stores globally shared application code in the root app directory and splits more specific application code into the route segments that use them.
