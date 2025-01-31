import { faker } from '@faker-js/faker';
import { Product, ProductStatus, statusEnum } from '@/lib/models/Product';

function mockProduct(id: number, status?: ProductStatus): Product {
  const defaultStatus = statusEnum.options[id % statusEnum.options.length];

  return {
    availableAt: faker.date.past(),
    imageUrl: `https://picsum.photos/seed/${id}/200/300`,
    name: faker.commerce.productName(),
    price: Number.parseFloat(faker.commerce.price({ max: 199 })),
    status: status ?? defaultStatus,
    stock: faker.number.int({ min: 1, max: 1000 }),
    id
  };
}

export const mockProducts: Product[] = [
  {
    id: 1,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/smartphone-gaPvyZW6aww0IhD3dOpaU6gBGILtcJ.webp',
    name: 'Smartphone X Pro',
    status: 'active',
    price: 999.0,
    stock: 150,
    availableAt: new Date()
  },
  {
    id: 2,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/earbuds-3rew4JGdIK81KNlR8Edr8NBBhFTOtX.webp',
    name: 'Wireless Earbuds Ultra',
    status: 'active',
    price: 199.0,
    stock: 300,
    availableAt: new Date()
  },
  {
    id: 3,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/home-iTeNnmKSMnrykOS9IYyJvnLFgap7Vw.webp',
    name: 'Smart Home Hub',
    status: 'inactive',
    price: 149.0,
    stock: 200,
    availableAt: new Date()
  },
  {
    id: 4,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/tv-H4l26crxtm9EQHLWc0ddrsXZ0V0Ofw.webp',
    name: '4K Ultra HD Smart TV',
    status: 'active',
    price: 799.0,
    stock: 50,
    availableAt: new Date()
  },
  {
    id: 5,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/laptop-9bgUhjY491hkxiMDeSgqb9R5I3lHNL.webp',
    name: 'Gaming Laptop Pro',
    status: 'active',
    price: 1299.0,
    stock: 75,
    availableAt: new Date()
  },
  {
    id: 6,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/headset-lYnRnpjDbZkB78lS7nnqEJFYFAUDg6.webp',
    name: 'VR Headset Plus',
    status: 'active',
    price: 349.0,
    stock: 120,
    availableAt: new Date()
  },
  {
    id: 7,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/watch-S2VeARK6sEM9QFg4yNQNjHFaHc3sXv.webp',
    name: 'Smartwatch Elite',
    status: 'active',
    price: 249.0,
    stock: 250,
    availableAt: new Date()
  },
  {
    id: 8,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/speaker-4Zk0Ctx5AvxnwNNTFWVK4Gtpru4YEf.webp',
    name: 'Bluetooth Speaker Max',
    status: 'active',
    price: 99.0,
    stock: 400,
    availableAt: new Date()
  },
  {
    id: 9,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/charger-GzRr0NSkCj0ZYWkTMvxXGZQu47w9r5.webp',
    name: 'Portable Charger Super',
    status: 'active',
    price: 59.0,
    stock: 500,
    availableAt: new Date()
  },
  {
    id: 10,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/thermostat-8GnK2LDE3lZAjUVtiBk61RrSuqSTF7.webp',
    name: 'Smart Thermostat Pro',
    status: 'active',
    price: 199.0,
    stock: 175,
    availableAt: new Date()
  },
  ...new Array(250).fill(0).map<Product>((_, i) => mockProduct(i + 11))
];
