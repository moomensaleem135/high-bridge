'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';

import { Form } from '@/components/ui/form';
import { ArrowLeftIcon } from '@/assets/svgs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ErrorIcon } from '@/assets/svgs';
import StepperComponent from '@/components/ui/stepper';
import { GoldIItems } from '@/lib/types';

interface GoldChoiceProps {
  setValue: (value: number) => void;
  value: number;
  item: string;
  purpose: string;
  setUserItem: (value: string) => void;
  setPurpose: (value: string) => void;
  setGoldId: (value: string) => void;
}

const GoldChoiceSchema = z.object({
  item: z.string().min(1, { message: 'Item is required' }),
  purpose: z.string().min(1, { message: 'Purpose is required' }),
});

type FormFields = z.infer<typeof GoldChoiceSchema>;

const GoldChoiceForm: React.FC<GoldChoiceProps> = ({
  setValue,
  value,
  setUserItem,
  setPurpose,
  setGoldId,
  purpose,
  item,
}) => {
  const router = useRouter();
  const searchparams = useSearchParams();
  const id = searchparams.get('id');
  const gold: GoldIItems[] =
    useSelector((state: any) => state.items.items) || [];
  const [activeStep, setActiveStep] = React.useState(0);

  const form = useForm<FormFields>({
    resolver: zodResolver(GoldChoiceSchema),
    defaultValues: {
      item: item ? item : '',
      purpose: purpose ? purpose : '',
    },
  });

  React.useEffect(() => {
    if (id) {
      const data = gold.filter((item) => item.goldId === id);

      form.reset({
        item: data[0].item,
        purpose: data[0].purpose,
      });
    }
  }, [id]);

  const onSubmit = async (itemsData: FormFields) => {
    let goldId;

    if (!id) {
      goldId = `gold-${Date.now()}`;
    } else {
      goldId = id;
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
        setUserItem(itemsData.item);
        setPurpose(itemsData.purpose);
        setValue(value + 1);
        setGoldId(id);
      } else {
        setUserItem(itemsData.item);
        setPurpose(itemsData.purpose);
        setGoldId(goldId);
        setValue(value + 1);
      }
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to create event', {
        position: 'top-right',
      });
    }
  };

  React.useEffect(() => {}, [item]);

  return (
    <div className="flex flex-col w-full max-w-[960px] justify-center items-center gap-12 rounded-3xl mt-6">
      <StepperComponent activeStep={activeStep} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[82%] gap-5 mb-10"
          data-testid="event-form"
        >
          <Label className="font-medium text-xl">Which item do you have?</Label>
          <div>
            <div className="w-full items-center flex justify-start xs:gap-x-10 md:gap-x-28 pl-4">
              <div className="flex justify-center items-center gap-4">
                <Controller
                  name="item"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === 'Gold'}
                      onCheckedChange={() => {
                        field.onChange('Gold');
                        setUserItem('Gold');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">Gold</label>
              </div>
              <div className="flex justify-center items-center gap-4">
                <Controller
                  name="item"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === 'Silver'}
                      onCheckedChange={() => {
                        field.onChange('Silver');
                        setUserItem('Silver');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">Silver</label>
              </div>
            </div>
            {form.formState.errors.item && (
              <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                <ErrorIcon />
                {form.formState.errors.item.message}
              </span>
            )}
          </div>

          <Label className="font-medium text-xl">
            What is the purpose of this item?
          </Label>
          <div>
            <div className="w-full items-center flex justify-start xs:gap-x-10 md:gap-x-20 pl-4">
              <div className="flex justify-center items-center gap-4">
                <Controller
                  name="purpose"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === 'Personal'}
                      onCheckedChange={() => {
                        field.onChange('Personal');
                        setUserItem('Personal');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">Personal</label>
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
                        setUserItem('Saving');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">Saving</label>
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
                className="flex justify-start items-center text-base font-medium cursor-pointer"
                onClick={() => {
                  if (gold?.length === 0) {
                    router.push('/income');
                  } else {
                    router.back();
                  }
                }}
              >
                <ArrowLeftIcon />
                Back
              </div>
              {id ? (
                <Button className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover">
                  Next
                </Button>
              ) : (
                <Button className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover">
                  Next
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GoldChoiceForm;
