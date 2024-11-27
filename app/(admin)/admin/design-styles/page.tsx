import React from "react";
import { CreateModal } from "./components/create-modal";

const page = () => {
  return (
    <div className="flex justify-between">
      <h1 className="text-3xl font-semibold">Design Style</h1>
      <CreateModal />
    </div>
  );
};

export default page;
