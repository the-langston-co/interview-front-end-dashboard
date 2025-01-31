import { ProductStatus } from '@/lib/models/Product';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { and, eq, like, SQL } from 'drizzle-orm';

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
