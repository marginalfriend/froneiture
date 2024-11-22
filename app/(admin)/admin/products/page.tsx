import React from "react";
import { CreateModal } from "./components/create-modal";

const Page = () => {
  return (
    <div className="flex justify-between">
      <h1 className="text-3xl font-semibold">Products</h1>
      <CreateModal />
    </div>
  );
};

export default Page;
