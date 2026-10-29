import Link from 'next/link';
import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { categories } from '../../data/catalog';
import BrandLogo from '../site/BrandLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container mx-auto px-4 pb-8 sm:px-6 lg:px-8 lg:pb-10">
      <div className="overflow-hidden rounded-[36px] border border-[#d8cbbb] bg-[#231c18] text-white shadow-[0_26px_90px_-34px_rgba(21,15,10,0.55)]">
        <div className="grid gap-10 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-14">
          <div className="space-y-6">
            <div className="inline-flex rounded-[24px] border border-white/10 bg-white px-4 py-3 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.38)]">
              <BrandLogo className="h-auto w-[170px]" />
            </div>
            <div className="space-y-4">
              <h2 className="max-w-xl font-heading text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                Crafted surfaces for modern interiors that want to feel lasting,
                tactile, and elevated.
              </h2>
              <p className="max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                Explore premium laminates, ASA laminates, glossy acrylic
                sheets, PVC panels, and WPC boards curated for kitchens,
                wardrobes, wall systems, and bespoke furniture.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-white/80"
            >
              Start your inquiry
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="space-y-5">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
                Collections
              </p>
              <div className="grid gap-3">
                {categories.map((category) => (
                  <Link
                    key={category.title}
                    href={category.href}
                    className="text-sm text-white/72 transition hover:text-white"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
              Contact
            </p>
            <div className="grid gap-4 text-sm text-white/72">
              <Link href="tel:+919427908150" className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4" />
                <span>+91 94279 08150</span>
              </Link>
              <Link
                href="mailto:Redecorindia206@gmail.com"
                className="flex items-start gap-3 break-all"
              >
                <Mail className="mt-0.5 size-4" />
                <span>Redecorindia206@gmail.com</span>
              </Link>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4" />
                <span>Robel House, Sarkhej, Ahmedabad, Gujarat</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="https://facebook.com/robel.india.2025"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Robel India on Facebook (opens in a new tab)"
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Facebook className="size-4" aria-hidden="true" />
                Facebook
              </Link>
              <Link
                href="https://www.instagram.com/robel_india?igsh=MW1zcGZzODJsYmljdQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Robel India on Instagram (opens in a new tab)"
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Instagram className="size-4" aria-hidden="true" />
                Instagram
              </Link>
              <Link
                href="https://wa.me/919427908150?text=Hello%20Robel%20Laminates,%20%0A%0AI%E2%80%99m%20interested%20in%20your%20laminate%20/%20acrylic%20sheet%20products.%20%0A%0APlease%20share%20details,%20catalog,%20and%20pricing."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Robel India on WhatsApp (opens in a new tab)"
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <WhatsAppIcon className="size-4" />
                WhatsApp
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-5 py-4 text-sm text-white/50 sm:px-8 lg:px-12">
          @{currentYear} Robel. All rights reserved. Developed By - Charul Patel
        </div>
      </div>
    </footer>
  );
};

function WhatsAppIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.3 11.8a8.3 8.3 0 0 1-12.2 7.3L3 20.3l1.3-4.9a8.3 8.3 0 1 1 16-3.6Z" />
      <path d="M8.2 8.1c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .5.4l.7 1.6c.1.3.1.4-.1.6l-.5.6c-.2.2-.2.4 0 .6.6 1 1.5 1.8 2.5 2.3.3.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.3.6-.1.5-.4 1.1-.9 1.4-.4.3-1 .5-1.6.3-1-.2-2.2-.7-3.5-1.9-1-.9-1.7-2-2-3.1-.2-.7 0-1.3.3-1.8Z" />
    </svg>
  );
}

export default Footer;
