import { MapboxType } from "@/types";

const transformFeature = (feature: MapboxType) => {
  return {
    id: feature.id,
    name: feature.text,
    address: feature.properties?.address || "NA",
    imageUrl:
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29mZmVlJTIwc2hvcHxlbnwwfDB8MHx8fDA%3D",
  };
};

export const fetchCoffeeStores = async (longLat: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/coffee%20.json?limit=9&proximity=${longLat}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API}`
    ); // by default, fetch is implementing "force-cache"
    const data = await response.json();

    return data.features.map((feature: MapboxType) =>
      transformFeature(feature)
    );

    return data.features;
  } catch (error: any) {
    console.log("Error fetching coffee-stores", error);
    throw new Error();
  }
};

export const fetchCoffeeStore = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${id}.json?limit=1&proximity=ip&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API}`
    );
    const data = await response.json();

    const stores = data.features?.map((feature: MapboxType) =>
      transformFeature(feature)
    );

    return stores.length > 0 ? stores[0] : {};

    return data.features;
  } catch (error: any) {
    console.log("Error fetching coffee-stores", error);
    throw new Error();
  }
};
