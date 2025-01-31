import { NextResponse } from 'next/server';
import { createProduct, productCreateSchema } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const dto = productCreateSchema.parse(data);
    const created = await createProduct(dto);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to create product',
        details: (error as Error).message || error
      },
      { status: 500 }
    );
  }
}
