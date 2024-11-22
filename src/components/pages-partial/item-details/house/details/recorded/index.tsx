import { ErrorIcon } from '@/assets/svgs';
import BackContainer from '@/components/common/backContainer';
import GenericFormField from '@/components/common/form';
import { textConstants } from '@/configs/textConstants';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Form, useForm } from 'react-hook-form';
import { z } from 'zod';

interface HaveYouRecordedAssetsProps {
  options: { id: string; label: string }[];
  setSelectedOption: any;
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
  selectedOption,
  setSelectedOption,
  handleBack,
  handleNext,
}) => {
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
              <GenericFormField
                control={form.control}
                checkbox={true}
                name="alreadyRecorded"
                checkedValue="Yes"
                label={textConstants.formYesCheckboxLabel}
                setSelection={setSelectedOption}
              />

              <GenericFormField
                control={form.control}
                checkbox={true}
                name="alreadyRecorded"
                checkedValue="No"
                label={textConstants.formNoCheckboxLabel}
                setSelection={setSelectedOption}
              />
            </div>
            {form.formState.errors.alreadyRecorded && (
              <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                <ErrorIcon />
                {form.formState.errors.alreadyRecorded.message}
              </span>
            )}
          </div>

          <BackContainer
            nextButtonText={textConstants.formNextButtonText}
            handleBack={handleBack}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        </form>
      </Form>
    </div>
  );
};
