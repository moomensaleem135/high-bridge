import { ArrowLeftIcon, ErrorIcon } from '@/assets/svgs';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { HouseIItems } from '@/lib/types';
import { useAppSelector } from '@/store/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { Controller, Form, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

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
  const house: HouseIItems[] = useAppSelector(
    (state: any) => state.house.house
  );
  console.log('house', house);
  const form = useForm<FormFields>({
    resolver: zodResolver(HouseChoiceSchema),
    defaultValues: {
      purpose: '',
    },
  });

  React.useEffect(() => {
    const storedFormData = localStorage.getItem('itemChoiceForm');
    if (storedFormData) {
      form.reset(JSON.parse(storedFormData));
    }
    if (id) {
      const data = house.filter((item) => item.houseId === id);

      form.reset({
        purpose: data[0].item,
      });
    }
  }, [id]);

  const onSubmit = async (itemsData: FormFields) => {
    console.log('in house submit');
    let houseId;
    if (!id) {
      houseId = `house-${Date.now()}`;
    } else {
      houseId = id;
    }

    console.log(houseId);
    const formData = new FormData();
    Object.keys(itemsData).forEach((key) => {
      const value = itemsData[key as keyof FormFields];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });
    try {
      // const response = await createItem(formData); // Uncomment if needed
      if (id) {
        console.log('id in Choice form', id);
        setSelectedPurpose(itemsData.purpose);
        handleNext();
        setHouseId(id);
        // toast.success(`${itemsData.purpose} item edited successfully.`, {
        //   position: 'top-right',
        // });
      } else {
        setSelectedPurpose(itemsData.purpose);
        setHouseId(houseId);
        handleNext();
        // toast.success(`${itemsData.purpose} item selection successful.`, {
        //   position: 'top-right',
        // });
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
              <Link
                className="flex justify-start items-center text-base font-medium"
                href={''}
                onClick={() => handleBack()}
              >
                <ArrowLeftIcon />
                Back
              </Link>
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
  {
    /* <form className="flex flex-col px-1 max-w-[807px]">
      <section className="flex flex-col max-md:max-w-full px-8">
        <h2 className="xs:text-xl font-medium sm:text-2xl flex-1 mb-4">
          Please select the purpose of your house by choosing one of the options
          below:
        </h2>
        <div>
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
          <p className="mt-5 text-lg font-medium text-black max-md:max-w-full">
            Select one option to proceed to the next step.
          </p>
          <div className="flex gap-20 items-center mt-5 max-md:max-w-full">
            
          </div>
        </div>
      </section>
    </form> */
  }
};
