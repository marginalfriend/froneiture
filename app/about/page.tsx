import Image from "next/image";
import React from "react";
import { Button } from "../_components/button";
import InteriorStepsSlider from "./components/interior-steps-slider";

const Page = () => {
  return (
    <main className="w-full space-y-4 p-4 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 space-y-8">
          <h1 className="text-5xl font-bold">Interior Design & Build</h1>
          <p>
            FroNeiture menyediakan layanan Desain Interior dan Konstruksi yang
            ditujukan untuk Konsumen Akhir dan Pengembang Real Estat di sektor
            perumahan di wilayah Jabodetabek.
          </p>
          <Button variant="primary">Contact Us</Button>
        </div>

        <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row w-full gap-6">
          <StatCard
            imageSrc="/about-1.png"
            number="1000+"
            text="Interior Projects Done"
          />
          <StatCard
            imageSrc="/about-2.png"
            number="25000+"
            text="Sq.m Constructed"
          />
          <StatCard
            imageSrc="/about-3.png"
            number="9+"
            text="B2B Projects Deal"
          />
        </div>
      </div>
      <InteriorStepsSlider />
    </main>
  );
};

export default Page;

interface StatCardProps {
  number: string;
  text: string;
  imageSrc: string;
}

const StatCard = ({ number, text, imageSrc }: StatCardProps) => (
  <div className="relative w-[246px] md:w-[264px] aspect-[13/20] rounded-3xl overflow-hidden group">
    {/* Background Image */}
    <Image
      src={imageSrc}
      alt={text}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />

    {/* Content Overlay */}
    <div className="relative z-10 h-full p-6 flex flex-col items-start justify-end bg-gradient-to-t from-black/50 to-transparent">
      <h3 className="text-4xl font-bold text-white mb-2">{number}</h3>
      <p className="text-white/90 text-sm">{text}</p>
    </div>
  </div>
);
