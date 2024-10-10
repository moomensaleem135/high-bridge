// import React from 'react';
// import { EditIcon } from '@/assets/svgs/edit';
// import { DeleteIcon } from '@/assets/svgs/delete';

// interface CustomOptionsProps {
//   id: string;
//   onEdit: (id: string) => void;
//   onDelete: (id: string) => void;
// }

// const CustomOptions: React.FC<CustomOptionsProps> = ({
//   id,
//   onEdit,
//   onDelete,
// }) => {
//   return (
//     <div className="flex justify-center items-center xl:gap-1 mt-2 w-50 gap-5">
//       <div
//         className="flex justify-evenly items-center bg-white h-6 gap-1 pl-1 pr-1 rounded border-[#DFE3E6] border-[1px] cursor-pointer hover:bg-zakatText hover:border-[#DFE3E6] hover:text-white"
//         onClick={() => onEdit(id)}
//       >
//         <button aria-label="Edit">
//           <EditIcon />
//         </button>
//         <span className="text-sm xs:hidden xl:block">Edit</span>
//       </div>

//       <div
//         className="flex justify-evenly items-center bg-white h-6 gap-1 pl-1 pr-1 rounded border-[#DFE3E6] border-[1px] cursor-pointer "
//         onClick={() => onDelete(id)}
//       >
//         <button aria-label="Delete">
//           <DeleteIcon />
//         </button>
//         <span className="text-sm xs:hidden xl:block">Delete</span>
//       </div>
//     </div>
//   );
// };

// export default CustomOptions;

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
    <div className="flex justify-center items-center xl:gap-1 mt-1.5 w-50 gap-5">
      <div
        className="flex justify-evenly items-center bg-white gap-1 pl-1.5 pr-1.5 pt-0.5 pb-0.5 rounded border-[#DFE3E6] border-[1px] cursor-pointer hover:bg-zakatText hover:border-[#DFE3E6] hover:text-white"
        onClick={() => onEdit(id)}
      >
        <button aria-label="Edit" className="flex items-center">
          <EditIcon className="transition-colors" />
        </button>
        <span className="text-sm font-normal xs:hidden xl:block">Edit</span>
      </div>

      <div
        className="flex justify-evenly items-center bg-white gap-1 pl-1.5 pr-1.5 pt-0.5 pb-0.5 rounded border-[#DFE3E6] border-[1px] cursor-pointer hover:bg-[#2F2F2F] hover:border-[#DFE3E6] hover:text-white"
        onClick={() => onDelete(id)}
      >
        <button aria-label="Delete" className="flex items-center">
          <DeleteIcon className="transition-colors" />
        </button>
        <span className="text-sm font-normal xs:hidden xl:block">Delete</span>
      </div>
    </div>
  );
};

export default CustomOptions;
