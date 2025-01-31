import { ProductStatus } from '@/lib/models/Product';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { and, eq, like, SQL } from 'drizzle-orm';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';

const sqlite = new Database('database/collection.db');

const db = drizzle({ client: sqlite });

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
export const productCreateSchema = createInsertSchema(productTable, {
  status: statusEnum
});

export const productUpdateSchema = createUpdateSchema(productTable, {
  status: statusEnum
});

export type SelectProduct = typeof productTable.$inferSelect;

export async function getProducts({
  search: searchInput,
  offset = 0,
  pageSize = 5,
  status
}: {
  search: string;
  offset?: number;
  status?: ProductStatus;
  pageSize?: number;
}): Promise<{
  products: SelectProduct[];
  totalProducts: number;
  hasMore?: boolean;
}> {
  const filters: SQL[] = [];
  if (status) {
    filters.push(eq(productTable.status, status));
  }

  const search = searchInput?.trim().toLowerCase();
  if (search) {
    filters.push(like(productTable.name, `%${search}%`));
  }

  const products = await db
    .select()
    .from(productTable)
    .where(and(...filters))
    .offset(offset)
    .limit(pageSize + 1);

  const totalCount = await db.$count(productTable, and(...filters));

  return {
    products: products.slice(0, pageSize),

    totalProducts: totalCount,
    hasMore: totalCount > offset + products.length
  };
}

export async function deleteProductById(id: number) {
  await db.delete(productTable).where(eq(productTable.id, id));
}

export async function getProductById(id: number) {
  return db.select().from(productTable).where(eq(productTable.id, id));
}

export async function getUserById(id: number) {
  return db.select().from(usersTable).where(eq(usersTable.id, id));
}

export async function updateProduct(
  id: number,
  dto: z.infer<typeof productUpdateSchema>
) {
  const result = await db
    .update(productTable)
    .set(dto)
    .where(eq(productTable.id, id));
  if (result.changes) {
    return getProductById(id);
  }
  throw new Error('Product not found');
}

export async function createProduct(dto: z.infer<typeof productCreateSchema>) {
  const result = await db.insert(productTable).values(dto);

  if (result.lastInsertRowid) {
    return getProductById(Number(result.lastInsertRowid));
  }
  throw new Error('Product not found');
}
