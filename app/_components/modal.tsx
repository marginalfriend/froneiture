import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl mb-2"
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="mt-4">{children}</div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">

				</div>
      </div>
    </div>
  );
};

export default Modal;
