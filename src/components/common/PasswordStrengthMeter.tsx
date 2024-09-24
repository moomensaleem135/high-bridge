import { cn } from '@/lib/cn';
import { EvaluateType, evaluatePasswordStrength } from '@/lib/helpers';
import React, { useEffect } from 'react';

const PasswordStrengthMeter = ({ password }: { password: string }) => {
  useEffect(() => {}, [password]);

  const strength = evaluatePasswordStrength(password);

  const getStrengthColor = (strength: EvaluateType): string => {
    switch (strength.type) {
      case 'Weak':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Strong':
        return 'bg-green-500';
      case 'Very Strong':
        return 'bg-green-500';
      default:
        return '';
    }
  };

  return (
    <>
      <div
        className={`text-sm font-medium leading-loose  text-${getStrengthColor(strength).replace('bg-', '')}`}
      >
        {strength.type}
      </div>
      <div className="flex gap-0.5 my-auto">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={cn(
              'shrink-0 h-1 rounded-lg w-[38px]',
              strength.score > index
                ? getStrengthColor(strength)
                : 'bg-gray-300'
            )}
          ></div>
        ))}
      </div>
    </>
  );
};

export default PasswordStrengthMeter;
