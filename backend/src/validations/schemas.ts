import { User } from "@prisma/client";
import { z } from "zod";

type genOmit = "createdAt" | "updatedAt";
type RegisterDto = Omit<User, genOmit | "password" | "verificationToken">;

export const registerSchema = z.object({
  email: z
    .string({ required_error: "Email is Required" })
    .email("Invalid Email"),
  fullName: z
    .string({ required_error: "Full Name is Required" })
    .min(3, "Full Name must be at least 3 characters long"),
  password: z
    .string({ required_error: "Password is Required" })
    .min(6, "Password must be at least 6 characters long"),
  username: z.string({ required_error: "Username is Required" }),
});
registerSchema.required();

export const postSchema = z.object({
  content: z.string({ required_error: "Post content required" }),
  title: z.string({ required_error: "Post title required" }),
  // verify proper url
  image: z
    .string({ required_error: "Post image required" })
    .regex(/^http(s?):\/\/.*?\.(?:jpg|gif|png|webp)$/, "Invalid image url")
    .optional()
    .nullable(),
});

export const commentSchema = z.object({
  content: z.string({ required_error: "Comment content required" }),
  postId: z.string({ required_error: "Post ID required" }),
});
