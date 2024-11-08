import { cn } from '@/lib/cn';

export const AccordionDownIcon = ({
  className,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      className={cn(className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 1.25L7 6.75L12.5 1.25"
        stroke="#114063"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
