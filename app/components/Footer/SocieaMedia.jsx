import { Facebook, Instagram, Youtube } from 'lucide-react';
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
            href="https://www.instagram.com/robel_india?igsh=MW1zcGZzODJsYmljdQ=="
            target="_blank"
            aria-label="Robel on Facebook"
            className="rounded-full p-2 transition hover:bg-white/10"
          >
            <Facebook color="white" size={26} />
          </Link>
          <Link
            href="https://www.instagram.com/robel_india?igsh=MW1zcGZzODJsYmljdQ=="
            target="_blank"
            aria-label="Robel on YouTube"
            className="rounded-full p-2 transition hover:bg-white/10"
          >
            <Youtube color="white" size={26} />
          </Link>
          <Link
            href="https://www.instagram.com/robel_india?igsh=MW1zcGZzODJsYmljdQ=="
            target="_blank"
            aria-label="Robel on Instagram"
            className="rounded-full p-2 transition hover:bg-white/10"
          >
            <Instagram color="white" size={26} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SocieaMedia;
