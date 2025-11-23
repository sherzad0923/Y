import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Yama&apos;s Streaming</title>
        <meta name="description" content="Yama's streaming platform" />
      </Head>
      <header className="nav">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/">Yama&apos;s</Link>
          <Link href="/search">Search</Link>
          <Link href="/downloads">Downloads</Link>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/profile">Profile</Link>
          <Link className="cta" href="/admin">Admin</Link>
        </div>
      </header>
      {children}
    </div>
  );
};

export default Layout;
