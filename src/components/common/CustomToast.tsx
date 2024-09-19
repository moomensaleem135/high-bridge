import React from 'react';
import { toast, Toast } from 'react-hot-toast';
import { CloseIcon } from '@/assets/svgs';

interface CustomToastProps {
  t: Toast;
  title: string;
  onClickEdit?: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ t, title, onClickEdit }) => {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-background shadow-lg rounded-lg pointer-events-auto flex ring-2 ring-accent ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex justify-between items-center mt-1">
          <p
            className="text-base font-medium text-headingColor"
            data-cy="event-generated"
            data-testid="event-generated"
          >
            {title}
          </p>
          <p
            className="text-base font-medium text-primary"
            onClick={() => onClickEdit && onClickEdit()}
          >
            Edit Event
          </p>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full p-4 flex items-center justify-center"
        >
          <CloseIcon className="text-red w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
