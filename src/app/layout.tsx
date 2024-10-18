import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: '반응 속도 테스트',
    template: '%s | 반응 속도 테스트',
  },
  description: '당신의 반응 속도를 측정하고 다른 사람들과 비교해보세요.',
  keywords: ['반응 속도', '테스트', '게임', '온라인 테스트'],
  openGraph: {
    title: '반응 속도 테스트',
    description: '당신의 반응 속도를 측정하고 다른 사람들과 비교해보세요.',
    url: 'https://speedyreact.com',
    siteName: '반응 속도 테스트',
    images: [
      {
        url: 'https://speedyreact.com/public/logo.jpg',
        width: 800,
        height: 400,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '반응 속도 테스트',
    description: '당신의 반응 속도를 측정하고 다른 사람들과 비교해보세요.',
    images: ['https://speedyreact.com/public/logo.jpg'],
  },
  other: {
    'kaist:a': 'dummy',
    'kaist:date': new Date().toISOString(),
  },
  icons: {
    icon: [
      { url: '/public/logo.svg', type: 'image/svg+xml' },
      { url: '/public/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/public/logo.jpg', sizes: '180x180', type: 'image/jpeg' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/public/logo.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
