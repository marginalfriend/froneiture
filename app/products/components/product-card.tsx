// components/ProductCard.tsx
import { Button } from "@/app/_components/button";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  title: string;
  location: string;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  location,
  imageUrl,
}) => {
  return (
    <div className="border border-gray-300 rounded-3xl overflow-hidden shadow-md bg-white">
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden rounded-3xl">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover w-full h-full"
        />
      </div>
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{location}</p>
        {/* Button */}
        <div className="mt-4 flex justify-start">
          <Button variant="primary">Detail</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
