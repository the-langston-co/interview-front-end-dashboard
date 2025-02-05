import { NextResponse } from 'next/server';
import { deleteProduct, updateProduct } from '@/lib/db';
import { productSchema } from '@/lib/schemas';

export async function PUT(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const productId = Number(params.productId);

  try {
    const data = await request.json();
    const dto = productSchema.parse(data);
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

export async function DELETE(
  _request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const productId = Number(params.productId);
    await deleteProduct(productId);
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to delete product',
        details: (error as Error).message || error
      },
      { status: 404 }
    );
  }
}
