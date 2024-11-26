"use client";

import Select from "@/app/_components/select";
import React, { useEffect, useState } from "react";

export const Filter = () => {
  const [designStyles, setDesignStyles] = useState([]);
  const [cities, setCities] = useState([]);

  const fetchData = async () => {
    try {
      const designRes = await fetch("/api/unit/design-style");

      const { data: designs } = await designRes.json();

      setDesignStyles(designs);

      const locationRes = await fetch("/api/unit/location");

      const { data: locations } = await locationRes.json();

      setCities(locations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center gap-4">
      <Select
        name={"Design Styles"}
        placeholder="Design Styles"
        options={designStyles}
      />
      <Select name={"Cities"} placeholder="Cities" options={cities} />
    </div>
  );
};
