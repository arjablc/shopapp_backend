import prisma from "../prisma_client/prismaClient";
import { Product } from "../types";

export const createProductService = async (product: Product) => {
  const createdProduct = await prisma.product.create({
    data: product,
    select: {
      id: true,
    },
  });
  return createdProduct;
};

export const readProductService = async (userId?: string) => {
  if (userId) {
    console.log(
      await prisma.product.findFirstOrThrow({
        where: {
          id: userId,
        },
      })
    );
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

export const updateProductService = async (product: Product) => {
  await prisma.product.update({
    where: {
      id: product.id,
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
