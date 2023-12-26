type Product = {
  id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isFavorite: boolean | undefined;
};

export { Product };
