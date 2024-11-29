import React from "react";
import PartnershipsTable from "./components/partnerships-table";

const Page = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-semibold">Partnership</h1>
      <PartnershipsTable />
    </div>
  );
};

export default Page;
