import React from "react";
import Select from "../../_components/select";
import ProductCard from "./components/product-card";

const Products = () => {
  const cities = [
    { value: "jakarta", label: "Jakarta" },
    { value: "bandung", label: "Bandung" },
    { value: "bali", label: "Bali" },
    { value: "malang", label: "Malang" },
  ];

  const designStyles = [
    { value: "american-classic", label: "American Classic" },
    { value: "brutalism", label: "Brutalism" },
    { value: "modern-classic", label: "Modern Classic" },
    { value: "medieval", label: "Medieval" },
  ];

  const products = [
    {
      title: "American Classic",
      location: "South Jakarta",
      imageUrl: "/product-1.png",
    },
    {
      title: "Newton 2 Mid Century",
      location: "Kuningan",
      imageUrl: "/product-2.png",
    },
    { title: "Newton 2 Studio", location: "Kuningan", imageUrl: "/product-3.png" },
  ];

  return (
    <main className="w-full my-10">
      <div className="space-y-10 px-4">
        <h1 className="md:text-center text-2xl md:text-5xl font-extralight">
          Welcome to Our Product Collection:
          <br />
          <span className="font-extrabold">
            Where Innovation Meets Quality!
          </span>
        </h1>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Select
            name={"Design Styles"}
            placeholder="Design Styles"
            options={designStyles}
          />
          <Select name={"Cities"} placeholder="Cities" options={cities} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-20">
          {products.map((props, index) => (
            <ProductCard {...props} key={index} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Products;
