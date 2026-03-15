import type { Metadata } from 'next';
import { Noto_Sans, Inter } from 'next/font/google';
import './globals.css';
import { ProjectNavigationMenu } from '@/widgets/project-navigation-menu';

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dev ToolBox',
  description: 'A compile of useful tools',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.variable} ${notoSans.variable} antialiased bg-background`}
      >
        <ProjectNavigationMenu>{children}</ProjectNavigationMenu>
      </body>
    </html>
  );
}
