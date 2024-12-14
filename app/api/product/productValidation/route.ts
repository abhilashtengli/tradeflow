import { z } from "zod";

export const UpdateProduct = z.object({
  name: z.string().min(3).optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  productOrigin: z.string().optional(),
  quantity: z.number().positive().min(0).optional(),
  price: z.number().positive().min(0).optional(),
  country: z.string().optional(),
  isAvailable: z.boolean().optional(),
  productId: z.string(),
  unit: z
    .enum(["pcs", "box", "kg", "grams", "tons", "cm", "meter", "inche", "feet"])
    .optional()
});

export const CreateProduct = z.object({
  name: z.string().min(3),
  description: z.string(),
  category: z.string(),
  productOrigin: z.string(),
  quantity: z.number().int().positive().min(0),
  price: z.number().positive(),
  country: z.string(),
  isAvailable: z.boolean(),
  unit: z.enum([
    "pcs",
    "box",
    "kg",
    "grams",
    "tons",
    "cm",
    "meter",
    "inche",
    "feet"
  ]),
  currency: z.enum(["USD", "EURO", "GBP", "INR", "RUB", "CNY"])
});
