import { Product, ProductStatus, productStore } from '@/lib/models/Product';
import { sleep } from '@/lib/utils';

export async function getProducts({
  search,
  offset = 0,
  pageSize = 5,
  status
}: {
  search: string;
  offset?: number;
  status?: ProductStatus;
  pageSize?: number;
}): Promise<{
  products: Product[];
  newOffset: number | null;
  totalProducts: number;
}> {
  const products = status
    ? productStore.products.filter((p) => p.status === status)
    : productStore.products;

  // Always search the full table, not per page
  if (search) {
    const filteredProducts = products.filter((p) =>
      p.name?.toLowerCase().includes(search.toLowerCase())
    );
    return {
      products: filteredProducts.slice(offset, pageSize + offset),
      newOffset: offset + pageSize,
      totalProducts: filteredProducts.length
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  const totalProducts = products.length;
  const moreProducts = products.slice(offset, offset + 5);
  const newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,
    newOffset,
    totalProducts: totalProducts
  };
}

export async function deleteProductById(id: number) {
  await productStore.deleteProduct(id);
}
