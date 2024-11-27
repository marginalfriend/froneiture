import React from "react";
import { CreateModal } from "./components/create-modal";
import ProductsTable from "./components/products-table";

const Page = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Products</h1>
        <CreateModal />
      </div>
      <ProductsTable />
    </div>
  );
};

export default Page;
