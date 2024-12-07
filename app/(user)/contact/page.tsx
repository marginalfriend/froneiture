import React from "react";
import Image from "next/image";
import { Button } from "../../_components/button";

const Page = () => {
  return (
    <main className="w-full">
      <div className="relative w-full h-[442px]">
        <div className="absolute inset-0 overflow-x-hidden">
          <Image
            src="/hero-contact.png"
            fill
            priority
            alt="Hero image"
            className="object-cover brightness-75"
          />
        </div>
        <div className="relative h-[442px] flex flex-col items-center justify-center text-center px-4 overflow-x-hidden">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Contact Us Today!
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl">
            We believe wherever you live, you deserve a comfortable home
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 px-32 gap-10 py-12">
        <div className="border-2 border-primary rounded-2xl text-center space-y-4 px-6 py-8">
          <h1 className="font-semibold text-xl">Interior Consultation</h1>
          <p>
            Schedule a free consultation with our interior experts to bring your
            dream space to life.
          </p>
          <Button className="font-medium">Chat Sales Consultant</Button>
        </div>
        <div className="border-2 border-primary rounded-2xl text-center space-y-4 px-6 py-8">
          <h1 className="font-semibold text-xl">Customer Support</h1>
          <p>
            Reach out to our support team for project updates and any assistance
            you may need.
          </p>
          <Button className="font-medium">hello@FroNeiture.com</Button>
        </div>
        <div className="border-2 border-primary rounded-2xl text-center space-y-4 px-6 py-8">
          <h1 className="font-semibold text-xl">Partner Support</h1>
          <p>
            Be part of our mission to create stunning interiors through ax``
            meaningful collaboration.
          </p>
          <Button className="font-medium">Partnership Form</Button>
        </div>
      </div>
    </main>
  );
};

export default Page;
