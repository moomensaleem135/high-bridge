// components/GenericFormField.tsx
import React from 'react';
import { Controller, Control, FieldError } from 'react-hook-form';
import { FormControl } from '@/components/ui/form';
import { IconInput } from '@/components/ui/icon-input';
import { Label } from '@/components/ui/label';
import { ErrorIcon } from '@/assets/svgs';

interface GenericFormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  error?: FieldError | undefined;
  type?: string;
}

const GenericFormField: React.FC<GenericFormFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  type = 'text',
}) => (
  <div className="w-full items-center">
    <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
      <Label className="font-medium text-lg">{label}</Label>
      <div className="flex w-full">
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => (
            <div className="w-full flex flex-col">
              <FormControl>
                <IconInput
                  {...field}
                  type={type}
                  placeholder={placeholder}
                  className="bg-inputBg rounded-lg h-[45px] border-inputBorder py-1.5 text-black"
                  aria-label={name}
                  error={!!error}
                  data-testid={name}
                />
              </FormControl>
              {error && (
                <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                  <ErrorIcon />
                  {error.message}
                </span>
              )}
            </div>
          )}
        />
      </div>
    </div>
  </div>
);

export default GenericFormField;
