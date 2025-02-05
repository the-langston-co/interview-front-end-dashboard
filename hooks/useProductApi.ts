import { toast } from 'sonner';
import { revalidateProducts } from '@/app/(dashboard)/actions';
import { z } from 'zod';
import { productSchema } from '@/lib/schemas';

export function useProductApi() {
  return { deleteProduct, createProduct };
}
async function deleteProduct(product: { id: number }) {
  try {
    // Show an initial loading toast notification

    // Make the server call using fetch
    const response = await fetch(`/api/products/${product.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: product.id })
    });

    if (response.ok) {
      // Show success notification
      toast.success('Product deleted successfully');
      // Update products cache
      await revalidateProducts();
    } else {
      // Show error notification
      toast.error('Failed to delete product');
    }
  } catch (error) {
    console.error(error); // Log the error
    toast.error('An unexpected error occurred', {
      description: (error as Error).message ?? undefined
    });
  }
}

async function createProduct(data: z.input<typeof productSchema>) {
  const response = await fetch('api/products', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const saved = await response.json();
    await revalidateProducts();
    return saved;
  } else {
    throw new Error('Unable to create product');
  }
}
