import { cn } from '@/lib/cn';

export const SelectedIcon = ({
  className,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.38818 11.9687L7.75519 17.5472L19.2943 3.60107"
        stroke="#4CAF50"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
