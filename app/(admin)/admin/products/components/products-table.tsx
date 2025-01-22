"use client";

import Image from "next/image";
import { UpdateModal } from "./update-modal";
import { useData } from "../context";

const ProductsTable: React.FC = () => {
  const { products, isLoading } = useData();

  return (
    <div className="w-full mx-auto mt-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-primary text-white border-b">
            <tr>
              <th className="p-3 font-medium text-left hidden md:table-cell">
                Image
              </th>
              <th className="p-3 font-medium text-left">Name</th>
              <th className="p-3 font-medium text-left hidden md:table-cell">
                Design Style
              </th>
              <th className="p-3 font-medium text-left hidden lg:table-cell">
                Unit Type
              </th>
              <th className="p-3 font-medium text-left">Price</th>
              <th className="p-3 font-medium text-left">Description</th>
              <th className="p-3 font-medium text-left">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {products[0] ? (
              products.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  {/* Image Column - Hidden on small screens */}
                  <td className="p-3">
                    {item.images ? (
                      <Image
                        src={item.images[0].path}
                        alt={item.name + " image"}
                        width={100}
                        height={100}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 text-gray-300" />
                    )}
                  </td>

                  {/* Name Column */}
                  <td className="p-3 font-medium text-gray-900">{item.name}</td>

                  {/* Design Style Column - Hidden on small screens */}
                  <td className="p-3 text-gray-600 hidden md:table-cell">
                    {item.designStyle.name}
                  </td>

                  {/* Unit Type Column - Hidden on larger small screens */}
                  <td className="p-3 text-gray-600 hidden lg:table-cell">
                    {item.unitType.name}
                  </td>

                  <td className="p-3 text-gray-600">{item.price}</td>

                  {/* Description Column */}
                  <td className="p-3 text-gray-500 text-sm w-60">
                    <p className="line-clamp-2">{item.description}</p>
                  </td>
                  <td className="p-3 text-gray-500 text-sm">
                    <UpdateModal product={item} />
                  </td>
                </tr>
              ))
            ) : isLoading && !products ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center items-center text-gray-600"
                >
                  Loading products...
                </td>
              </tr>
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center items-center text-gray-600"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
