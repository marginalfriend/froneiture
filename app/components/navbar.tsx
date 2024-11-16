import Image from "next/image";

export const Navbar = () => {
  return (
    <header className="w-screen  flex justify-between px-6 py-4 gap-10">
      <div className="flex items-center align-middle w-[20%]">
        <Image src="/logo.png" alt="froneiture-logo" width={40} height={40} />
        <h1 className="text-xl font-semibold">FroNeiture</h1>
      </div>

      <nav className="w-[60%] h-full flex align-middle my-auto">
        <ul className="inline-flex justify-between w-full font-medium	text-sm">
          <li>Home</li>
          <li>Products</li>
          <li>Contact Us</li>
          <li>Order</li>
        </ul>
      </nav>

      <div className="flex w-[20%] gap-2 justify-end align-middle">
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

        <div className="w-[1px] h-full bg-black" />

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
    </header>
  );
};
