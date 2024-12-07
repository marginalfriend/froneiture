import React from "react";
import InquiriesTable from "./components/inquiries-table";

const Page = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-semibold">Inquiry</h1>
      <InquiriesTable />
    </div>
  );
};

export default Page;
