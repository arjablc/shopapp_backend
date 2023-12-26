import { PrismaClient } from "@prisma/client";
import { Product } from "../types";
import prisma from "../prisma_client/prismaClient";

export default {
  // create
  createProduct: async (product: Product) => {
    const favStatus =
      product.isFavorite === undefined ? false : product.isFavorite;

    const savedData = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price.toPrecision(6.2),
        imageUrl: product.imageUrl,
        isFavorite: favStatus,
      },
    });
    return savedData.id;
  },
  //read
  readProduct: async (productId?: string) => {
    if (!productId) {
      return await prisma.product.findMany();
    } else {
      return await prisma.product.findFirst({
        where: {
          id: productId,
        },
      });
    }
  },

  //delete
  eleteProduct: async (productId: string) => {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
  },

  //update
  updateProduct: async (product: Product) => {
    const updatedProduct = await prisma.product.update({
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
  },
};
