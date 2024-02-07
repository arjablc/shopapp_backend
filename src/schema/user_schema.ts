import z from "zod";
import { omit } from "lodash";

export const userCreateSchema = z.object({
  name: z.string({
    required_error: "name is required",
  }),
  password: z
    .string({ required_error: "password is required" })
    .min(6, "password must be minimum 6 characters long"),
  email: z
    .string({
      required_error: "email is required",
    })
    .email({
      message: "not a valid email",
    }),
});

export const userLoginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .email({
      message: "not a valid email",
    }),
  password: z
    .string({ required_error: "password is required" })
    .min(6, "password must be minimum 6 characters long"),
});

export type UserDto = z.infer<typeof userCreateSchema>;
