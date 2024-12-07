"use client";

import React from "react";
import { useData } from "../context";
import { UpdateModal } from "./update-modal";

export const UnitTypesTable = () => {
  const { unitTypes = [] } = useData();

  return (
    <div className="w-full mx-auto mt-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-primary text-white border-b">
            <tr>
              <th className="p-3 font-medium text-left">Name</th>
              <th className="p-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {unitTypes[0] ? (
              unitTypes.map((type) => (
                <tr
                  key={type.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="text-left p-3">{type.name}</td>
                  <td className="text-right p-3">
                    <UpdateModal unitType={type} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="py-10 text-center items-center text-gray-600"
                >
                  No unit types found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
