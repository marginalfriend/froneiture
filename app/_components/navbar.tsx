"use client";

import Image from "next/image";
import MobileNav from "./mobile-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { ShoppingBag } from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full  flex justify-between px-4 py-2 md:px-6 md:py-3 gap-10 z-50 bg-white">
      <div className="flex items-center align-middle w-[20%]">
        <Image src="/logo.png" alt="froneiture-logo" width={40} height={40} />
        <h1 className="text-xl font-semibold">FroNeiture</h1>
      </div>

      <nav className="w-[60%] h-full hidden md:flex align-middle my-auto">
        <ul className="inline-flex justify-between w-full font-medium	text-sm">
          <li>
            <Link
              className={` hover:text-gray-900 ${
                isActive("/") ? "text-primary" : "text-black"
              } font-medium`}
              href={"/"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={` hover:text-gray-900 ${
                isActive("/products") ? "text-primary" : "text-black"
              } font-medium`}
              href={"/products"}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              className={` hover:text-gray-900 ${
                isActive("/about") ? "text-primary" : "text-black"
              } font-medium`}
              href={"/about"}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={` hover:text-gray-900 ${
                isActive("/contact") ? "text-primary" : "text-black"
              } font-medium`}
              href={"/contact"}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              className={` hover:text-gray-900 ${
                isActive("/order") ? "text-primary" : "text-black"
              } font-medium`}
              href={"/order"}
            >
              Order
            </Link>
          </li>
        </ul>
      </nav>

      <div className="hidden md:flex w-[20%] px-4 justify-around items-center">
        <Button variant="ghost" className="w-min h-min px-2 py-2">
          <ShoppingBag />
        </Button>

        <Button variant="primary">Login</Button>
      </div>

      <MobileNav />
    </header>
  );
};
