import Link from 'next/link';
import { PropsWithChildren } from 'react';

const links = [
  { displayName: 'JSON Formatter', href: '#' },
  { displayName: 'RegEx Tester', href: '#' },
  { displayName: 'Color converter', href: '#' },
  { displayName: 'Base64 converter', href: '/base64-converter' },
  { displayName: 'JWT Decoder', href: '#' },
];

export default function ProjectNavigationMenu(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className='w-dvw h-dvh m-0 p-0 flex flex-col'>
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
      <main className='w-full flex-1'>{children}</main>
      <footer className='flex justify-center p-2 bg-accent font-semibold text-md text-primary'>
        This is Rezy&apos;s webpage.
      </footer>
    </div>
  );
}
