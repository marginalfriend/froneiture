"use client";

import { Button } from "@/app/_components/button";
import { Input, Label } from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import React, { useState } from "react";

interface UnitTypeSchema {
  name: string;
}

export const CreateModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [formState, setFormState] = useState<UnitTypeSchema>({
    name: "",
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setError(false);
    resetForm();
  };

  const resetForm = () => {
    setFormState({
      name: "",
    });
  };

  const handleChange = (e: string) => {
    setError(false);
    setFormState({ name: e });
  };

  const handleSubmit = async () => {
    try {
      if (!formState.name) return setError(true);

      const response = await fetch("/api/unit/design-style", {
        method: "POST",
        body: JSON.stringify({ ...formState }),
      });

      const { ok, status } = response;

      if (!ok) throw "Error: " + status;

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={openModal}>Add</Button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add New Design Style"
      >
        <form className="space-y-4 px-1">
          <div>
            <Label>Design Style Name</Label>
            <Input
              required
              placeholder="Type product name here"
              value={formState.name}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          {error && (
            <div className="bg-red-200 text-red-900 p-2 rounded">
              Name is required
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit}>
              Create
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
