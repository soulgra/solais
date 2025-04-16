import type { Metadata, Viewport } from 'next';
import './globals.css';
import AuthProvider from '@/providers/AuthProvider';
import React from 'react';
import ThemeInitializer from '@/app/_components/ThemeInitializer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#c5b3fe',
};

export const metadata: Metadata = {
  title: 'sola-ai',
  description: 'Voice Assistant on Solana',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'sola-ai',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/solai.png"></link>
        <link rel="icon" href="/solai.png"></link>
        <title>sola-ai</title>
      </head>
      <body suppressHydrationWarning={true}>
        <ThemeInitializer />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
