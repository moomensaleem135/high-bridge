import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { Controller, Form, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { ArrowLeftIcon, ErrorIcon } from '@/assets/svgs';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { HouseIItems } from '@/lib/types';
import { useAppSelector } from '@/store/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

interface HousePurposeFormProps {
  setSelectedPurpose: any;
  purposeOptions: any[];
  selectedPurpose: string | null;
  setHouseId: (value: string) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const HouseChoiceSchema = z.object({
  purpose: z.string().min(1, { message: 'Purpose is required' }),
});

type FormFields = z.infer<typeof HouseChoiceSchema>;

export const HousePurposeForm: React.FC<HousePurposeFormProps> = ({
  setSelectedPurpose,
  purposeOptions,
  selectedPurpose,
  setHouseId,
  handleNext,
  handleBack,
}) => {
  const searchparams = useSearchParams();
  const id = searchparams.get('id');
  const router = useRouter();

  const house: HouseIItems[] = useAppSelector(
    (state: any) => state.house.house
  );
  const form = useForm<FormFields>({
    resolver: zodResolver(HouseChoiceSchema),
    defaultValues: {
      purpose: selectedPurpose ? selectedPurpose : '',
    },
  });

  React.useEffect(() => {
    if (id) {
      const data = house.filter((item) => item.houseId === id);

      form.reset({
        purpose: data[0].item,
      });
    }
  }, [id]);

  const onSubmit = async (itemsData: FormFields) => {
    let houseId;
    if (!id) {
      houseId = `house-${Date.now()}`;
    } else {
      houseId = id;
    }

    const formData = new FormData();
    Object.keys(itemsData).forEach((key) => {
      const value = itemsData[key as keyof FormFields];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });
    try {
      if (id) {
        setSelectedPurpose(itemsData.purpose);
        handleNext();
        setHouseId(id);
      } else {
        setSelectedPurpose(itemsData.purpose);
        setHouseId(houseId);
        handleNext();
      }
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to create event', {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[960px] justify-center items-center gap-12 rounded-3xl">
      <Form
        {...form}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[82%] gap-5 mb-10"
          data-testid="event-form"
        >
          <h2 className="xs:text-xl font-medium sm:text-2xl flex-1">
            Please select the purpose of your house by choosing one of the
            options below:
          </h2>
          <ul className="list-inside list-disc  pl-0">
            {purposeOptions.map((option) => (
              <li key={option.id} className="mb-2">
                <span className="text-lg font-semibold leading-9">
                  {option.label}:
                </span>
                <span className="text-lg font-regular leading-9">
                  {' '}
                  {option.description}
                </span>
              </li>
            ))}
          </ul>

          <Label className="font-medium text-xl">
            Select one option to proceed to the next step.
          </Label>
          <div>
            <div className="w-full items-center flex justify-start gap-x-20 pl-4">
              <div className="flex justify-center items-center gap-4">
                <Controller
                  name="purpose"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === 'Personal'}
                      onCheckedChange={() => {
                        field.onChange('Personal');
                        setSelectedPurpose('Personal');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">Personal Use</label>
              </div>
              <div className="flex justify-center items-center gap-4">
                <Controller
                  name="purpose"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === 'Rental'}
                      onCheckedChange={() => {
                        field.onChange('Rental');
                        setSelectedPurpose('Rental');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">Rental</label>
              </div>
              <div className="flex justify-center items-center gap-4">
                <Controller
                  name="purpose"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      disabled
                      checked={field.value === 'Saving'}
                      onCheckedChange={() => {
                        field.onChange('Saving');
                        setSelectedPurpose('Saving');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">Saving</label>
              </div>
              <div className="flex justify-center items-center gap-4">
                <Controller
                  name="purpose"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === 'Trading'}
                      onCheckedChange={() => {
                        field.onChange('Trading');
                        setSelectedPurpose('Trading');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">Trading</label>
              </div>
            </div>
            {form.formState.errors.purpose && (
              <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                <ErrorIcon />
                {form.formState.errors.purpose.message}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-evenly items-center w-full gap-5">
            <hr className="w-full border-[1px] border-solid border-underline" />
            <div className="flex justify-between items-center w-full md:flex-row md:justify-between md:items-center">
              <div
                className="flex justify-start items-center text-base font-medium"
                onClick={() => {
                  router.push('/income');
                }}
              >
                <ArrowLeftIcon />
                Back
              </div>
              <Button
                className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover"
                onClick={form.handleSubmit(onSubmit)}
              >
                Next
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
