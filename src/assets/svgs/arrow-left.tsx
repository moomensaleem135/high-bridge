import { cn } from '@/lib/cn';

export const ArrowLeftIcon = ({
  className,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="currentColor"
      className={cn('h-8 w-8', className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* <rect
        width="16"
        height="16"
        transform="translate(0.5)"
        fill="currentColor"
      /> */}
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.93131 3.3442C10.1462 3.54566 10.1571 3.88316 9.95563 4.09805L6.29759 7.99995L9.95563 11.9018C10.1571 12.1167 10.1462 12.4542 9.93131 12.6557C9.71642 12.8571 9.3789 12.8462 9.17745 12.6314L5.17745 8.36472C4.98512 8.15957 4.98512 7.84034 5.17745 7.63518L9.17745 3.36852C9.3789 3.15363 9.71642 3.14275 9.93131 3.3442Z"
        fill="currentColor"
      />
    </svg>
  );
};
