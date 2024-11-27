"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface DesignStylesDataContextType {
  trigger: () => void;
  isLoading: boolean;
  designStyles: { id: number; name: string }[];
}

const DesignStylesDataContext = createContext<DesignStylesDataContextType | undefined>(
  undefined
);

import React from "react";

function DesignStylesDataProvider({ children }: { children: ReactNode }) {
  const [triggerCount, setTriggerCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [designStyles, setDesignStyles] = useState<{ id: number; name: string }[]>(
    []
  );

  const fetchTypes = useCallback(async () => {
    setIsLoading(true);

    try {
      const designStylesRes = await fetch("/api/unit/design-style");

      const { data: styles } = await designStylesRes.json();

      setDesignStyles(styles);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [triggerCount]);

  const trigger = () => setTriggerCount((count) => count + 1);

  const value = { trigger, isLoading, designStyles };

  useEffect(() => {
    fetchTypes();
  }, [triggerCount]);

  return (
    <DesignStylesDataContext.Provider value={value}>
      {children}
    </DesignStylesDataContext.Provider>
  );
}

export { DesignStylesDataContext, DesignStylesDataProvider };

export const useData = () => {
  const data = useContext(DesignStylesDataContext);
  if (!data) throw "useData must be used inside ProductsDataProvider";
  return data;
};
