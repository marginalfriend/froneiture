"use client";

import { useCallback, useEffect, useState } from "react";
import ProductCard from "./product-card";

export const ProductsTable = () => {
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<ResponseMeta>();
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [error, setError] = useState(false);

  const limit = 20;

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`/api/product?page=${page}&limit=${limit}`);

      if (!response.ok) return setError(true);

      const { data, meta: responseMeta }: GetAllProductsResponse =
        await response.json();

      setProducts(data);
      setMeta(responseMeta);
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-20">
      {products.map((props, index) => (
        <ProductCard {...props} key={index} />
      ))}
    </div>
  );
};
