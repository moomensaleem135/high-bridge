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
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 w-full">
      <div className="bg-white rounded-2xl h-[290px] xs:w-[340px] sm:w-[500px] md:w-[600px] flex justify-start items-center flex-col gap-y-4">
        <div className="w-full flex justify-end pr-6 pb-3 pt-4 cursor-pointer">
          <XIcon onClick={onClose} />
        </div>

        <div className="flex flex-col justify-center items-center pl-12 pr-12">
          <h2 className="md:text-2xl font-semibold mb-4 sm:text-lg xs:text-base">
            {heading}
          </h2>
          <p className="md:text-base font-normal mb-6 text-center sm:text-sm xs:text-xs ">
            {paragraph}
          </p>
          <div className="flex justify-end w-full gap-3 ">
            <Button
              onClick={onConfirm}
              className="bg-transparent text-black md:text-base sm:text-sm xs:text-xs font-medium border-[1px] border-black hover:bg-gray-400 sm:px-3 xs:px-2"
            >
              Discard Changes
            </Button>
            <Button
              onClick={onClose}
              className="bg-black text-white md:text-base sm:text-sm xs:text-xs font-medium hover:bg-gray-600 sm:px-3 xs:px-2"
            >
              Save and Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
