import { ProductStatus } from '@/lib/models/Product';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { and, eq, like, SQL } from 'drizzle-orm';

const sqlite = new Database('database/collection.db');

const db = drizzle({ client: sqlite });

export const productSchema = sqliteTable('product', {
  id: integer('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: text('status').notNull(),
  price: real('price').notNull(),
  stock: integer('stock').notNull(),
  availableAt: text('available_at').notNull()
});

export type SelectProduct = typeof productSchema.$inferSelect;

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
  newOffset: number | null;
  totalProducts: number;
}> {
  const filters: SQL[] = [];
  if (status) {
    filters.push(eq(productSchema.status, status));
  }

  const search = searchInput?.trim().toLowerCase();
  if (search) {
    filters.push(like(productSchema.name, `%${search}%`));
  }

  const products = await db
    .select()
    .from(productSchema)
    .where(and(...filters))
    .offset(offset)
    .limit(pageSize + 1);
  // Always search the full table, not per page

  const totalCount = await db.$count(productSchema, and(...filters));

  // const moreProducts = products.slice(offset, offset + 5);
  const newOffset = offset + products.length - 1;

  return {
    products: products.slice(0, pageSize),
    newOffset,
    totalProducts: totalCount
  };
}

export async function deleteProductById(id: number) {
  console.log(`deleting product ${id}`);
  await db.delete(productSchema).where(eq(productSchema.id, id));
}
