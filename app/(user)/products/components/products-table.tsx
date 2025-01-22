"use client";

import { useCallback, useEffect, useState } from "react";
import ProductCard from "./product-card";
import { useFilter } from "../context";

export const ProductsTable = () => {
  const { filter } = useFilter();
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [error, setError] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`/api/product`);

      if (!response.ok) return setError(true);

      const { data }: GetAllProductsResponse = await response.json();

      setProducts(data);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-20">
      {products
        .filter((p) => {
          if (filter.typeId === 0) return true;
          return p.unitType.id === filter.typeId;
        })
        .filter((p) => {
          if (filter.styleId === 0) return true;
          return p.designStyle.id === filter.styleId;
        })
        .map((props, index) => (
          <ProductCard {...props} key={index} />
        ))}
      {error && <p>Failed to get products data</p>}
    </div>
  );
};
