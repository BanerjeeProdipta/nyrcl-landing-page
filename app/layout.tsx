import type { Metadata } from 'next';
import { Inter, Epilogue } from 'next/font/google';
import './globals.css';
import Nav from './component/Nav';

const inter = Inter({ subsets: ['latin'] });
const epilogue = Epilogue({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'New York Recreational Cricket League',
  description: 'New York Recreational Cricket League',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={epilogue.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
