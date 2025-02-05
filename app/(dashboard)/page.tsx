import {
  LineChartIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon
} from 'lucide-react';
import { NavLinkBlock } from '@/app/(dashboard)/NavLinkBlock';

export default async function Page() {
  return (
    <div
      className={
        'grid grid-cols-2 md:grid-cols-4 gap-6 max-w-screen-2xl mr-auto'
      }
    >
      <NavLinkBlock
        href={'/orders'}
        icon={<ShoppingCartIcon />}
        title={'Orders'}
      />
      <NavLinkBlock
        href={'/products'}
        icon={<PackageIcon />}
        title={'Products'}
      />
      <NavLinkBlock
        href={'/customers'}
        icon={<UsersIcon />}
        title={'Customers'}
      />
      <NavLinkBlock
        href={'/analytics'}
        icon={<LineChartIcon />}
        title={'Analytics'}
      />
    </div>
  );
}
