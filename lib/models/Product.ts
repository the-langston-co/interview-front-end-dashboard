import { z } from 'zod';
import { createSelectSchema } from 'drizzle-zod';
import { productTable } from '@/lib/db';

export const statusEnum = z.enum(['active', 'inactive', 'archived']);

export const ProductSchema = createSelectSchema(productTable, {
  status: statusEnum
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductStatus = z.infer<typeof statusEnum>;
