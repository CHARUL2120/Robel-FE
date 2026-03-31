'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import BrandLogo from '../site/BrandLogo';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet';
import { cn } from '../../../lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/laminates', label: 'PVC Laminates' },
  { href: '/asa-laminates', label: 'ASA Laminates' },
  { href: '/acrylic-sheets', label: 'Acrylic Sheets' },
  { href: '/contact', label: 'Contact' }
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isTransparent = pathname === '/' && !scrolled;
  const isActiveLink = (href) => pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          'mx-auto flex h-[62px] w-full max-w-[1280px] items-center justify-between rounded-full border px-3 transition-all duration-500 sm:h-[66px] sm:px-5 lg:h-[70px] lg:px-6',
          isTransparent
            ? 'border-white/15 bg-white/5 text-white shadow-none backdrop-blur-[6px]'
            : 'border-white/60 bg-white/75 text-[#1f1915] shadow-[0_18px_65px_-28px_rgba(28,20,14,0.35)] backdrop-blur-2xl'
        )}
      >
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  'lg:hidden',
                  isTransparent
                    ? 'border-white/25 bg-white/10 text-white hover:bg-white/20'
                    : 'border-[#d6c7b8] bg-white/80 text-[#1f1915]'
                )}
              >
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="border-r-white/40 bg-[#f7f1ea]/95 px-0 backdrop-blur-2xl"
            >
              <div className="px-6 pt-10">
                <SheetTitle className="sr-only">Robel</SheetTitle>
                <BrandLogo variant="inline" className="h-auto w-[180px]" />
                <SheetDescription className="mt-3 text-base leading-7 text-[#5f564f]">
                  Premium laminates, ASA laminates, acrylic sheets, PVC
                  panels, and WPC boards curated for modern interior projects.
                </SheetDescription>
              </div>
              <div className="grid gap-2 px-3 py-6">
                {navLinks.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        'flex w-full items-center rounded-2xl border px-4 py-3 text-base font-medium transition',
                        isActiveLink(link.href)
                          ? 'border-[#d7c6b6] bg-white text-[#1f1915] shadow-[0_14px_34px_-26px_rgba(27,19,14,0.25)]'
                          : 'border-transparent text-[#1f1915] hover:border-[#ebe0d4] hover:bg-white'
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <Link
            href="/"
            className={cn(
              'flex items-center rounded-[14px] px-1 py-0.5 transition',
              isTransparent
                ? 'border border-white/55 bg-white/92 shadow-[0_16px_40px_-24px_rgba(18,12,8,0.28)] backdrop-blur-md'
                : 'bg-transparent'
            )}
          >
            <BrandLogo
              variant="inline"
              className="h-auto w-[108px] sm:w-[122px] lg:w-[132px]"
            />
          </Link>
        </div>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className={cn(
                'inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm font-medium transition',
                isTransparent
                  ? isActiveLink(link.href)
                    ? 'border-white/40 bg-white/14 text-white'
                    : 'border-transparent text-white/90 hover:border-white/20 hover:bg-white/12 hover:text-white'
                  : isActiveLink(link.href)
                    ? 'border-[#d7c6b6] bg-white text-[#1f1915] shadow-[0_14px_34px_-26px_rgba(27,19,14,0.22)]'
                    : 'border-transparent text-[#2f2721] hover:border-[#ebe0d4] hover:bg-white hover:text-[#1f1915]'
              )}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          asChild
          className={cn(
            'ml-3 hidden lg:inline-flex',
            isTransparent
              ? 'bg-white text-[#1f1915] hover:bg-white/90'
              : 'bg-[#2d231c] text-white'
          )}
        >
          <Link href="/contact">Book Consultation</Link>
        </Button>
      </div>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
