import { z } from 'zod';
import { createSelectSchema } from 'drizzle-zod';
import { productTable, statusEnum } from '@/lib/db';

export const ProductSchema = createSelectSchema(productTable, {
  status: statusEnum
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductStatus = z.infer<typeof statusEnum>;
