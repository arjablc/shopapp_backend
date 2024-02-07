import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma_client";
import { ProductDto } from "../schema/product_schema";

export const createProductService = async (
  product: ProductDto,
  authorId: string
) => {
  const createdProduct = await prisma.product.create({
    data: { ...product, authorId },
    select: {
      id: true,
    },
  });
  return createdProduct;
};

export const readProductService = async (productId?: string) => {
  if (productId) {
    return await prisma.product.findFirstOrThrow({
      where: {
        id: productId,
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

export const updateProductService = async (id: string, product: ProductDto) => {
  const price = product.price;

  await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      ...product,
      price: price,
    },
  });
};
