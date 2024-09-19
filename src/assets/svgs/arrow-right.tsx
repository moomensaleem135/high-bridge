import { cn } from '@/lib/cn';

export const ArrowRightIcon = ({
  className,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      className={cn('h-8 w-8', className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* <rect
        width="16"
        height="16"
        transform="translate(0.5)"
        fill="white"
      /> */}
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.06896 3.34408C7.28384 3.14262 7.62136 3.15351 7.82282 3.3684L11.8228 7.63507C12.0151 7.84021 12.0151 8.15945 11.8228 8.3646L7.82282 12.6312C7.62136 12.8462 7.28384 12.8571 7.06896 12.6556C6.85407 12.4541 6.84318 12.1166 7.04464 11.9018L10.7027 7.99984L7.04464 4.09794C6.84318 3.88305 6.85407 3.54553 7.06896 3.34408Z"
        fill="currentColor"
      />
    </svg>
  );
};
