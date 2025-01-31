import { getProducts } from '@/lib/db';
import { ProductsPage } from './ProductsPage';
import { ProductStatus } from '@/lib/models/Product';

export default async function Page(props: {
  searchParams: Promise<{
    q: string;
    offset: string;
    // status?: ProductStatus;
    tab?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  // const status = searchParams.status;
  const tab = searchParams.tab;
  const { products, newOffset, totalProducts } = await getProducts({
    search: search,
    offset: Number(offset),
    status: tab === 'all' ? undefined : (tab as ProductStatus)
  });

  console.log('products', { products });

  return (
    <ProductsPage
      products={products}
      newOffset={newOffset}
      totalProducts={totalProducts}
      tab={tab}
    />
  );
}
