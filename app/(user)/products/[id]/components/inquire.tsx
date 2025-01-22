"use client";

import { Button } from "@/app/_components/button";
import { Input, Label } from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import { useState } from "react";
import { z } from "zod";
import { sendInquiry } from "../actions/actions";
import swal from "sweetalert";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const inquirySchema = z.object({
  productId: z.string(),
  name: z.string().min(3, "Name must contains at least 3 characters"),
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number format"),
});

type InquirySchema = z.infer<typeof inquirySchema>;

export const InquiryForm = ({ productId }: { productId: string }) => {
  const initialValues = {
    productId,
    name: "",
    email: "",
    phoneNumber: "",
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState<
    z.typeToFlattenedError<typeof formState> | undefined
  >();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<InquirySchema>(initialValues);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setErrors(undefined);
    resetForm();
  };

  const resetForm = () => {
    setFormState(initialValues);
  };

  const handleChange = (key: keyof typeof formState, value: string) => {
    setFormState((prev: InquirySchema) => ({
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
    const { data, error } = inquirySchema.safeParse(formState);

    if (error) return setErrors(error.formErrors);

    try {
      await sendInquiry(data);
      closeModal();
      swal("Success", "Inquiry sent", "success");
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Button onClick={openModal}>Order</Button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add New Design Style"
      >
        <form
          className="grid grid-cols-1 w-full items-center gap-2"
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
          <Button
            type="button"
            className="mt-2"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Order
          </Button>
        </form>
      </Modal>
    </>
  );
};
