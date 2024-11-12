import { z } from "zod";

export const updateUserTs = z.object({
  name: z.string().min(2),
  password: z.string().min(8),
  companyName: z.string().min(2),
  companyAddress: z.string(),
  country: z.string()
});
