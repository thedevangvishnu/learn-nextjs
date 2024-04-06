import { MapboxType } from "@/types";

const transformFeature = (feature: MapboxType) => {
  return {
    id: feature.id,
    name: feature.text,
    address: feature.properties?.address || "",
    imageUrl:
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29mZmVlJTIwc2hvcHxlbnwwfDB8MHx8fDA%3D",
  };
};

export const fetchCoffeeStores = async () => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/coffee.json?limit=4&proximity=77.41615791008667%2C28.682342512374817&access_token=${process.env.MAPBOX_API}`
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
