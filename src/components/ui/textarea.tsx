import { cn } from '@/lib/cn';
import * as React from 'react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[40px] w-full rounded-lg bg-accent px-3 py-2 text-sm placeholder:text-subheadingColor focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50',
          className,
          error && ''
        )}
        ref={ref}
        rows={4}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
