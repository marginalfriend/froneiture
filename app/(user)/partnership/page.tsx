"use client";

import { Button } from "@/app/_components/button";
import { Input, Label } from "@/app/_components/input";
import React, { useState } from "react";
import { z } from "zod";
import { sendPartnership } from "./actions/actions";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  name: z.string().min(3, "Name must contains at least 3 characters"),
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number format"),
  address: z.string().min(10, "Address must contains at least 10 characters"),
  reference: z.string(),
});

const Page = () => {
  const [errors, setErrors] =
    useState<z.typeToFlattenedError<typeof formState>>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<z.infer<typeof formSchema>>({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    reference: "",
  });

  const handleChange = (key: keyof typeof formState, value: string) => {
    setFormState((prev: z.infer<typeof formSchema>) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getErrorMessage = (key: keyof typeof formState) => {
    if (!errors) return null;

    const { fieldErrors } = errors;

    if (!fieldErrors || !fieldErrors[key]) return null;

    return fieldErrors[key][0];
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors(undefined);
    const { data, error } = formSchema.safeParse(formState);

    if (error) return setErrors(error.formErrors);

    try {
			await sendPartnership(data);
			swal("Success", "Partnership form sent", "success")
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-[800px] p-4 bg-white space-y-6">
        <div className="space-y-1">
          <h1 className="font-bold text-3xl">Partnership Form</h1>
          <p className="text-gray-600">
            Fill out this form to apply for partnership
          </p>
        </div>
        <form
          className="grid grid-cols-1 sm:grid-cols-2 w-full items-center gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="w-full sm:mb-2 space-y-1">
            <Label className="font-medium pl-1">Nama Lengkap</Label>
            <Input
              placeholder="Please add your full name"
              type="text"
              value={formState.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {getErrorMessage("name") && (
              <p className="text-sm text-red-700 ml-1">
                {getErrorMessage("name")}
              </p>
            )}
          </div>
          <div className="w-full sm:mb-2 space-y-1">
            <Label className="font-medium pl-1">Email</Label>
            <Input
              placeholder="Please add your email"
              type="email"
              value={formState.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {getErrorMessage("email") && (
              <p className="text-sm text-red-700 ml-1">
                {getErrorMessage("email")}
              </p>
            )}
          </div>
          <div className="w-full sm:mb-2 space-y-1">
            <Label className="font-medium pl-1">Phone Number</Label>
            <Input
              value={formState.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              placeholder="Please add your business phone number"
              type="tel"
            />
            {getErrorMessage("phoneNumber") && (
              <p className="text-sm text-red-700 ml-1">
                {getErrorMessage("phoneNumber")}
              </p>
            )}
          </div>
          <div className="w-full sm:mb-2 space-y-1">
            <Label className="font-medium pl-1">Address</Label>
            <Input
              placeholder="Please add your business address"
              type="text"
              value={formState.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            {getErrorMessage("address") && (
              <p className="text-sm text-red-700 ml-1">
                {getErrorMessage("address")}
              </p>
            )}
          </div>
          <div className="w-full sm:mb-2 space-y-1">
            <Label className="font-medium pl-1">
              How do you know FroNeiture?
            </Label>
            <Input
              placeholder="Please add a reference"
              type="text"
              value={formState.reference}
              onChange={(e) => handleChange("reference", e.target.value)}
            />
            {getErrorMessage("reference") && (
              <p className="text-sm text-red-700 ml-1">
                {getErrorMessage("reference")}
              </p>
            )}
          </div>
          <div className="sm:col-span-2 flex justify-end mt-6">
            <Button
              type="submit"
              className="w-[30%]"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
