"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <button
          onClick={toggleMenu}
          className="inline-flex items-center p-2 rounded-lg text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {!isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
        <div
          className={`absolute top-16 left-0 w-full bg-white shadow-md md:hidden transform transition-transform duration-300 z-30 ${
            isOpen ? "-translate-y-full h-0 overflow-y-hidden" : "translate-y-0"
          }`}
        >
          <ul className="flex flex-col items-center gap-4 py-4">
            <li>
              <Link
                className={` hover:text-gray-900 ${
                  isActive("/") ? "text-primary" : "text-gray-700"
                } font-medium`}
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={` hover:text-gray-900 ${
                  isActive("/products") ? "text-primary" : "text-gray-700"
                } font-medium`}
                href="/products"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                className={` hover:text-gray-900 ${
                  isActive("/about") ? "text-primary" : "text-gray-700"
                } font-medium`}
                href="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className={` hover:text-gray-900 ${
                  isActive("/contact") ? "text-primary" : "text-gray-700"
                } font-medium`}
                href="/contact"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                className={` hover:text-gray-900 ${
                  isActive("/order") ? "text-primary" : "text-gray-700"
                } font-medium`}
                href="/order"
              >
                Order
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
