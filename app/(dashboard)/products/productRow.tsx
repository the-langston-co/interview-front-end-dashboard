import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PencilIcon, Trash2Icon } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';

import { Product } from '@/lib/schemas';
import { toast } from 'sonner';
import { useProductApi } from '@/hooks/useProductApi';

export function ProductRow({ product }: { product: Product }) {
  const { deleteProduct } = useProductApi();

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        {product.imageUrl && (
          <Image
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            height="64"
            src={product.imageUrl}
            width="64"
          />
        )}
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {product.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${product.price}`}</TableCell>
      <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
      <TableCell className="hidden md:table-cell">
        {new Date(Number(product.availableAt)).toLocaleDateString('en-US')}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => toast.warning('Edit is not implemented')}
            >
              <PencilIcon />
              Edit product
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteProduct(product)}>
              <Trash2Icon />
              Delete product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
