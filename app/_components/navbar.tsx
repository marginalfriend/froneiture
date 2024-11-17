import Image from "next/image";
import MobileNav from "./mobile-nav";
import { Button } from "./button";
import { ShoppingBag } from "lucide-react";
import { UserNavlinks } from "./user-navlinks";

export const Navbar = () => {

  return (
    <header className="w-full  flex justify-between px-4 py-2 md:px-6 md:py-3 gap-10 z-50 bg-white">
      <div className="flex items-center align-middle w-[20%]">
        <Image src="/logo.png" alt="froneiture-logo" width={40} height={40} />
        <h1 className="text-xl font-semibold">FroNeiture</h1>
      </div>

			<UserNavlinks />

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
