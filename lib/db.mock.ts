import { SelectUser } from '@/lib/schemas';

const _users: SelectUser[] = [
  {
    email: 'admin@test.com',
    password: 'testing',
    id: 1,
    avatar_url: '/avatar1.png',
    role: 'admin',
    first_name: 'User',
    last_name: 'Admin'
  },
  {
    email: 'test@example.com',
    password: 'testing',
    id: 2,
    avatar_url: '/avatar2.png',
    role: 'customer',
    first_name: 'Standard',
    last_name: 'User'
  }
];

export async function getUserByCredentials({
  email,
  password
}: {
  email: string;
  password: string;
}) {
  return _users.find(
    (user) => user.email === email && user.password === password
  );
}
