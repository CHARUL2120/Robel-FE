'use client';
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import BrandLogo from '../site/BrandLogo';

const Contact = () => {
  return (
    <div id="contact-details">
      <div className="grid h-full grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="w-full rounded-[24px] bg-[#F3F3F3] p-6 sm:p-8 lg:p-10">
          <div>
            <Image
              src="/assets/images/the_seasons_of_colors.png"
              alt="Logo"
              width={1000}
              height={1000}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
        <div className="col-span-1 h-full rounded-[24px] bg-[#F3F3F3] p-6 sm:p-8 lg:col-span-2 lg:p-10">
          <div className="flex h-full flex-col justify-between">
            <div className="pb-6">
              <BrandLogo className="h-auto w-[170px]" />
            </div>
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="space-y-5 text-sm">
                <Link
                  href="tel:+919427908150"
                  className="flex items-start gap-4 transition hover:text-primary"
                >
                  <span className="text-primary">
                    <Phone />
                  </span>
                  <span className="font-urbanist text-base font-light text-[#252525] sm:text-lg lg:text-xl">
                    +91 94279 08150 (Jigar Patel)
                  </span>
                </Link>
                <Link
                  href="mailto:Redecorindia206@gmail.com"
                  className="flex items-start gap-4 transition hover:text-primary"
                >
                  <span className="text-primary">
                    <Mail />
                  </span>
                  <span className="break-all font-urbanist text-base font-light text-[#252525] sm:text-lg lg:text-xl">
                    Redecorindia206@gmail.com
                  </span>
                </Link>
                <div className="flex items-start gap-4">
                  <span className="text-primary">
                    <MapPin />
                  </span>
                  <span className="font-urbanist text-base font-light text-[#252525] sm:text-lg lg:text-xl">
                    Robel House, Sarkhej, Ahmedabad, Gujrat
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 font-urbanist text-base font-normal text-[#252525] sm:text-lg lg:text-xl">
                <Link
                  href="/assets/Robel-Company-Profile.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 transition hover:text-primary hover:underline"
                >
                  Download brochure
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
