'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { Form, FormControl, FormField } from '@/components/ui/form';
import { ArrowLeftIcon } from '@/assets/svgs';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconInput } from '@/components/ui/icon-input';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import QualityDropdown from './qualityDropdown';
import WeightDropdown from './weightDropdown';
import { ErrorIcon } from '@/assets/svgs';
import { calculateZakat } from '@/lib/helpers';
import { GoldIItems } from '@/lib/types';
import StepperComponent from '@/components/ui/stepper';

interface ItemDetailsProps {
  setValue: (value: number) => void;
  value: number;
  setQuality: (value: string) => void;
  setQuantity: (value: string) => void;
  setPrice: (value: string) => void;
  setWeight: (value: string) => void;
  setZakatVal: (value: number) => void;
  setGoldId: (value: string) => void;
  goldId: string;
  userItem: string;
  quality: string;
  quantity: string;
  weight: string;
  price: string;
}

const ItemDetailsSchema = z.object({
  quality: z.string().min(1, { message: 'Quality is required' }),
  quantity: z.string().min(1, { message: 'Quantity is required' }),
  weight: z.string().min(1, { message: 'Weight is required' }),
  price: z.string().min(1, { message: 'Price is required' }),
});

type FormFields = z.infer<typeof ItemDetailsSchema>;

const ItemDetailsForm: React.FC<ItemDetailsProps> = ({
  setValue,
  setQuality,
  setQuantity,
  setPrice,
  setWeight,
  setZakatVal,
  setGoldId,
  goldId,
  userItem,
  value,
  quality,
  quantity,
  weight,
  price,
}) => {
  const searchparams = useSearchParams();
  const id = searchparams.get('id');

  const items: GoldIItems[] =
    useSelector((state: any) => state.items.items) || [];
  const income = useSelector((state: any) => state.income.income);
  const setup = useSelector((state: any) => state.setup.setup);
  const [payableAmount, setPayableAmount] = React.useState<number | null>(null);
  const [item, setItem] = React.useState<string>(userItem);
  const [activeStep, setActiveStep] = React.useState(2);
  const [reason, setReason] = React.useState<string>('');

  const form = useForm<FormFields>({
    resolver: zodResolver(ItemDetailsSchema),
    defaultValues: {
      quality: quality ? quality : '',
      quantity: quantity ? quantity : 'Grams',
      weight: weight ? weight : '',
      price: price ? price : '',
    },
  });

  useEffect(() => {
    if (id) {
      const data = items.filter((item) => item.goldId === id);
      setItem(userItem);
      setReason(data[0].purpose);
      form.reset({
        price: data[0].price,
        weight: data[0].weight,
        quantity: data[0].quantity,
        quality: userItem === data[0].item ? data[0].quality : '',
      });
    }
  }, [id, item]);

  const onSubmit = async (itemsData: FormFields) => {
    const zakatAmount = calculateZakat(
      Number(itemsData.price),
      setup.year,
      setup.generic
    );

    setZakatVal(zakatAmount);

    const zakatCalData = {
      id: goldId,
      quantity: itemsData.quantity,
      weight: itemsData.weight,
      value: zakatAmount || 0,
    };

    const formData = new FormData();

    Object.keys(itemsData).forEach((key) => {
      const value = itemsData[key as keyof FormFields];

      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    try {
      if (id) {
        setGoldId(id);
        setValue(value + 1);
        setQuality(itemsData.quality);
        setQuantity(itemsData.quantity);
        setPrice(itemsData.price);
        setWeight(itemsData.weight);
      } else {
        setValue(value + 1);
        setQuality(itemsData.quality);
        setQuantity(itemsData.quantity);
        setPrice(itemsData.price);
        setWeight(itemsData.weight);
      }
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to Create event', {
        position: 'top-right',
      });
    }
  };

  React.useEffect(() => {}, [item]);

  React.useEffect(() => {
    if (form.watch('price')?.length > 0) {
      const zakat = calculateZakat(
        Number(form.watch('price')),
        setup.year,
        setup.generic
      );
      setPayableAmount(zakat);
    } else {
      setPayableAmount(null);
    }
  }, [form.watch('price')]);

  return (
    <div className="flex flex-col w-full max-w-[960px] justify-center items-center gap-12 rounded-3xl mt-6">
      <StepperComponent activeStep={activeStep} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[82%] gap-5 mb-10"
          data-testid="event-form"
        >
          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
              <Label>4 . What is the purity of this item?</Label>
              <FormField
                control={form.control}
                name="quality"
                render={({ field }) => (
                  <QualityDropdown
                    initialValue={field.value}
                    item={item}
                    onQualityChange={(qualityVal) => field.onChange(qualityVal)}
                  />
                )}
              />
              {form.formState.errors.quality && (
                <span className="text-destructive text-sm flex items-center gap-1 ">
                  <ErrorIcon />
                  {form.formState.errors.quality.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
              <Label>5 . What is the estimated weight of this item?</Label>
              <div className="flex w-full">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <div className="w-full flex flex-col">
                      <FormControl>
                        <IconInput
                          {...field}
                          type="number"
                          min="0"
                          id="weight"
                          aria-label="weight"
                          placeholder="Enter weight"
                          className="bg-inputBg rounded-r-none rounded-l-lg h-[45px] border-inputBorder py-1.5 text-black"
                          error={!!form.formState.errors.weight}
                          data-cy="weight"
                          data-testid="weight"
                        />
                      </FormControl>

                      {form.formState.errors.weight && (
                        <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                          <ErrorIcon />
                          {form.formState.errors.weight.message}
                        </span>
                      )}
                    </div>
                  )}
                />
                <div className="xs:w-2/6 md:w-1/6 items-center">
                  <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <WeightDropdown
                          initialValue={field.value}
                          onWeightChange={(quantityVal) =>
                            field.onChange(quantityVal)
                          }
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
              <Label>6 . What is the price to buy this item?</Label>
              <div className="flex w-full">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <div className="w-full flex flex-col">
                      <FormControl>
                        <IconInput
                          {...field}
                          type="number"
                          min="0"
                          id="price"
                          aria-label="price"
                          placeholder="Enter price"
                          className="bg-inputBg rounded-r-none rounded-lg h-[45px] border-inputBorder py-1.5 text-black"
                          error={!!form.formState.errors.price}
                          data-cy="price"
                          data-testid="price"
                        />
                      </FormControl>

                      {form.formState.errors.price && (
                        <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                          <ErrorIcon />
                          {form.formState.errors.price.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="xs:text-base font-medium sm:text-xl flex-1">
              Your payable zakat for this item is:
            </span>
            <span className="font-semibold text-2xl text-zakatText flex-1 text-end">
              {payableAmount !== null
                ? `$${payableAmount.toFixed(2)}`
                : '$0.00'}
            </span>
          </div>

          <div className="flex flex-col justify-evenly items-center w-full gap-5">
            <hr className="w-full border-[1px] border-solid border-underline" />
            <div className="flex justify-between items-center w-full md:flex-row md:justify-between md:items-center">
              <Link
                className="flex justify-start items-center text-base font-medium"
                href={''}
                onClick={() => {
                  if (value === 1) {
                    setValue(value - 1);
                  } else if (value === 2) {
                    setValue(value - 2);
                  }
                }}
              >
                <ArrowLeftIcon />
                Back
              </Link>
              <Button
                className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover"
                onClick={form.handleSubmit(onSubmit)}
                type="button"
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

export default ItemDetailsForm;
