// components/GenericFormField.tsx
import React from 'react';
import { Controller, Control, FieldError } from 'react-hook-form';
import { FormControl, FormField } from '@/components/ui/form';
import { IconInput } from '@/components/ui/icon-input';
import { Label } from '@/components/ui/label';
import { ErrorIcon } from '@/assets/svgs';
import { Checkbox } from '../ui/checkbox';
import QualityDropdown from '../pages-partial/item-details/gold-silver/detailsForm/qualityDropdown';
import WeightDropdown from '../pages-partial/item-details/gold-silver/detailsForm/weightDropdown';

interface GenericFormFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  error?: FieldError | undefined;
  type?: string;
  checkedValue?: string;
  checkbox?: boolean;
  textInput?: boolean;
  dropdown?: boolean;
  disabled?: boolean;
  qualityDropdown?: boolean;
  weightDropdown?: boolean;
  textFieldClassName?: string;
  weightText?: boolean;
  item?: string;
  setSelection?: (value: string) => void;
}

const GenericFormField: React.FC<GenericFormFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  checkedValue,
  checkbox,
  textInput,
  dropdown,
  disabled,
  qualityDropdown,
  weightDropdown,
  weightText,
  textFieldClassName,
  setSelection,
  item,
}) => (
  <>
    {textInput && weightText === false && (
      <div className="w-full items-center">
        <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
          <Label>{label}</Label>
          <div className="flex w-full">
            <Controller
              control={control}
              name={name}
              render={({ field, fieldState: { error } }) => (
                <div className="w-full flex flex-col">
                  <FormControl>
                    <IconInput
                      {...field}
                      min={type === 'number' ? 0 : ''}
                      type={type}
                      placeholder={placeholder}
                      className={
                        textFieldClassName
                          ? textFieldClassName
                          : 'bg-inputBg rounded-lg h-[45px] border-inputBorder py-1.5 text-black'
                      }
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
    )}
    {textInput && weightText === true && (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <div className="w-full flex flex-col">
            <FormControl>
              <IconInput
                {...field}
                type={type}
                min={type === 'number' ? 0 : ''}
                placeholder={placeholder}
                className={
                  textFieldClassName
                    ? textFieldClassName
                    : 'bg-inputBg rounded-r-none rounded-l-lg h-[45px] border-inputBorder py-1.5 text-black'
                }
                error={!!error}
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
    )}
    {checkbox && (
      <div className="flex justify-center items-center gap-4">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
              disabled={disabled}
              checked={field.value === checkedValue}
              onCheckedChange={() => {
                field.onChange(checkedValue);
                if (setSelection && checkedValue) {
                  setSelection(checkedValue);
                }
              }}
              className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
            />
          )}
        />
        <label htmlFor="myCheckbox">{label}</label>
      </div>
    )}
    {dropdown && qualityDropdown && (
      <div className="w-full items-center">
        <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
          <Label>{label}</Label>
          <FormField
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <QualityDropdown
                    initialValue={field.value}
                    item={item ? item : ''}
                    onQualityChange={(qualityVal) => field.onChange(qualityVal)}
                  />
                  {error && (
                    <span className="text-destructive text-sm flex items-center gap-1 ">
                      <ErrorIcon />
                      {error.message}
                    </span>
                  )}
                </>
              );
            }}
          />
        </div>
      </div>
    )}
    {dropdown && weightDropdown && (
      <div className="xs:w-2/6 md:w-1/6 items-center">
        <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
          <FormField
            control={control}
            name={name}
            render={({ field }) => (
              <WeightDropdown
                initialValue={field.value}
                onWeightChange={(quantityVal) => field.onChange(quantityVal)}
              />
            )}
          />
        </div>
      </div>
    )}
  </>
);

export default GenericFormField;
