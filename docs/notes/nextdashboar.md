## Chapter 2: CSS styling

- Two ways:

  - using Tailwind
  - using CSS modules

    - naming convention: "anyName.module.css"
    - importing: import styles from "@/app/\*\*/anyName.module.css"

            import styles from '@/app/ui/home.module.css';
            <div className={styles.shape} />;

  - using clsx package: to conditionally add classes

## Chapter 3: Optimizing fonts and images

- Cumulative layout shift

  - When a site is being rendered by the browser, the browser takes some time to download custom assets, such as custom fonts. During this time period, the browser resorts to the fallback or system fonts, which might cause a shift in the layout of the website. When the custom fonts are loaded, the browser replaces the fallback fonts with the custom ones, resulting in the original layout that website was intented to be in. This shift in layout is called as "cumulative layout shift (cls)".
  - Google ranks website according to many metrics, among which, cls is also one.

- Confustion: Downloading and rendering fonts in normal application and nextjs application.

- Image component from next/image

  - Advantages of using Image component:
    - easy to manage responsiveness
    - lazy loading is automatically implemented
    - easy to configure different image sizes for different screen sizes
    - prevents layout shift
  - Important properties: src, width, height, alt

                <Image
                    src="/hero-desktop.png"
                    width={1000}
                    height={760}
                    className="hidden md:block"
                    alt="Screenshots of the dashboard project showing desktop version"
                />

## Chapter 4: Creating Layouts and Pages

- File-system routing

  - NextJs implements a file-system routing, where the "app" directory server as the root route. Each folder inside the "app" directory becomes a new route appended to the "/"

  - Important terms:

    - Segments

      - Mapping to a url, each part of the url acts as a segment (in the folder structure).
      - Root segment: "app" directory --> corresponds to "/" route.
      - Segment: "app/dashboard" directory --> corresponds to "/dashboard" route.
        - one level inside the app directory.
      - Leaf Segment: "app/dashboard/customers" directory --> corresponds to "/dashboard/customers" route.
        - two levels inside the app directory.

    - Layouts

      - Layout is a special feature in Nextjs that allows to create a component that renders shared UI components as well the distict UI components (based on different rotues).
      - Allows for partial rendering
        - Once the layout is rendered, the shared elements of layout won't be re-rendered for any change and potential rendering in distinctive elements. This is known as "partial rendering."
      - Root layout
        - Inside "app" directory, "layout.tsx" file serves as the root layout for the entire app. Any styling, components inside this layout will be rendered on each route for the app.
      - Route-specific layout
        - Specific routes can have their own layout by using layout.tsx file inside "that route" directory.

    - Conventions

      - page.tsx: special file that renders a react component for that particular route (directory inside which page.tsx file is present).
      - layout.tsx: special file to create layout.

    - Colocation
      - page.tsx is publicly accessible for that route which implemnets the root layout and the layout.tsx specific to that route.
      - but there can be multiple components, test files and other files related to the page.tsx file for a route. These files that are "not" page.tsx and not "layout.tsx" are colocating (residing together) and won't be publicly accessible

## Chapter 5: Navigation

- Link component from next/link

  - similar to Link component from react-router-dom
  - enables client-side navigation without full hard reload

- Code splitting for improved navigation

  - To improve navigation, Nextjs code splits (divides into smaller chunks) the application based on route segments. In tradional react app, the entire app is intially loaded and using Link from react-router-dom, client-side navigation is achieved.
  - But nextjs improves performance and results in "near-instant" load times.
    - First, due to code splitting, the browser only loads the route-specific files which are lighter.
    - Secondly, in production, when Nextjs encounters a Link component, it pre-fetches the route-specific content for that Link and keeps it handy. This makes the page transition "near-instant."

- Styling active links
  - we can use clsx module to style active links.
  - usePathName() is a hook that gives back the pathname for the current route.

## Chapter 7: Fetching Data

- Data fetching approaches:
  - through an API layer
  - through server components using SQL
- Request waterfalls
- Parallel data fetching
  - Advantages and disadvantages

## Chapter 8: Static and dynamic rendering

- Static rendering (Static site generation)
- Dynamic rendering (Server side rendering)
  - using {unStable_noStore} from next/cache
- Advantages and disadvantages
  - With dynamic rendering, your application is only as fast as your slowest data fetch.

## Chapter 9: Streaming

- Streaming and what it is
- Two ways:
  - Streaming at app level
  - Streaming at component level
- How to implement streaming
  - using loading.tsx
    - Suspense
    - interruptable navigation
- Route groups using () syntax
- React Suspense
- Where to place Suspense boundaries
  - Good practice to fetch data at the component level that need it and wrap the component in a Suspense
