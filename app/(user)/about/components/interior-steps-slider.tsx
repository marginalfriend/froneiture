"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
      "Schedule a free consultation with our interior design experts to discuss your project, either in person at our office or online. Be sure to prepare your room layout and inspiration references for your dream interior!",
    imageSrc: "/steps-1.png",
  },
  {
    id: 2,
    title: "Survey & Design",
    description:
      "We provide a survey service to capture precise measurements of your building, allowing us to develop an initial design and mood board tailored to your project vision.",
    imageSrc: "/steps-2.png",
  },
  {
    id: 3,
    title: "Production & Installation",
    description:
      "Once you approve the proposed design, production will commence upon a 50% down payment. Installation will begin after the remaining balance has been fully settled.",
    imageSrc: "/steps-2.png",
  },
  {
    id: 4,
    title: "Move In",
    description:
      "Your new interior will be ready for use following production, as scheduled in the agreed timeline.",
    imageSrc: "/steps-2.png",
  },
];

const InteriorStepsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (steps.length / 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + (steps.length / 2)) % (steps.length / 2));
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
        <div className="overflow-hidden w-full h-[388px] md:h-[520px]">
          <div
            className={cn(
              `flex transition-transform duration-300 ease-in-out w-full w-[${
                steps.length * 100
              }%]`
            )}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {steps.map((step) => (
              <div
                key={step.id}
                className="w-full md:w-[50%] flex flex-col flex-shrink-0 px-4 md:px-8"
              >
                <div
                  className={cn(
                    `bg-white rounded-xl shadow-lg overflow-hidden h-full`
                  )}
                >
                  <div className="relative aspect-[3/2] w-full">
                    <Image
                      src={step.imageSrc}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute bottom-4 right-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold -mb-10">
                      {step.id}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {[1, 2].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-primary" : "bg-gray-300"
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
