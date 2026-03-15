import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { links } from '../lib/consts';

export default function ProjectNavigationMenu(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className='m-0 flex h-dvh w-dvw flex-col p-0'>
      <header className='py-2 px-6 bg-accent flex justify-between'>
        <Link
          className='text-primary'
          href='/'
        >
          Dev ToolBox
        </Link>
        <div className='flex gap-5'>
          {links.map(({ displayName, href }, linkIndex) => (
            <Link
              key={`Navigation-Menu-Link-${linkIndex}`}
              className='underline text-foreground hover:text-primary cursor-pointer'
              href={href}
            >
              {displayName}
            </Link>
          ))}
        </div>
      </header>
      <main className='flex min-h-0 w-full flex-1 p-4'>{children}</main>
      <footer className='flex justify-center p-2 bg-accent font-semibold text-md text-primary'>
        This is Rezy&apos;s webpage.
      </footer>
    </div>
  );
}
