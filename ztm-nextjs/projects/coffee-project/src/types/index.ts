export type MapboxType = {
  id: string;
  text: string;
  properties: {
    address: string;
  };
};

export type CoffeeStoreType = {
  id: string;
  name: string;
  address?: string;
  imageUrl: string;
};
