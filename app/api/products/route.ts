import { NextResponse } from 'next/server';
import { createProduct } from '@/lib/db';
import { productCreateSchema } from '@/lib/schemas';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const dto = productCreateSchema.parse(data);

    try {
      const created = await createProduct({
        ...dto,
        availableAt: new Date().getTime().toString()
      });
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
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
