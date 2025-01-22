"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface Filter {
  styleId: number;
  typeId: number;
}

export interface FilterContextType {
  filter: Filter;
  handleFilter: (filter: "styleId" | "typeId", id: number) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const FilterContextProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<Filter>({
    styleId: 0,
    typeId: 0,
  });

  const handleFilter = (filter: "styleId" | "typeId", id: number) => {
    console.log(id);
    setFilter((prev) => ({ ...prev, [filter]: id }));
  };

  const value = { filter, handleFilter };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

const useFilter = () => {
  const filter = useContext(FilterContext);

  if (!filter)
    throw "useFilter must be used inside a children component of FilterContextProvider";

  return filter;
};

export { FilterContext, FilterContextProvider, useFilter };
