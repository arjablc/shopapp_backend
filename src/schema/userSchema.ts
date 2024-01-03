import z from "zod";

export const userSchema = z.object({
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

export type User = z.infer<typeof userSchema>;
