import React from 'react';
import { EditIcon } from '@/assets/svgs/edit';
import { DeleteIcon } from '@/assets/svgs/delete';

interface CustomOptionsProps {
  id: number; // The ID of the item
  onEdit: (id: number) => void; // Function to handle editing
  onDelete: (id: number) => void; // Function to handle deleting
}

const CustomOptions: React.FC<CustomOptionsProps> = ({
  id,
  onEdit,
  onDelete,
}) => {
  const handleEdit = () => {
    onEdit(id); // Call the passed edit function with the ID
  };

  const handleDelete = () => {
    onDelete(id); // Call the passed delete function with the ID
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
