import React from "react";
import { CreateModal } from "./components/create-modal";
import { DesignStylesTable } from "./components/design-styles-table";
import { DesignStylesDataProvider } from "./context";

const page = () => {
  return (
    <DesignStylesDataProvider>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">Design Styles</h1>
          <CreateModal />
        </div>
        <DesignStylesTable />
      </div>
    </DesignStylesDataProvider>
  );
};

export default page;
