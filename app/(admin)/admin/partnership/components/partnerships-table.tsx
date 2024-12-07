"use client";

import { Partnership } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

const PartnershipsTable: React.FC = () => {
  const [partnerShips, setPartnerships] = useState<Partnership[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("/api/partnership");

      const { status, ok } = response;

      if (!ok) throw "Failed to get partnerships data: " + status;

      const { data } = await response.json();

      setPartnerships(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full mx-auto mt-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-primary text-white border-b">
            <tr>
              <th className="p-3 font-medium text-left">Name</th>
              <th className="p-3 font-medium text-left">Email</th>
              <th className="p-3 font-medium text-left">Phone</th>
              <th className="p-3 font-medium text-left">Reference</th>
              <th className="p-3 font-medium text-left">Address</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {partnerShips[0] ? (
              partnerShips.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 font-medium text-gray-900 text-sm">
                    {item.name}
                  </td>

                  <td className="p-3 text-gray-600 text-sm">{item.email}</td>

                  <td className="p-3 text-gray-600 text-sm">
                    {item.phoneNumber}
                  </td>

                  <td className="p-3 text-gray-500 text-sm">
                    {item.reference}
                  </td>

                  <td className="p-3 text-gray-500 text-sm w-80">
                    <p className="line-clamp-3">{item.address}</p>
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

export default PartnershipsTable;
