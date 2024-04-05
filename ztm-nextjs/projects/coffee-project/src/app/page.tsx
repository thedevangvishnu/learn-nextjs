import Banner from "./components/banner.client";
import Card from "./components/card.server";

export default function Home() {
  const coffeeStoreId = "dark-horse-coffee";
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <Banner />
      <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6 mt-6 md:mt-10">
        <Card
          name="Dark horse coffee"
          imgUrl="/static/hero-image.png"
          href={`/coffee-store/${coffeeStoreId}`}
        />
      </div>
    </main>
  );
}
