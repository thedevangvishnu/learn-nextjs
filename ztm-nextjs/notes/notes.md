# Nextjs

## Section-02: Nextjs Fundamentals

### What and Why

### Benefits of Nextjs

- Different rendering techniques

  - static side generation
  - server side rendering
  - incremental site regeneration

- Performance

  - code spilitting (chunking)
  - minification
  - image optimization (using nextjs image component)
  - pre-fetching assets

- File based routing
- SEO
- Serverless Functions

## Section 3: Build first project

- using google fonts
  - next/font/google: Google fonts
  - next/font/local: Local fonts
  - fontname.classname
- using multiple fonts
- metadata api

## Section 4: Server vs Client components (SC vs CC)

- What
- Why server and why components
- hydration
- when server and when client components
- advantages and disadvantages of both
- anti-pattern of not rendering a server component inside a client component
  - work-around for rendering a server component inside a client component: by passing the SC as a children prop to CC.

# Section 5 - App Router: Routing with Nextjs

- Index routes
- Nested routes
- Dyanmic routes
  - square brackets [] syntax
  - dynamic parameters
- Catch-all routes
  - difference between catch-all and dynamic routes

# Section 6 - SEO Hydration - Different Rendering Techniques

## SEO

- Web crawlers

  - crawling
  - indexing
  - ranking

  - Metrics that crawlers use for ranking
    - click through rate
    - bounce rate
    - dwell time
    - location, language, user device

## Client-rendering vs Server-rendering

- Client-rendering

  - Server sends html, css and js bundle
  - browsers downloads all theee
  - no content on html (as content is generated using js)
  - js loads and then user can view and interact with the page.

- Server-rendering

  - Pre-rendering
    - server sending static html file (that has content populated) and the js bundle
    - browser renders html and downloads js
    - user can view static html content while js loads (hydration starts)
    - user can now interact when js is done with its job (hydration ends)
  - Hydration: loading js to add interactivity

  - Server-rendering improves SEO score and performance

### Different techniques for server-rendering

#### Static site generation

- HTML is generated at build time
- No re-rendering capability
- Amazingly fast to load
- Can leverage CDN caching

- Without external data
  - All the content is provided within the html
  - e.g: About page
- With external data

  - First the data is fetched in advance and then html is rendered with the fetched data.
  - e.g: Products page, blog posts, etc.
    - These are also static data, even though they are fetched from database, most of their content is static in nature

  ```js
  fetch("https://www.api/v1/products", {
    cache: "force-cache",
  });
  ```

- "force-cache" is default behavior of fetch

#### Server-side rendering or Dynamic-rendering

- HTML is generated at request time (for each request, a new html is generated)
- Not be cached on CDN
- Bit slower that SSG
- e.g: News feed

  ```js
  fetch("https://www.api/v1/products", {
    cache: "no-store",
  });
  ```

#### Incremental site regeneration

- Uses both SSG and SSR

  ```js
  fetch("https://www.api/v1/products", {
    revalidate: 3600, // 1 hour
  });
  ```

  - revalidate value is in "seconds"

## Caching

### Request Memoization

### Data cache

### Full route cache

### Router cache
