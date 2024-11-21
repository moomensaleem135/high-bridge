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
import { textConstants } from '@/configs/textConstants';
import BackFlow from '@/components/common/backFlow';

interface HousePurposeFormProps {
  setSelectedPurpose: any;
  purposeOptions: any[];
  selectedPurpose: string | null;
  setHouseId: (value: string) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const HouseChoiceSchema = z.object({
  purpose: z.string().min(1, { message: textConstants.purposeValidationText }),
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
      console.error(textConstants.errorInCreatingEventMsg, error);
      toast.error(textConstants.failedToCreateEventMsg);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[960px] justify-center items-center gap-12 rounded-3xl pl-10 pr-10">
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
            {textConstants.houseOptionsText}
          </h2>
          <ul className="list-inside list-disc  pl-0">
            {purposeOptions.map((option) => (
              <li key={option.id} className="mb-2">
                <span className="md:text-lg xs:text-base font-semibold leading-9">
                  {option.label}:
                </span>
                <span className="md:text-lg xs:text-sm font-regular leading-9">
                  {' '}
                  {option.description}
                </span>
              </li>
            ))}
          </ul>

          <Label className="font-medium md:text-xl xs:text-base">
            {textConstants.housePurposeLabel}
          </Label>
          <div>
            <div className="w-full items-center flex justify-start gap-x-20 pr-12 min-xs:flex-col max-[830px]:flex-col xs:justify-start xs:items-start">
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
                <label htmlFor="myCheckbox">
                  {textConstants.housePersonalUseCheckboxLabel}
                </label>
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
                <label htmlFor="myCheckbox">
                  {textConstants.houseRentalUseCheckboxLabel}
                </label>
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
                <label htmlFor="myCheckbox">
                  {textConstants.houseSavingUseCheckboxLabel}
                </label>
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
                <label htmlFor="myCheckbox">
                  {textConstants.houseTradingUseCheckboxLabel}
                </label>
              </div>
            </div>
            {form.formState.errors.purpose && (
              <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                <ErrorIcon />
                {form.formState.errors.purpose.message}
              </span>
            )}
          </div>

          {/* <div className="flex flex-col justify-evenly items-center w-full gap-5">
            <hr className="w-full border-[1px] border-solid border-underline" />
            <div className="flex justify-between items-center w-full md:flex-row md:justify-between md:items-center">
              <div
                className="flex justify-start items-center text-base font-medium cursor-pointer"
                onClick={() => {
                  if (house?.length === 0) {
                    router.push('/income');
                  } else {
                    router.push('/income/income-details/add-items');
                  }
                }}
              >
                <ArrowLeftIcon />
                {textConstants.formBackButtonText}
              </div>
              <Button
                className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover"
                onClick={form.handleSubmit(onSubmit)}
              >
                {textConstants.formNextButtonText}
              </Button>
            </div>
          </div> */}
          <BackFlow
            nextButtonText={textConstants.formNextButtonText}
            incomeArray={house}
            routeOne="/income"
            routeTwo="/income/income-details/add-items"
            onSubmit={form.handleSubmit(onSubmit)}
          />
        </form>
      </Form>
    </div>
  );
};
