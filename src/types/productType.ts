import { Decimal } from "@prisma/client/runtime/library";

type Product = {
  id?: string;
  createdAt?: any;
  updatedAt?: any;
  name: string;
  description: string;
  price: Decimal;
  imageUrl?: string | null;
  isFavorite?: boolean | undefined;
};

export { Product };
