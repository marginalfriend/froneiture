"use client";

import { Button } from "@/app/_components/button";
import { Input, Label } from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import Select from "@/app/_components/select";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ProductSchema {
  name: string;
  description: string;
  designStyleId: number;
  unitTypeId: number;
  locationId: number;
  images: File[];
}

interface CreateProduct {
  name: string;
  description: string;
  designStyleId: number;
  unitTypeId: number;
  locationId: number;
  imageIds: string[];
}

export const CreateModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState<ProductSchema>({
    name: "",
    description: "",
    designStyleId: 0,
    unitTypeId: 0,
    locationId: 0,
    images: [],
  });
  const [previews, setPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_IMAGES = 10;
  const MAX_FILE_SIZE = 2.5 * 1024 * 1024; // 2.5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormState({
      name: "",
      description: "",
      designStyleId: 0,
      unitTypeId: 0,
      locationId: 0,
      images: [],
    });
    setPreviews([]);
    setErrors([]);
  };

  const validateFiles = (files: FileList | null) => {
    const newErrors: string[] = [];
    if (!files) return newErrors;

    Array.from(files).forEach((file, index) => {
      // Check total number of images
      if (formState.images.length + index >= MAX_IMAGES) {
        newErrors.push(`Maximum of ${MAX_IMAGES} images allowed`);
        return;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        newErrors.push(`${file.name}: File size exceeds 2.5MB`);
        return;
      }

      // Check file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        newErrors.push(
          `${file.name}: Invalid file type. Use JPEG, PNG, or WebP`
        );
        return;
      }
    });

    return newErrors;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const validationErrors = validateFiles(files);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (files) {
      const newFiles = Array.from(files);
      const newImages = [...formState.images, ...newFiles];
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      setFormState((prev) => ({
        ...prev,
        images: newImages,
      }));

      setPreviews((prev) => [...prev, ...newPreviews]);
      setErrors([]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormState((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
    setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleChange = (key: keyof ProductSchema, value: string | File) => {
    if (typeof formState[key] === "number") {
      setFormState((prev) => ({ ...prev, [key]: parseInt(value as string) }));
    } else {
      setFormState((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = async () => {
    // Validate all fields
    const requiredFields: (keyof ProductSchema)[] = [
      "name",
      "description",
      "designStyleId",
      "unitTypeId",
      "locationId",
    ];
    const missingFields = requiredFields.filter(
      (field) =>
        !formState[field] ||
        (typeof formState[field] === "number" && formState[field] === 0)
    );

    if (missingFields.length > 0) {
      setErrors([
        `Please fill in all required fields: ${missingFields.join(", ")}`,
      ]);
      return;
    }

    try {
      // Upload images first
      const imageUploadPromises = formState.images.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Image upload failed");
        }

        const data = await response.json();
        return data.id;
      });

      const imageIds = await Promise.all(imageUploadPromises);
      console.log("Image ids:", imageIds);

      // Prepare product data
      const productData: CreateProduct = {
        name: formState.name,
        description: formState.description,
        designStyleId: formState.designStyleId,
        unitTypeId: formState.unitTypeId,
        locationId: formState.locationId,
        imageIds,
      };

      // Submit product
      const productResponse = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!productResponse.ok) {
        throw new Error("Product creation failed");
      }

      // Reset form and close modal on success
      closeModal();
    } catch (error) {
      console.error("Submission error:", error);
      setErrors(["Failed to create product. Please try again."]);
    }
  };

  return (
    <>
      <Button onClick={openModal}>Add</Button>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Add New Product">
        <form className="space-y-4">
          {errors.length > 0 && (
            <div className="bg-red-100 text-red-700 p-2 rounded">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          <div>
            <Label>Product Name</Label>
            <Input
              placeholder="Type product name here"
              value={formState.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              placeholder="Type product description here"
              value={formState.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div>
            <Label>Design Style</Label>
            <Select
              className="w-full"
              placeholder="Select Design Style"
              name={"select-design-style"}
              value={String(formState.designStyleId)}
              onChange={(e) => handleChange("designStyleId", e.target.value)}
              options={[
                { label: "Design 1", value: "1" },
                { label: "Design 2", value: "2" },
              ]}
            />
          </div>
          <div>
            <Label>Unit Type</Label>
            <Select
              className="w-full"
              placeholder="Select Unit Type"
              name={"select-unit-type"}
              value={String(formState.unitTypeId)}
              onChange={(e) => handleChange("unitTypeId", e.target.value)}
              options={[
                { label: "Unit 1", value: "1" },
                { label: "Unit 2", value: "2" },
              ]}
            />
          </div>
          <div>
            <Label>Location</Label>
            <Select
              className="w-full"
              placeholder="Select Location"
              name={"select-location"}
              value={String(formState.locationId)}
              onChange={(e) => handleChange("locationId", e.target.value)}
              options={[
                { label: "Location 1", value: "1" },
                { label: "Location 2", value: "2" },
              ]}
            />
          </div>
          <div>
            <Label>Images {`(${formState.images.length}/${MAX_IMAGES})`}</Label>
            <div
              className="border-2 border-dashed p-4 rounded-lg flex items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              {formState.images.length < MAX_IMAGES ? (
                <p className="text-gray-500 cursor-pointer">
                  Click to upload images (Max {MAX_IMAGES}, 2.5MB each)
                </p>
              ) : (
                <p className="text-red-500">Maximum images reached</p>
              )}
            </div>
            {previews.length > 0 && (
              <div className="overflow-x-auto">
                <div className="flex gap-2 mt-2 w-max">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        width={100}
                        height={100}
                        className="object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit}>
              Create Product
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
