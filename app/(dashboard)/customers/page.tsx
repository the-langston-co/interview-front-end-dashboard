import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { auth } from '@/lib/auth';

export default async function CustomersPage() {
  const session = await auth();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>View all customers and their orders.</CardDescription>
      </CardHeader>
      <CardContent>{JSON.stringify(session, null, 2)}</CardContent>
    </Card>
  );
}
