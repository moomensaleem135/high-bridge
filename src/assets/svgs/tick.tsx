import { cn } from '@/lib/cn';

export const TickIcon = ({
  className,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.51978 6.55966L4.93515 9.90672L12.2782 1.53906"
        stroke="white"
        strokeWidth="2.39076"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
