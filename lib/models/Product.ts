import { z } from 'zod';

export const statusEnum = z.enum(['active', 'inactive', 'archived']);

export const ProductSchema = z.object({
  id: z.number(),
  imageUrl: z.string().url(),
  name: z.string(),
  status: statusEnum,
  price: z.number(),
  stock: z.number().int(),
  availableAt: z.date()
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductStatus = z.infer<typeof statusEnum>;
