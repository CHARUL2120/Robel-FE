import { Facebook, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const SocieaMedia = () => {
  return (
    <div>
      <div className="w-full border bg-primary py-5.5 px-7.5 rounded-full">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="font-urbanist text-base lg:text-[22px] font-normal text-white">
            @2025 robel. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href={
                'https://www.instagram.com/robel_india?igsh=MW1zcGZzODJsYmljdQ=='
              }
              target="_blank"
            >
              <Facebook color="white" size={32} />
            </Link>
            <Link
              href={
                'https://www.instagram.com/robel_india?igsh=MW1zcGZzODJsYmljdQ=='
              }
              target="_blank"
            >
              <Youtube color="white" size={32} />
            </Link>
            <Link
              href={
                'https://www.instagram.com/robel_india?igsh=MW1zcGZzODJsYmljdQ=='
              }
              target="_blank"
            >
              <Instagram color="white" size={32} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocieaMedia;
