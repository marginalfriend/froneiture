"use client";

import { Inquiry } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { Status } from "./status";

export interface InquiryData extends Inquiry {
  product: {
    id: string;
    name: string;
  };
  status: "PENDING" | "PAID";
}

const InquiriesTable: React.FC = () => {
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("/api/inquiry");

      const { status, ok } = response;

      if (!ok) throw "Failed to get partnerships data: " + status;

      const { data } = await response.json();

      setInquiries(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="w-full mx-auto mt-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-primary text-white border-b">
            <tr>
              <th className="p-3 font-medium text-left">Name</th>
              <th className="p-3 font-medium text-left">Email</th>
              <th className="p-3 font-medium text-left">Phone</th>
              <th className="p-3 font-medium text-left">Product</th>
              <th className="p-3 font-medium text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {inquiries[0] ? (
              inquiries.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 text-gray-600">{item.name}</td>

                  <td className="p-3 text-gray-600">{item.email}</td>

                  <td className="p-3 text-gray-600">{item.phoneNumber}</td>

                  <td className="p-3 text-gray-600">
                    {item.product.name}
                  </td>

                  <td className="p-3 text-gray-600">
                    <Status inquiry={item} refetch={fetchData}/>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center items-center text-gray-600"
                >
                  No partnerships found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiriesTable;
