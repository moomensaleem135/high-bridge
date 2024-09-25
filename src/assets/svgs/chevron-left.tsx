import { cn } from '@/lib/cn';

export const ChevronLeftIcon = ({
  className,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={cn('h-8 w-8 group-focus-within:text-brand', className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2324 5.12798C10.4621 5.36685 10.4546 5.74667 10.2158 5.97635L7.06557 8.94385L10.2158 11.9113C10.4546 12.141 10.4621 12.5209 10.2324 12.7597C10.0027 12.9986 9.6229 13.006 9.38404 12.7763L5.78404 9.37635C5.66639 9.26323 5.5999 9.10706 5.5999 8.94385C5.5999 8.78064 5.66639 8.62447 5.78404 8.51135L9.38404 5.11135C9.6229 4.88167 10.0027 4.88912 10.2324 5.12798Z"
        fill="currentColor"
      />
    </svg>
  );
};
