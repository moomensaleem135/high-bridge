import * as React from 'react';

import { cn } from '@/lib/cn';
import { IconType } from '@/lib/types';

import { Input, InputProps } from './input';

export interface IconInputProps extends InputProps {
  icon?: IconType;
  rightIcon?: IconType;
  error?: boolean;
  iconClassName?: string;
  rightIconClassName?: string;
  showIcon?: boolean;
  showRightIcon?: boolean;
  onClickIcon?: () => void;
  onClickRightIcon?: () => void;
  inputClassName?: string;
  variant?: 'outlined' | 'primary';
}

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  (
    {
      icon: Icon,
      rightIcon: RightIcon = Icon,
      error,
      className,
      iconClassName,
      rightIconClassName,
      showIcon = true,
      showRightIcon = false,
      onClickIcon,
      onClickRightIcon,
      inputClassName,
      variant = 'primary',
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          //'group flex w-full gap-1.5 px-3 py-1  rounded-lg ',
          'bg-transparent w-[100%] border-[1px] border-solid border-[#666666] border-opacity-30 rounded-md px-2 py-2',
          error
            ? 'border-[#f85151] border-[2px] border-solid'
            : 'focus-within:border-[#666666] ',
          className
        )}
      >
        {showIcon && Icon && (
          <Icon
            className={cn(
              'group-focus-within:text-primary text-2xl mr-2 mt-1 ',
              iconClassName
            )}
            onClick={onClickIcon}
          />
        )}
        <Input ref={ref} extraClass={inputClassName} {...props} />
        {showRightIcon && RightIcon && (
          <RightIcon
            className={cn(
              'group-focus-within:text-primary text-inputText text-2xl ml-auto mr-2',
              rightIconClassName
            )}
            onClick={onClickRightIcon}
          />
        )}
      </div>
    );
  }
);

IconInput.displayName = 'IconInput';

export { IconInput };
