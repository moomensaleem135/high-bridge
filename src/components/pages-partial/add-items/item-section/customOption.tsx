import React from 'react';
import { EditIcon } from '@/assets/svgs/edit';
import { DeleteIcon } from '@/assets/svgs/delete';

interface CustomOptionsProps {
  id: string;
  item: string;
  onEdit: (id: string, item: string) => void;
  onDelete: (id: string, item: string) => void;
}

const CustomOptions: React.FC<CustomOptionsProps> = ({
  id,
  item,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex justify-center items-center gap-1 mt-1.5 w-50 ">
      <div
        className="flex justify-evenly items-center bg-white gap-1 pl-1.5 pr-1.5 pt-0.5 pb-0.5 rounded border-[#DFE3E6] border-[1px] cursor-pointer hover:bg-zakatText hover:border-[#DFE3E6] hover:text-white"
        onClick={() => onEdit(id, item)}
      >
        <button aria-label="Edit" className="flex items-center">
          <EditIcon className="transition-colors xs:w-10 xl:w-5" />
        </button>
        <span className="text-xs font-normal xs:hidden xl:block">Edit</span>
      </div>

      <div
        className="flex justify-evenly items-center bg-white gap-1 pl-1.5 pr-1.5 pt-0.5 pb-0.5 rounded border-[#DFE3E6] border-[1px] cursor-pointer hover:bg-[#2F2F2F] hover:border-[#DFE3E6] hover:text-white"
        onClick={() => onDelete(id, item)}
      >
        <button aria-label="Delete" className="flex items-center">
          <DeleteIcon className="transition-colors xs:w-10 xl:w-5" />
        </button>
        <span className="text-xs font-normal xs:hidden xl:block">Delete</span>
      </div>
    </div>
  );
};

export default CustomOptions;
