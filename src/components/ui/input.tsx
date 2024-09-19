import { cn } from '@/lib/cn';
import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  extraClass?: string;
  shouldFocus?: boolean;
  variant?: 'outlined' | 'primary';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      type,
      placeholder = '',
      extraClass,
      shouldFocus,
      variant = 'primary',
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
      if (shouldFocus && inputRef) {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    }, [shouldFocus, ref]);

    return (
      <div className="custom-input-field w-full">
        {/* to remove browser autofill colors */}
        <style jsx>{`
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          textarea:-webkit-autofill,
          textarea:-webkit-autofill:hover,
          textarea:-webkit-autofill:focus,
          select:-webkit-autofill,
          select:-webkit-autofill:hover,
          select:-webkit-autofill:focus {
            -webkit-text-fill-color: black !important;
            -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
            transition: background-color 5000s ease-in-out 0s !important;
          }
        `}</style>
        <div className="relative -left-[0.4rem] w-full h-8 ">
          <input
            className={cn(
              `text-input-class peer w-full h-full text-subheadingColor font-normal outline outline-0 focus:outline-0 
               disabled:bg-brand transition-all text-sm px-3 py-2 rounded-[7px] bg-transparent focus:bg-transparent placeholder:text-subheadingColor`,
              className,
              extraClass
            )}
            autoComplete="new-password"
            type={type}
            ref={shouldFocus ? inputRef : ref}
            placeholder={placeholder}
            {...props}
          />
          {variant === 'outlined' && (
            <label
              className="flex w-full h-full select-none pointer-events-none absolute left-0 
            font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 
            leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 
            transition-all peer-focus:-top-2 -top-2 peer-disabled:peer-placeholder-shown:-top-[0.9rem] peer-placeholder-shown:-top-[0.9rem] 
            peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 
            before:h-1.5 before:mt-[6.5px] before:mr-1  before:rounded-tl-md  before:pointer-events-none before:transition-all  
            after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1  
            after:rounded-tr-md  after:pointer-events-none after:transition-all peer-placeholder-shown:leading-[4.50]
             text-gray-500 peer-focus:text-gray-500 "
            >
              {label}
            </label>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
