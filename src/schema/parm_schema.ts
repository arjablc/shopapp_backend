import z from "zod";

export const parmSchema = z.object({
  id: z
    .string({
      required_error: "id parameter must be provided",
      invalid_type_error: "id must be of string",
    })
    .cuid({
      message: "Invalid id prarmeter passed",
    }),
});
