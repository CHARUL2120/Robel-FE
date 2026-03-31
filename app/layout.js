import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from './components/header/page';
import Footer from './components/Footer/Footer';
import SmoothScroll from './components/Scroll/SmoothScroll';
import FounderShowcase from './components/site/FounderShowcase';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap'
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

export const metadata = {
  title: 'Robel',
  description:
    'Premium laminates, acrylic sheets, PVC sheets, and WPC boards for modern interiors.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-body antialiased">
        <SmoothScroll />
        <Header />
        <main className="min-h-[100svh]">{children}</main>
        <FounderShowcase />
        <Footer />
      </body>
    </html>
  );
}
