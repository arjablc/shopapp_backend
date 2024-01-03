import { Prisma } from "@prisma/client";
import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string({
      required_error: "product name must be provided",
    })
    .max(100, "Name must be 100 characters max"),
  price: z.union([
    z
      .number({
        required_error: "price is required",
        invalid_type_error: "price must be a number",
      })
      .refine((value) => value % 1 !== 0, {
        message: "price must be a number",
      }),
    z.instanceof(Prisma.Decimal),
  ]),

  imageUrl: z
    .string()
    .url("imageUrl must be a valid Url")
    .nullable()
    .optional(),
  description: z
    .string({
      required_error: "product description must be provided",
    })
    .min(10, "description must be minimum of 10 characters")
    .max(225, "description must be at max 225 chars"),
  isFavorite: z.boolean().default(false).optional(),
});

export type Product = z.output<typeof productSchema>;
