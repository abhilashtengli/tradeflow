import { z } from "zod";

export const updateUserTs = z.object({
         name: z.string().min(2).optional(),
         password: z.string().min(8).optional(),
         companyName: z.string().min(2).optional(),
         companyAddress: z.string().optional(),
         country: z.string().optional()
       });
