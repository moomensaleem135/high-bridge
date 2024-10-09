import React from 'react';
import { EditIcon } from '@/assets/svgs/edit';
import { DeleteIcon } from '@/assets/svgs/delete';

interface CustomOptionsProps {
  id: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CustomOptions: React.FC<CustomOptionsProps> = ({
  id,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex justify-evenly items-center xl:gap-1 mt-2">
      <div
        className="flex justify-evenly items-center bg-white h-6 gap-1 pl-1 pr-1 rounded-sm border-[#DFE3E6] border-[1px] cursor-pointer"
        onClick={() => onEdit(id)}
      >
        <button aria-label="Edit">
          <EditIcon />
        </button>
        <span className="text-sm xs:hidden xl:block">Edit</span>
      </div>

      <div
        className="flex justify-evenly items-center bg-white h-6 gap-1 pl-1 pr-1 rounded-sm border-[#DFE3E6] border-[1px] cursor-pointer "
        onClick={() => onDelete(id)}
      >
        <button aria-label="Delete">
          <DeleteIcon />
        </button>
        <span className="text-sm xs:hidden xl:block">Delete</span>
      </div>
    </div>
  );
};

export default CustomOptions;
