"use client";

import { Button } from "@/app/_components/button";
import { Input, Label } from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import Select from "@/app/_components/select";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Pencil, X } from "lucide-react";
import { useData } from "../context";

interface UpdateProductSchema {
  id: string;
  name: string;
  description: string;
  designStyleId: number;
  unitTypeId: number;
  images: File[];
  existingImages: { id: string; path: string }[];
}

export const UpdateModal = ({ product }: { product: ProductCardProps }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState<UpdateProductSchema>({
    id: product.id,
    name: product.name, // Pre-fill with existing product data
    description: product.description,
    designStyleId: product.designStyleId,
    unitTypeId: product.unitTypeId,
    images: [],
    existingImages: product.images || [], // Initialize with existing images
  });
  const [previews, setPreviews] = useState<string[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]); // Track deleted images
  const [errors, setErrors] = useState<string[]>([]);
  const { designStyles, unitTypes, trigger } = useData();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_IMAGES = 10;
  const MAX_FILE_SIZE = 2.5 * 1024 * 1024; // 2.5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const openModal = () => {
    // Reset to initial product state when opening
    setFormState({
      id: product.id,
      name: product.name,
      description: product.description,
      designStyleId: product.designStyleId,
      unitTypeId: product.unitTypeId,
      images: [],
      existingImages: product.images || [],
    });
    setDeletedImageIds([]);
    setPreviews([]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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

  const removeImage = (indexToRemove: number, isExisting: boolean = false) => {
    if (isExisting) {
      // For existing images, add to deleted images list
      const imageToDelete = formState.existingImages[indexToRemove];
      setDeletedImageIds((prev) => [...prev, imageToDelete.id]);

      setFormState((prev) => ({
        ...prev,
        existingImages: prev.existingImages.filter(
          (_, index) => index !== indexToRemove
        ),
      }));
    } else {
      // For newly added images
      setFormState((prev) => ({
        ...prev,
        images: prev.images.filter((_, index) => index !== indexToRemove),
      }));
      setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleChange = (
    key: keyof UpdateProductSchema,
    value: string | File
  ) => {
    if (typeof formState[key] === "number") {
      setFormState((prev) => ({ ...prev, [key]: parseInt(value as string) }));
    } else {
      setFormState((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    const requiredFields: [keyof UpdateProductSchema, string][] = [
      ["name", "Name"],
      ["description", "Description"],
      ["designStyleId", "Design Style"],
      ["unitTypeId", "Unit Type"],
    ];
    const missingFields = requiredFields
      .filter(
        (field) =>
          !formState[field[0]] ||
          (typeof formState[field[0]] === "number" && formState[field[0]] === 0)
      )
      .map((field) => field[1]);

    if (missingFields.length > 0) {
      setErrors([
        `Please fill in all required fields: ${missingFields.join(", ")}`,
      ]);
      return;
    }

    try {
      // Upload new images
      const newImageUploadPromises = formState.images.map(async (file) => {
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
        return data;
      });

      const newImageData = await Promise.all(newImageUploadPromises);

      // Prepare product update data
      const productUpdateData = {
        id: product.id,
        name: formState.name,
        description: formState.description,
        designStyleId: formState.designStyleId,
        unitTypeId: formState.unitTypeId,
        images: newImageData.map((img) => ({
          fileName: img.fileName,
          path: img.path,
          size: img.size,
          mimeType: img.mimeType,
          width: img.width,
          height: img.height,
          description: img.description,
        })),
        deletedImageIds, // Include ids of images to be deleted
      };

      // Submit product update
      const productResponse = await fetch("/api/product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productUpdateData),
      });

      if (!productResponse.ok) {
        throw new Error("Product update failed");
      }

      // Close modal on success
      trigger();
      closeModal();
    } catch (error) {
      console.error("Submission error:", error);
      setErrors(["Failed to update product. Please try again."]);
    }
  };

  const handleDelete = async () => {
    try {
      const url = `/api/product?id=${product.id}`;

      const options: RequestInit = {
        method: "DELETE",
      };

      const response = await fetch(url, options);

      const { status, ok } = response;

      if (!ok) throw "Error deleting product: " + status;

      closeModal();
      trigger();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={openModal} className="w-min px-2" variant="outline">
        <Pencil size={"14px"} />
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Add New Product">
        <form className="space-y-4 px-1">
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
              options={designStyles}
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
              options={unitTypes}
            />
          </div>
          <div>
            <Label>
              Images{" "}
              {`(${
                formState.existingImages.length + formState.images.length
              }/${MAX_IMAGES})`}
            </Label>
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

            {/* Render existing images */}
            {formState.existingImages.length > 0 && (
              <div className="overflow-x-auto">
                <div className="flex gap-2 mt-2 w-max">
                  {[...formState.existingImages, ...previews].map(
                    (image, index) => (
                      <div
                        key={typeof image === "string" ? image : image.id}
                        className="relative"
                      >
                        <Image
                          src={typeof image === "string" ? image : image.path}
                          alt={`Preview ${index + 1}`}
                          width={100}
                          height={100}
                          className="object-cover rounded-lg w-32 h-32"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index, true)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
          {errors.length > 0 && (
            <div className="bg-red-100 text-red-700 p-2 rounded">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={handleDelete}>
              Delete
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Update Product
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
