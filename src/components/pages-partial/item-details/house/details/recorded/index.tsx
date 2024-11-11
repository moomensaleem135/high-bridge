import { ArrowLeftIcon, ErrorIcon } from '@/assets/svgs';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { textConstants } from '@/configs/textConstants';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Controller, Form, useForm } from 'react-hook-form';
import { z } from 'zod';

interface HaveYouRecordedAssetsProps {
  options: { id: string; label: string }[];
  setSelectedOption: Dispatch<SetStateAction<string | null>>;
  selectedOption: string | null;
  handleBack: () => void;
  handleNext: () => void;
}

const HaveYouRecordedAssetsSchema = z.object({
  alreadyRecorded: z
    .string()
    .min(1, { message: textConstants.alreadyRecorderValidationText }),
});

type FormFields = z.infer<typeof HaveYouRecordedAssetsSchema>;

const bulletPoints = [
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
];

export const HaveYouRecordedAssets: React.FC<HaveYouRecordedAssetsProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  handleBack,
  handleNext,
}) => {
  const router = useRouter();

  const form = useForm<FormFields>({
    resolver: zodResolver(HaveYouRecordedAssetsSchema),
    defaultValues: {
      alreadyRecorded: selectedOption ? selectedOption : '',
    },
  });

  const onSubmit = (data: FormFields) => {
    handleNext();
  };

  return (
    <div className="flex flex-col w-full max-w-[960px] justify-center items-center gap-12 rounded-3xl">
      <Form
        {...form}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[82%] gap-5 mb-10"
          data-testid="event-form"
        >
          <h2 className="xs:text-xl font-medium sm:text-2xl flex-1 mt-4">
            {textConstants.alreadyRecorderHeading}
          </h2>
          <div className="flex flex-col mt-2 w-full text-base text-black max-md:max-w-full">
            <ul className="flex flex-col pt-2.5 pl-6 mt-2.5 w-full max-md:pl-5 max-md:max-w-full">
              {bulletPoints.map((point, index) => (
                <li
                  key={index}
                  className={`${index > 0 && 'mt-5'} w-full text-base font-regular`}
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="py-8">
            <div className="w-full items-center flex justify-start gap-x-20 pl-4">
              <div className="flex justify-center items-center gap-4">
                <Controller
                  name="alreadyRecorded"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === 'Yes'}
                      onCheckedChange={() => {
                        field.onChange('Yes');
                        setSelectedOption('Yes');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">
                  {textConstants.formYesCheckboxLabel}
                </label>
              </div>
              <div className="flex justify-center items-center gap-4">
                <Controller
                  name="alreadyRecorded"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === 'No'}
                      onCheckedChange={() => {
                        field.onChange('No');
                        setSelectedOption('No');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">
                  {textConstants.formNoCheckboxLabel}
                </label>
              </div>
            </div>
            {form.formState.errors.alreadyRecorded && (
              <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                <ErrorIcon />
                {form.formState.errors.alreadyRecorded.message}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-evenly items-center w-full gap-5">
            <hr className="w-full border-[1px] border-solid border-underline" />
            <div className="flex justify-between items-center w-full md:flex-row md:justify-between md:items-center">
              <Link
                className="flex justify-start items-center text-base font-medium"
                href={''}
                onClick={() => {
                  handleBack();
                }}
              >
                <ArrowLeftIcon />
                {textConstants.formBackButtonText}
              </Link>
              <Button
                className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover px-4"
                onClick={form.handleSubmit(onSubmit)}
              >
                {textConstants.formNextButtonText}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
