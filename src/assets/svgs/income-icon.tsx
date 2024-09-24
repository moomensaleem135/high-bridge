import { cn } from '@/lib/cn';

export const IncomeIcon = ({
  className,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="19"
      height="14"
      viewBox="0 0 19 14"
      fill="none"
      className={cn(className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.055 0C1.36777 0 0 1.36777 0 3.055V10.6925C0 12.3797 1.36777 13.7475 3.055 13.7475H15.275C16.9622 13.7475 18.33 12.3797 18.33 10.6925V3.055C18.33 1.36777 16.9622 0 15.275 0H3.055ZM15.275 1.5275H3.055C2.21138 1.5275 1.5275 2.21138 1.5275 3.055V8.40125H16.8025V3.055C16.8025 2.21138 16.1186 1.5275 15.275 1.5275ZM16.8025 9.92875H1.5275V10.6925C1.5275 11.5361 2.21138 12.22 3.055 12.22H15.275C16.1186 12.22 16.8025 11.5361 16.8025 10.6925V9.92875Z"
        className="fill-headingColor"
      />
    </svg>
  );
};
