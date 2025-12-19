'use client';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from "next/image";

export default function Header() {
  return (
    <header className="max-w-[1200px] mx-auto rounded-full mt-5 bg-[#F5F5F5] flex h-16 w-full shrink-0 items-center px-4 md:px-14">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-2 px-3 py-6">
            {/* <Link
              href="#"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              About
            </Link> */}
            <Link
              href="#services"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              Product
            </Link>
            <Link
              href="#contact-details"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Link
        href="#"
        className="hidden text-3xl font-bold italic lg:flex"
        prefetch={false}
      >
        {/*<MountainIcon className="h-6 w-6" />*/}
        <Image src="/assets/svg/logo.svg" alt="Logo" width={120} height={120} />
        {/*<span className="sr-only">Acme Inc</span>*/}
      </Link>
      <nav className="ml-auto hidden gap-6 lg:flex">
        {/* <Link
          href="/"
          className="group transition delay-150 duration-300 ease-in-out hover:text-primary data-[active]:text-primary data-[state=open]:text-primary inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 font-sans text-sm text-[28px] font-normal focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Home
        </Link>
        <Link
          className="group transition delay-150 duration-300 ease-in-out hover:text-primary data-[active]:text-primary data-[state=open]:text-primary inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 font-sans text-sm text-[28px] font-normal focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          href="#"
          prefetch={false}
        >
          About
        </Link> */}
        <Link
          className="group transition delay-150 duration-300 ease-in-out hover:text-primary data-[active]:text-primary data-[state=open]:text-primary inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 font-sans text-sm text-[28px] font-normal focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          href="#services"
          prefetch={false}
        >
          Services
        </Link>
        <Link
          className="group transition delay-150 duration-300 ease-in-out hover:text-primary data-[active]:text-primary data-[state=open]:text-primary inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 font-sans text-sm text-[28px] font-normal focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          href="#contact-details"
          prefetch={false}
        >
          Contact
        </Link>
      </nav>
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

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
