"use client";

import React from "react";
import { useData } from "../context";
import { UpdateModal } from "./update-modal";

export const DesignStylesTable = () => {
  const { designStyles = [] } = useData();

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
            {designStyles.map((type) => (
              <tr
                key={type.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="text-left p-3">{type.name}</td>
                <td className="text-right p-3">
                  <UpdateModal unitType={type} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
