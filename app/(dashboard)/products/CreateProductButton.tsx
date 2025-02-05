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
import { productCreateSchema, SelectProduct } from '@/lib/schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { revalidateProducts } from '@/app/(dashboard)/actions';
import { toast } from 'sonner';

export type CreateProductButtonProps = {
  afterSave?: (product: SelectProduct) => void;
};

type FormValues = z.input<typeof productCreateSchema>;

const initialValues: FormValues = {
  name: '',
  availableAt: '',
  imageUrl: '',
  price: '',
  status: 'inactive',
  stock: ''
};

export function CreateProductButton({ afterSave }: CreateProductButtonProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(productCreateSchema)
  });

  async function handleSubmit(data: FormValues) {
    console.log({ formValues: data });
    const response = await fetch('api/products', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setOpen(false);
      const saved = await response.json();
      afterSave?.(saved);
      await revalidateProducts();
      form.reset();
      toast.success('Product created successfully');
    } else {
      toast.error('Unable to create product');
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
          <DialogHeader>
            <DialogTitle>Create product</DialogTitle>
            <DialogDescription className={'sr-only'}>
              Configure a new product
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <Form {...form}>
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
            </Form>
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
        </DialogContent>
      </Dialog>
    </>
  );
}
