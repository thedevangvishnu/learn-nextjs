"use client";

import useTrackLocation from "@/hooks/use-track-location";
import Banner from "./banner.client";
import { useEffect, useState } from "react";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { CoffeeStoreType } from "@/types";
import Card from "./card.server";

export default function NearByCoffeeStores() {
  const [coffeeStores, setCoffeeStores] = useState<CoffeeStoreType[] | []>([]);

  const {
    handleTrackLocation,
    isFindingLocation,
    longLat,
    locationErrorMessage,
  } = useTrackLocation();

  const handleOnClick = () => {
    handleTrackLocation();
    console.log("Longlat", longLat);
  };

  useEffect(() => {
    async function fetchStoresByLocation() {
      if (longLat) {
        const response = await fetchCoffeeStores(longLat);
        console.log(response);
        setCoffeeStores(response);
      }
    }

    fetchStoresByLocation();
  }, [longLat]);

  return (
    <div className="w-full">
      <Banner
        handleOnClick={handleOnClick}
        buttonText={isFindingLocation ? "Locating..." : "View Stores Nearby"}
      />
      <div className="w-full mt-8">
        <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
          Stores in your location
        </h2>
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6 mt-6 md:mt-10">
          {coffeeStores.map((store: CoffeeStoreType) => (
            <Card
              key={store.id}
              name={store.name}
              imgUrl={store.imageUrl}
              href={`/coffee-store/${store.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
