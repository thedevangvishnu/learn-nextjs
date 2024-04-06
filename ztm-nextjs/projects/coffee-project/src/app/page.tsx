import Banner from "../components/banner.client";
import Card from "../components/card.server";

import { fetchCoffeeStores } from "../lib/coffee-stores";
import { CoffeeStoreType } from "@/types";

async function getData() {
  return await fetchCoffeeStores();
}

export default async function Home() {
  const coffeeStores: CoffeeStoreType[] = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <Banner />
      <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6 mt-6 md:mt-10">
        {coffeeStores.map((store: CoffeeStoreType, index: number) => (
          <Card
            key={index}
            name={store.name}
            imgUrl={store.imageUrl}
            href={`/coffee-store/${store.id}`}
          />
        ))}
      </div>
    </main>
  );
}
