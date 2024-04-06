import NearByCoffeeStores from "@/components/nearby-coffee-stores.client";
import Banner from "../components/banner.client";
import Card from "../components/card.server";

import { fetchCoffeeStores } from "../lib/coffee-stores";
import { CoffeeStoreType } from "@/types";

async function getData() {
  const DELHI_LOCATION = "77.21965374773424,28.632998111618946";
  return await fetchCoffeeStores(DELHI_LOCATION);
}

export default async function Home() {
  const coffeeStores: CoffeeStoreType[] = await getData();

  console.log("access key", process.env.UNSPLASH_ACCESS_KEY);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <NearByCoffeeStores />
      <div className="w-full mt-8">
        <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
          Coffee stores in New Delhi
        </h2>
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6 mt-6 md:mt-10">
          {coffeeStores?.map((store: CoffeeStoreType) => (
            <Card
              key={store.id}
              name={store.name}
              imgUrl={store.imageUrl}
              href={`/coffee-store/${store.id}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
