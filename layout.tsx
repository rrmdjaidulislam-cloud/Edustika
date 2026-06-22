import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Edustika Batch Enrollment',
  description: 'Edustika batch enrollment form for Class 8, 9 and 10',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
