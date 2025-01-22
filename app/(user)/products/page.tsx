import React from "react";
import { Filter } from "./components/filter";
import { ProductsTable } from "./components/products-table";
import { FilterContextProvider } from "./context";

const Page = () => {
  return (
    <main className="w-full my-10">
      <div className="space-y-10 px-4">
        <h1 className="md:text-center text-2xl md:text-5xl font-extralight">
          Welcome to Our Product Collection:
          <br />
          <span className="font-extrabold">
            Where Innovation Meets Quality!
          </span>
        </h1>
        <FilterContextProvider>
          <Filter />
          <ProductsTable />
        </FilterContextProvider>
      </div>
    </main>
  );
};

export default Page;
