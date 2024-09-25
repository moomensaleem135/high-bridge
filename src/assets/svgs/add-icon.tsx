import { cn } from '@/lib/cn';

export const AddIcon = ({
  className,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9988 0C4.92429 0 0 4.92508 0 11.0004C0 17.0757 4.92429 22 10.9988 22C17.0765 22 22 17.0749 22 11.0004C22 4.92508 17.0765 0 10.9988 0ZM16.6021 12.6345H12.7163V16.6013H9.33405V12.6345H5.39871V9.25223H9.33326V5.39713H12.7155V9.25223H16.6013L16.6021 12.6345Z"
        fill="#0A1B39"
      />
    </svg>
  );
};
