"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ProductsDataContextType {
  trigger: () => void;
  products: ProductCardProps[];
  isLoading: boolean;
  unitTypes: { id: string; name: string }[];
  designStyles: { id: string; name: string }[];
}

const ProductsDataContext = createContext<ProductsDataContextType | undefined>(
  undefined
);

import React from "react";

function ProductsDataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [triggerCount, setTriggerCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [designStyles, setDesignStyles] = useState<
    { id: string; name: string }[]
  >([]);
  const [unitTypes, setUnitTypes] = useState<{ id: string; name: string }[]>(
    []
  );

  const fetchTypes = async () => {
    try {
      const designRes = await fetch("/api/unit/design-style");

      const { data: designs } = await designRes.json();

      setDesignStyles(designs);

      const unitTypeRes = await fetch("/api/unit/type");

      const { data: types } = await unitTypeRes.json();

      setUnitTypes(types);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/product");

      const { ok, status } = response;

      if (!ok) throw "Error fetching products: " + status;

      const { data } = await response.json();

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [triggerCount]);

  const trigger = () => setTriggerCount((count) => count + 1);

  const value = { trigger, products, isLoading, unitTypes, designStyles };

  useEffect(() => {
    fetchProducts();
  }, [triggerCount]);

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <ProductsDataContext.Provider value={value}>
      {children}
    </ProductsDataContext.Provider>
  );
}

export { ProductsDataContext, ProductsDataProvider };

export const useData = () => {
  const data = useContext(ProductsDataContext);
  if (!data) throw "useData must be used inside ProductsDataProvider";
  return data;
};
