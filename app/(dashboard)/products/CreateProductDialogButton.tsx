'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product, productSchema } from '@/lib/schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useProductApi } from '@/hooks/useProductApi';

export type CreateProductButtonProps = {
  afterSave?: (product: Product) => void;
};

type FormValues = z.input<typeof productSchema>;

const initialValues: FormValues = {
  name: '',
  availableAt: '',
  imageUrl: '',
  price: '',
  status: 'inactive',
  stock: ''
};

export function CreateProductDialogButton({
  afterSave
}: CreateProductButtonProps) {
  const [open, setOpen] = useState(false);
  const { createProduct } = useProductApi();
  const form = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(productSchema)
  });

  async function handleSubmit(data: FormValues) {
    try {
      const saved = await createProduct(data);
      setOpen(false);
      afterSave?.(saved);
      form.reset();
      toast.success('Product created successfully');
    } catch (error) {
      toast.error('Unable to create product', {
        description: (error as Error).message
      });
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <DialogHeader>
              <DialogTitle>Create product</DialogTitle>
              <DialogDescription className={'sr-only'}>
                Configure a new product
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className={'space-y-6'}
                id={'create-product-form'}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} autoComplete="off" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Remaining qty</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </DialogBody>
            <DialogFooter className={'space-x-4 flex items-center'}>
              <DialogClose asChild>
                <Button size={'sm'} variant={'outline'}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                size="sm"
                variant="default"
                type={'submit'}
                form={'create-product-form'}
              >
                Submit
              </Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
