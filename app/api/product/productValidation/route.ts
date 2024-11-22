import { z } from "zod";

export const UpdateProduct = z.object({
  name: z.string().min(3),
  description: z.string(),
  category: z.string(),
  productOrigin: z.string(),
  quantity: z.number().positive().min(0),
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
  ])
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
