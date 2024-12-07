"use client";

import { Button } from "@/app/_components/button";
import { Input, Label } from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import React, { useState } from "react";
import { useData } from "../context";
import { UnitType } from "@prisma/client";
import { Pencil } from "lucide-react";
import swal from "sweetalert";

interface UnitTypeSchema {
  id: number;
  name: string;
}

export const UpdateModal = ({ unitType }: { unitType: UnitType }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [formState, setFormState] = useState<UnitTypeSchema>(unitType);
  const { trigger } = useData();

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setError(false);
  };

  const handleChange = (e: string) => {
    setError(false);
    setFormState({ id: unitType.id, name: e });
  };

  const handleSubmit = async () => {
    try {
      if (!formState.name) return setError(true);

      const response = await fetch("/api/unit/type", {
        method: "PUT",
        body: JSON.stringify({ ...formState }),
      });

      const { ok, status } = response;

      if (!ok) throw "Error: " + status;

      trigger();
      closeModal();
			swal("Success", "Success updated unit type", "success")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={openModal} className="w-min px-2" variant="outline">
        <Pencil size={"14px"} />
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add New Unit Type"
      >
        <form className="space-y-4 px-1">
          <div className="flex flex-col text-left gap-1">
            <Label className="text-left">Unit Type Name</Label>
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
            <Button type="submit" onClick={handleSubmit}>
              Update
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
