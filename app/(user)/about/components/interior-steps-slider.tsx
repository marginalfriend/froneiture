"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Step {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Consultation",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed metus malesuada, dapibus sem ac, bibendum tortor. Pellentesque augue est, efficitur lobortis ultricies id, consectetur vel erat. Nullam id erat diam.",
    imageSrc: "/steps-1.png",
  },
  {
    id: 2,
    title: "Survey & Design",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed metus malesuada, dapibus sem ac, bibendum tortor. Pellentesque augue est, efficitur lobortis ultricies id, consectetur vel erat. Nullam id erat diam.",
    imageSrc: "/steps-2.png",
  },
  // Add more steps as needed
];

const InteriorStepsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % steps.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <div className="w-full mx-auto md:px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Simple Steps For Your New Interior
      </h2>

      <div className="relative h-min">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-brown-600 hover:bg-brown-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
          aria-label="Previous slide"
					title="Steps previous slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="black"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-brown-600 hover:bg-brown-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
          aria-label="Next slide"
					title="Steps next slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="black"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Slides Container */}
        <div className="overflow-hidden w-[100%] md:w-[75%] h-[388px] md:h-[500px]">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {steps.map((step) => (
              <div key={step.id} className="w-full md:w-[50%] flex-shrink-0 px-4 md:px-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="relative aspect-[3/2] w-full">
                    <Image
                      src={step.imageSrc}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute bottom-4 right-4 w-12 h-12 bg-brown-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                      {step.id}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-brown-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteriorStepsSlider;
