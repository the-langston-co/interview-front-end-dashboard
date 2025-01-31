import { useState } from 'react';
import { productStore } from '../models/Product';

export function useProductsStore() {
  const [prodcutStore, setProdcutStore] = useState(productStore);

  return prodcutStore;
}
