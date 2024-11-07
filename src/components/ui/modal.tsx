// Modal.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  heading: string;
  paragraph: string;
  buttonText: string;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  heading,
  paragraph,
  buttonText,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 w-full">
      <div className="bg-white pl-12 pr-12 rounded-2xl w-[600px] h-[280px] flex justify-center items-center flex-col">
        <h2 className="text-2xl font-semibold mb-4">{heading}</h2>
        <p className="text-base font-normal mb-6 text-center">{paragraph}</p>
        <div className="flex justify-end w-full gap-3">
          <Button
            onClick={onClose}
            className="bg-transparent text-black text-base font-medium border-[1px] border-black hover:bg-gray-400 px-3"
          >
            Discard Changes
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-black text-white text-base font-medium hover:bg-gray-600 px-3"
          >
            Save and Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
