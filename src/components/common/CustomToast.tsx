import React from 'react';
import { toast, Toast } from 'react-hot-toast';
import { CloseIcon } from '@/assets/svgs';
import { useRouter } from 'next/navigation';

interface CustomToastProps {
  t: Toast;
  title: string;
  onClickEdit?: () => void;
  setup?: boolean;
}

const CustomToast: React.FC<CustomToastProps> = ({
  t,
  title,
  onClickEdit,
  setup,
}) => {
  const router = useRouter();
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
            <span>Edit Event</span>
          </p>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => {
            toast.dismiss(t.id);
          }}
          className="w-full p-4 flex items-center justify-center"
        >
          <CloseIcon className="text-red w-8 h-8 hover:bg-[#dfe3e6] rounded-sm" />
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
