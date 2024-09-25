import { cn } from '@/lib/cn';

export const ChevronRightIcon = ({
  className,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="currentColor"
      className={cn('h-8 w-8 ', className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.7676 12.7597C5.53792 12.5208 5.54537 12.141 5.78423 11.9113L8.93443 8.94385L5.78423 5.97635C5.54537 5.74667 5.53792 5.36684 5.7676 5.12798C5.99727 4.88912 6.3771 4.88167 6.61596 5.11135L10.216 8.51135C10.3336 8.62447 10.4001 8.78064 10.4001 8.94385C10.4001 9.10706 10.3336 9.26322 10.216 9.37635L6.61596 12.7763C6.3771 13.006 5.99727 12.9986 5.7676 12.7597Z"
        fill="currentColor"
      />
    </svg>
  );
};
