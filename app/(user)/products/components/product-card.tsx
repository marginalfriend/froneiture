// components/ProductCard.tsx
import { Button } from "@/app/_components/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { name, designStyle, images } = props;
  return (
    <div className="border border-gray-300 rounded-3xl overflow-hidden shadow-md bg-white">
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden rounded-3xl">
        <Image
          src={images[0] ? images[0].path : ""}
          alt={name + " image"}
          fill
          className="object-cover w-full h-full"
        />
      </div>
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">{designStyle.name}</p>
        {/* Button */}
        <div className="mt-4 flex justify-start">
          <Link href={`/products/${props.id}`} >
            <Button variant="primary">Detail</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
