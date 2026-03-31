import Link from 'next/link';
import { ArrowUpRight, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
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
            <Link
              href="https://www.instagram.com/robel_india?igsh=MW1zcGZzODJsYmljdQ=="
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <Instagram className="size-4" />
              Follow on Instagram
            </Link>
            <Link
              href="https://wa.me/919427908150?text=Hello%20Robel%20Laminates,%20%0A%0AI%E2%80%99m%20interested%20in%20your%20laminate%20/%20acrylic%20sheet%20products.%20%0A%0APlease%20share%20details,%20catalog,%20and%20pricing."
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <MessageCircle className="size-4" />
              Chat on WhatsApp
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 px-5 py-4 text-sm text-white/50 sm:px-8 lg:px-12">
          @{currentYear} Robel. All rights reserved. Developed By - Charul Patel
        </div>
      </div>
    </footer>
  );
};

export default Footer;
