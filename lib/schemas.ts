import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const productTable = sqliteTable('product', {
  id: integer('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: text('status').notNull(),
  price: real('price').notNull(),
  stock: integer('stock').notNull(),
  availableAt: text('available_at').notNull()
});
export const usersTable = sqliteTable('user', {
  id: integer('id').primaryKey(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  first_name: text('first_name'),
  last_name: text('last_name'),
  avatar_url: text('avatar_url'),
  role: text('role').notNull()
});
export type SelectUser = typeof usersTable.$inferSelect;
export const statusEnum = z.enum(['active', 'inactive', 'archived']);

const schemaRefinements = {
  status: statusEnum,
  price: z
    .union([z.string(), z.number()])
    .transform(Number)
    .pipe(z.coerce.number()),
  stock: z
    .union([z.string(), z.number()])
    .transform(Number)
    .pipe(z.coerce.number())
};

export const productCreateSchema = createInsertSchema(
  productTable,
  schemaRefinements
);

export const productUpdateSchema = createUpdateSchema(productTable, {
  status: statusEnum,
  schema: schemaRefinements
});

export type Product = typeof productTable.$inferSelect;
export type ProductStatus = z.infer<typeof statusEnum>;
