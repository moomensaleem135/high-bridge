import { cn } from '@/lib/cn';

export const NavLogo = ({
  className,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_337_577)">
        <circle cx="14.7724" cy="15.0004" r="15.2275" fill="#2E90FA" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M21.9111 -0.540587C22.6544 0.202751 22.6544 1.40794 21.9111 2.15128L7.55301 16.5093C6.80968 17.2527 5.60449 17.2527 4.86115 16.5093L-0.40602 11.2422C-1.14936 10.4988 -1.14936 9.29365 -0.40602 8.55031L13.952 -5.80775C14.6954 -6.55109 15.9006 -6.55109 16.6439 -5.80775L21.9111 -0.540587Z"
          fill="white"
          fill-opacity="0.5"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M28.9821 19.6917C29.7255 20.4351 29.7255 21.6403 28.9821 22.3836L16.4818 34.8839C15.7385 35.6273 14.5333 35.6273 13.7899 34.8839L7.35765 28.4516C6.61431 27.7083 6.61431 26.5031 7.35765 25.7598L19.858 13.2595C20.6013 12.5161 21.8065 12.5161 22.5498 13.2595L28.9821 19.6917Z"
          fill="black"
          fill-opacity="0.3"
        />
      </g>
      <defs>
        <clipPath id="clip0_337_577">
          <rect width="30" height="30" rx="15" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
