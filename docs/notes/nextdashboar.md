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
