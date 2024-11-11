import { z } from "zod";

export const UpdateProduct = z.object({
  name: z.string().min(3),
  description: z.string(),
  category: z.string(),
  quantity: z.number().int().positive().min(0),
  price: z.number().positive(),
  country: z.string(),
  isAvailable: z.boolean()
});


export const CreateProduct = z.object({
  name: z.string().min(3),
  description: z.string(),
  category: z.string(),
  quantity: z.number().int().positive().min(0),
  price: z.number().positive(),
  country: z.string(),
  isAvailable: z.boolean()
});