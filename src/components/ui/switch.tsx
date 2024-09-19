import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/cn';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-6 w-10 p-1 shrink-0 cursor-pointer items-center rounded-full  transition-colors disabled:cursor-not-allowed disabled:opacity-50 border-2 border-[#C1C6C1]',
      'bg-[#EFF1EF]',
      'data-[state=checked]:bg-blue-500',
      'data-[state=unchecked]:bg-[#EFF1EF]',
      'dark:data-[state=checked]:bg-[#212220]',
      'dark:data-[state=unchecked]:bg-[#212220]',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-5 w-5 -ml-1 rounded-full bg-white shadow-lg ring-0 transition-transform',
        'data-[state=checked]:translate-x-4',
        'data-[state=unchecked]:translate-x-0'
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
