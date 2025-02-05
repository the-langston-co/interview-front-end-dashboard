import Link from 'next/link';
import React, { ReactElement, ReactNode } from 'react';

export type NavLinkBlockProps = {
  href: string;
  icon: ReactElement<SVGSVGElement>;
  title: ReactNode;
};

export function NavLinkBlock({ href, icon, title }: NavLinkBlockProps) {
  return (
    <Link href={href}>
      <div
        className={
          'flex flex-col items-center justify-center px-4 py-3 rounded-lg border gap-3 shadow bg-card hover:-translate-y-1 transition-transform hover:bg-accent/5'
        }
      >
        <div className={'text-muted-foreground/80'}>
          {React.cloneElement(icon, {
            className: 'size-8 '
          })}
        </div>
        <div className={'font-semibold'}>{title}</div>
      </div>
    </Link>
  );
}
