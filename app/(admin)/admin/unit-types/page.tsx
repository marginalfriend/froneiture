import React from "react";
import { CreateModal } from "./components/create-modal";
import { UnitTypesDataProvider } from "./context";
import { UnitTypesTable } from "./components/unit-types-table";

const page = () => {
  return (
    <UnitTypesDataProvider>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">Unit Types</h1>
          <CreateModal />
        </div>
        <UnitTypesTable />
      </div>
    </UnitTypesDataProvider>
  );
};

export default page;
