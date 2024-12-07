import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <div className="relative w-full h-[442px]">
        <div className="absolute inset-0 overflow-x-hidden">
          <Image
            src="/hero.png"
            fill
            priority
            alt="Hero image"
            className="object-cover brightness-75"
          />
        </div>
        <div className="relative h-[442px] flex flex-col items-center justify-center text-center px-4 overflow-x-hidden">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Designing Better Lives
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl">
            “We believe wherever you live, you deserve a comfortable home”
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-10 gap-10 overflow-x-hidden px-6">
        <div>
          <div className="flex flex-col align-middle justify-center col-span-1">
            <Image
              src="/logo.png"
              alt="froneiture-logo"
              width={72}
              height={72}
              className="mx-auto"
            />
            <h1 className="text-xl font-semibold text-center">FroNeiture</h1>
          </div>
        </div>

        <div className="space-y-4 col-span-1">
          <h1 className="text-xl font-bold">Home</h1>
          <ul className="space-y-1 text-gray-500">
            <li>
              <Link href={"/products"}>Products</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
            <li>
              <Link href={"/partnership"}>Partnership</Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4 col-span-1">
          <h1 className="text-xl font-bold">Contact Us</h1>
          <p className="text-gray-500">P : +62182371291292</p>
          <div>
            <h3 className="font-medium">FroNeiture Headquarter</h3>
            <p className="text-gray-500">
              World Capital Tower, Jl. Mega Kuningan Barat, 11th Floor, Jakarta
              Selatan, 12950
            </p>
          </div>
        </div>

        <div className="space-y-4 col-span-1">
          <h1 className="text-xl font-bold">Social</h1>
          <ul className="space-y-1 text-gray-500">
            <li>Instagram</li>
            <li>Facebook</li>
            <li>WhatsApp</li>
            <li>LinkedIn</li>
            <li>YouTube</li>
            <li>Tiktok</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
