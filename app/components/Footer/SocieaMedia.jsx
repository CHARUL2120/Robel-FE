import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const SocieaMedia = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full rounded-[24px] border bg-primary px-5 py-5 sm:rounded-full sm:px-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-urbanist text-sm font-normal text-white sm:text-base lg:text-[22px]">
          @{currentYear} Robel. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="https://facebook.com/robel.india.2025"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Robel on Facebook"
            className="rounded-full p-2 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Facebook color="white" size={26} />
          </Link>
          <Link
            href="https://www.instagram.com/robel_india?igsh=MW1zcGZzODJsYmljdQ=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Robel on Instagram"
            className="rounded-full p-2 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Instagram color="white" size={26} />
          </Link>
          <Link
            href="https://wa.me/919427908150?text=Hello%20Robel%20Laminates,%20%0A%0AI%E2%80%99m%20interested%20in%20your%20laminate%20/%20acrylic%20sheet%20products.%20%0A%0APlease%20share%20details,%20catalog,%20and%20pricing."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Robel on WhatsApp"
            className="rounded-full p-2 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MessageCircle color="white" size={26} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SocieaMedia;
