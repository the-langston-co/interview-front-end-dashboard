import { HomeIcon } from 'lucide-react';

export default async function Page() {
  return (
    <div
      className={
        'text-muted-foreground p-12 border rounded-xl border-dashed text-center flex justify-center items-center max-w-screen-md flex-col'
      }
    >
      <div>
        <HomeIcon className={'size-6'} />
      </div>
      <div>Home page</div>
    </div>
  );
}
