import React from 'react';
import { EditIcon } from '@/assets/svgs/edit';
import { DeleteIcon } from '@/assets/svgs/delete';

const CustomOptions = () => {
  const handleEdit = () => {
    console.log('Edit clicked for:');
  };

  const handleDelete = () => {
    console.log('Delete clicked for:');
  };

  return (
    <div className="flex justify-start items-center mt-2 gap-1">
      <button onClick={handleEdit} aria-label="Edit">
        <EditIcon />
      </button>
      <button onClick={handleDelete} aria-label="Delete">
        <DeleteIcon />
      </button>
    </div>
  );
};

export default CustomOptions;
