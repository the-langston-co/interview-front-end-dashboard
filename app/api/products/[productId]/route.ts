import { NextResponse } from 'next/server';
import { productUpdateSchema, updateProduct } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const productId = Number(params.productId);

  try {
    const data = await request.json();
    const dto = productUpdateSchema.parse(data);
    const updated = await updateProduct(productId, dto);
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to update product',
        details: (error as Error).message || error
      },
      { status: 500 }
    );
  }
}
