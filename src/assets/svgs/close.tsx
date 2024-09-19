import { cn } from '@/lib/cn';

export const CloseIcon = ({
  className,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="currentColor"
      className={cn('h-6 w-6', className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* <rect width="32" height="32" fill="white" fill-opacity="0.01" />
      <rect
        width="16"
        height="16"
        transform="translate(8 8)"
        fill="white"
        fill-opacity="0.01"
      /> */}
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.567 12.3004C20.8066 12.0609 20.8066 11.6726 20.567 11.4331C20.3276 11.1935 19.9392 11.1935 19.6997 11.4331L16.0001 15.1327L12.3004 11.4331C12.0609 11.1935 11.6725 11.1935 11.433 11.4331C11.1935 11.6726 11.1935 12.0609 11.433 12.3004L15.1327 16.0001L11.433 19.6997C11.1935 19.9393 11.1935 20.3276 11.433 20.5671C11.6725 20.8066 12.0609 20.8066 12.3004 20.5671L16.0001 16.8675L19.6997 20.5671C19.9392 20.8066 20.3276 20.8066 20.567 20.5671C20.8066 20.3276 20.8066 19.9393 20.567 19.6997L16.8674 16.0001L20.567 12.3004Z"
        fill="currentColor"
      />
    </svg>
  );
};
