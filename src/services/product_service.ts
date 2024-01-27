import prisma from "../db/prisma_client";
import { Product } from "../schema/product_schema";

export const createProductService = async (
  product: Product,
  authorId: string
) => {
  console.log("service hit");
  const createdProduct = await prisma.product.create({
    data: { ...product, authorId: authorId },
    select: {
      id: true,
    },
  });
  return createdProduct;
};

export const readProductService = async (userId?: string) => {
  if (userId) {
    return await prisma.product.findFirstOrThrow({
      where: {
        id: userId,
      },
    });
  } else {
    return await prisma.product.findMany();
  }
};

export const deleteProductService = async (productId: string) => {
  await prisma.product.delete({
    where: {
      id: productId,
    },
  });
};

export const updateProductService = async (id: string, product: Product) => {
  await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      isFavorite: product.isFavorite,
    },
  });
};
