"use client";
import { Button } from "@/app/_components/button";
import { Input, Label } from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import React, { useState } from "react";

export const CreateModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Button onClick={openModal}>Add</Button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add New Product"
      >
				<form>
					<Label>Product Name</Label>
					<Input placeholder="Product Name"/>
				</form>
			</Modal>
    </>
  );
};
