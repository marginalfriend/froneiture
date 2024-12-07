"use client";

import Select from "@/app/_components/select";
import React, { useEffect, useState } from "react";

export const Filter = () => {
  const [designStyles, setDesignStyles] = useState([]);
  const [unitType, setUnitType] = useState([]);

  const fetchData = async () => {
    try {
      const designRes = await fetch("/api/unit/design-style");

      const { data: designs } = await designRes.json();

      setDesignStyles(designs);

      const unitTypeRes = await fetch("/api/unit/type");

      const { data: types } = await unitTypeRes.json();

      setUnitType(types);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col align-middle items-center md:flex-row justify-center gap-4">
      <Select
        name={"Design Styles"}
        placeholder="Design Styles"
        options={designStyles}
      />
      <Select name={"Unit Type"} placeholder="Unit Type" options={unitType} />
    </div>
  );
};
