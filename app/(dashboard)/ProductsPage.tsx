'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { File, PlusCircle } from 'lucide-react';
import { ProductsTable } from './products-table';
import { Product } from '@/lib/models/Product';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type ProductsPageProps = {
  products: Product[];
  newOffset: number | null;
  totalProducts: number;
  tab?: string;
};

export function ProductsPage({
  products,
  totalProducts,
  newOffset,
  tab = 'all'
}: ProductsPageProps) {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

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
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div>
      </div>
      {/*<TabsContent value="all">*/}
      {/*  <ProductsTable*/}
      {/*    products={products}*/}
      {/*    offset={newOffset ?? 0}*/}
      {/*    totalProducts={totalProducts}*/}
      {/*  />*/}
      {/*</TabsContent>*/}
      {/*  Implement Active, Draft, Archived tab contents */}
      <ProductsTable
        products={products}
        offset={newOffset ?? 0}
        totalProducts={totalProducts}
      />
    </Tabs>
  );
}
