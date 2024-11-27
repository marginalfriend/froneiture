import Image from "next/image";
import MobileNav from "./mobile-nav";
import { UserNavlinks } from "./user-navlinks";

export const Navbar = () => {

  return (
    <header className="w-full  flex justify-between px-4 py-2 md:px-6 md:py-3 gap-10 z-50 bg-white">
      <div className="flex items-center align-middle w-[20%]">
        <Image src="/logo.png" alt="froneiture-logo" width={40} height={40} />
        <h1 className="text-xl font-semibold">FroNeiture</h1>
      </div>

			<UserNavlinks />

			<div className="w-[20%]"></div>

      <MobileNav />
    </header>
  );
};
