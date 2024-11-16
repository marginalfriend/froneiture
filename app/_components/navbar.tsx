"use client";

import Image from "next/image";
import MobileNav from "./mobile-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-screen  flex justify-between px-4 py-2 md:px-6 md:py-1 gap-10 z-50 bg-white">
      <div className="flex items-center align-middle w-[20%]">
        <Image src="/logo.png" alt="froneiture-logo" width={40} height={40} />
        <h1 className="text-xl font-semibold">FroNeiture</h1>
      </div>

      <nav className="w-[60%] h-full hidden md:flex align-middle my-auto">
        <ul className="inline-flex justify-between w-full font-medium	text-sm">
          <li>
            <Link
              className={` hover:text-gray-900 ${
                isActive("/") ? "text-primary" : "text-gray-500"
              } font-medium`}
              href={"/"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={` hover:text-gray-900 ${
                isActive("/products") ? "text-primary" : "text-gray-500"
              } font-medium`}
              href={"/products"}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              className={` hover:text-gray-900 ${
                isActive("/about") ? "text-primary" : "text-gray-500"
              } font-medium`}
              href={"/about"}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={` hover:text-gray-900 ${
                isActive("/contact") ? "text-primary" : "text-gray-500"
              } font-medium`}
              href={"/contact"}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              className={` hover:text-gray-900 ${
                isActive("/order") ? "text-primary" : "text-gray-500"
              } font-medium`}
              href={"/order"}
            >
              Order
            </Link>
          </li>
        </ul>
      </nav>

      <div className="hidden md:flex w-[20%] gap-2 justify-end align-middle">
        <div className="flex gap-1 my-auto">
          <Image
            src="/en.png"
            width={24}
            height={24}
            alt="en-US"
            className="w-[24px] h-[24px]"
          />
          <p>EN</p>
        </div>

        <div className="w-[1px] h-[50%] my-auto bg-black" />

        <div className="flex gap-1 my-auto">
          <Image
            src="/id.png"
            width={24}
            height={24}
            alt="id-ID"
            className="w-[24px] h-[24px]"
          />
          <p>ID</p>
        </div>
      </div>

      <MobileNav />
    </header>
  );
};
