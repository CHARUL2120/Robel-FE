'use client';
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Contact = () => {
  return (
    <div id='contact-details'>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 lg:gap-y-0 lg:gap-x-4 h-full">
        <div className="p-10 bg-[#F3F3F3] rounded-[20px] w-full">
          <div>
            <Image
              src="/assets/images/the_seasons_of_colors.png"
              alt="Logo"
              width={1000}
              height={1000}
              className="object-contain"
            />
          </div>
        </div>
        <div className="col-span-2 h-full p-10 bg-[#F3F3F3] rounded-[20px]">
          <div className="h-full flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-4xl font-bold italic">ROBEL</h2>
            </div>
            <div className="flex flex-col gap-10 lg:gap-6 justify-between h-full">
              <div className="space-y-5 text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-primary">
                    <Phone />
                  </span>
                  <span className="font-urbanist font-light text-base lg:text-xl text-[#252525]">
                    +91 94279 08150 (Jigar Patel)
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary">
                    <Mail />
                  </span>
                  <span className="font-urbanist font-light text-base lg:text-xl text-[#252525]">
                    jigarNpatel206@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary">
                    <MapPin />
                  </span>
                  <span className="font-urbanist font-light text-base lg:text-xl text-[#252525]">
                    Robel House, Sarkhej, Ahmedabad, Gujrat
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-10 text-base lg:text-xl font-normal font-urbanist text-[#252525]">
                {/* <Link href="/about" className="hover:underline">
                  About
                </Link>
                <Link href="/products" className="hover:underline">
                  Products
                </Link>
                <Link href="/gallery" className="hover:underline">
                  Gallery
                </Link>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link> */}
                <Link
                  href="/assets/Robel-Company-Profile.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
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
