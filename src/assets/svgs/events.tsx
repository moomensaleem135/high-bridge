import { cn } from '@/lib/cn';

export const EventIcon = ({
  className,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={cn('h-6 w-6', className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="16" height="16" fill="white" fill-opacity="0.01" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.19995 2.66663C3.19995 2.37208 3.43874 2.1333 3.73328 2.1333H12.2666C12.5611 2.1333 12.8 2.37208 12.8 2.66663V14.4C12.8 14.5939 12.6948 14.7724 12.5252 14.8664C12.3556 14.9604 12.1483 14.955 11.984 14.8522L7.99995 12.3622L4.01595 14.8522C3.85155 14.955 3.64431 14.9604 3.47475 14.8664C3.30517 14.7724 3.19995 14.5939 3.19995 14.4V2.66663ZM4.26662 3.19997V13.4377L7.43462 11.4577C7.78051 11.2416 8.2194 11.2416 8.56528 11.4577L11.7333 13.4377V3.19997H4.26662Z"
        fill="currentColor"
      />
    </svg>
  );
};
