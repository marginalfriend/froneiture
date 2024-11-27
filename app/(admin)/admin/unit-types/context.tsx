"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface UnitTypeDataContextType {
  trigger: () => void;
  isLoading: boolean;
  unitTypes: { id: number; name: string }[];
}

const UnitTypesDataContext = createContext<UnitTypeDataContextType | undefined>(
  undefined
);

import React from "react";

function UnitTypesDataProvider({ children }: { children: ReactNode }) {
  const [triggerCount, setTriggerCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [unitTypes, setUnitTypes] = useState<{ id: number; name: string }[]>(
    []
  );

  const fetchTypes = useCallback(async () => {
    setIsLoading(true);

    try {
      const unitTypeRes = await fetch("/api/unit/type");

      const { data: types } = await unitTypeRes.json();

      setUnitTypes(types);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [triggerCount]);

  const trigger = () => setTriggerCount((count) => count + 1);

  const value = { trigger, isLoading, unitTypes };

  useEffect(() => {
    fetchTypes();
  }, [triggerCount]);

  return (
    <UnitTypesDataContext.Provider value={value}>
      {children}
    </UnitTypesDataContext.Provider>
  );
}

export { UnitTypesDataContext, UnitTypesDataProvider };

export const useData = () => {
  const data = useContext(UnitTypesDataContext);
  if (!data) throw "useData must be used inside ProductsDataProvider";
  return data;
};
