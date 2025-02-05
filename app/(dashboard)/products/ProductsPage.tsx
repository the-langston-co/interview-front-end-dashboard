'use client';
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { File, PlusCircle } from 'lucide-react';
import { ProductsTable } from './ProductsTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Product } from '@/lib/schemas';
import { toast } from 'sonner';
import { CreateProductDialogButton } from '@/app/(dashboard)/products/CreateProductDialogButton';

export type ProductsPageProps = {
  products: Product[];
  totalProducts: number;
  tab?: string;
};

export function ProductsPage({
  products,
  totalProducts,
  tab = 'all'
}: ProductsPageProps) {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const offset = Number(searchParams.get('offset') ?? 0);
  return (
    <Tabs
      value={tab}
      onValueChange={(value) => {
        const params = new URLSearchParams(searchParams);
        params.set('tab', value);
        router.push(`${pathname}?${params.toString()}`);
      }}
    >
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button
            size="sm"
            className="h-8 gap-1"
            onClick={() => {
              toast.warning('Not implemented yet!');
            }}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
          <CreateProductDialogButton />
        </div>
      </div>
      <div className={'mt-4'}>
        <ProductsTable
          products={products}
          offset={offset}
          totalProducts={totalProducts}
        />
      </div>
    </Tabs>
  );
}
