"use client";

import { Button } from "@/app/_components/button";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export const ProductDetail = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<ProductCardProps | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getProductData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/product/${productId}`);

      const { status, ok } = response;

      if (!ok) throw "Error getting product data: " + status;

      const data: ProductCardProps = await response.json();

      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    getProductData();
  }, [getProductData]);

  if (isLoading) return <p>Loading product detail...</p>;

  if (!isLoading && product) {

    const handlePrevious = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    };

    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    };
		
    return (
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[1000px] mt-8 mb-10 space-y-4">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex space-x-8">
              <div>
                <p className="font-bold text-sm">Unit Type</p>
                <p>{product.unitType.name}</p>
              </div>
              <div>
                <p className="font-bold text-sm">Design Style</p>
                <p>{product.designStyle.name}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="primary">Inquire</Button>
            </div>
          </div>
          <div>
            <p className="font-bold text-sm">About The Design</p>
            <p>{product.description}</p>
          </div>
          <div className="flex mt-8 w-full h-min justify-center">
            <Image
              src={product.images[currentIndex].path}
              alt="American Classic"
              className="object-cover"
              width={1920}
              height={1080}
            />
          </div>
          <div className="flex justify-between w-full mt-4">
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
      </div>
    );
  }
};
