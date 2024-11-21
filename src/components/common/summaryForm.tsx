'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { Form, FormField } from '@/components/ui/form';
import { ArrowLeftIcon, ErrorIcon } from '@/assets/svgs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { textConstants } from '@/configs/textConstants';
import BackFlow from './backFlow';

interface SummaryProps {
  handleBack: () => void;
  value: number;
  name: string;
  price: string;
  Id: string;
  item: string;
  zakatVal: number;
  onSubmit: (data: FormFields) => void;
}

const SummarySchema = z.object({
  item: z.string().min(0, { message: textConstants.itemValidationText }),
  quantity: z
    .string()
    .min(0, { message: textConstants.quantityValidationText }),
  name: z.string().min(0, { message: textConstants.nameValidationText }),
});

type FormFields = z.infer<typeof SummarySchema>;

const SummaryForm: React.FC<SummaryProps> = ({
  handleBack,
  value,
  name,
  price,
  Id,
  item,
  zakatVal,
  onSubmit,
}) => {
  const form = useForm<FormFields>({
    resolver: zodResolver(SummarySchema),
    defaultValues: { item, quantity: price, name },
  });
  const searchparams = useSearchParams();
  const id = searchparams.get('id');

  const handleFormSubmit = async (data: FormFields) => {
    try {
      await onSubmit(data); // Call the onSubmit callback
      form.reset();
    } catch (error) {
      console.error(textConstants.errorInCreatingEventMsg, error);
      toast.error(textConstants.failedToCreateEventMsg);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[960px] justify-center items-center gap-12 rounded-3xl mt-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col w-[82%] gap-5 mb-10"
          data-testid="event-form"
        >
          <div className="flex flex-col gap-y-2">
            <Label className="font-medium text-xl">
              {textConstants.itemLabel}
            </Label>
            <div className="w-full items-center flex justify-start">
              <span className="font-normal text-base">{item}</span>
            </div>
          </div>
          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
              <Label className="font-medium text-lg">
                {textConstants.itemNameLabel}
              </Label>
              <div className="flex w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <div className="w-full flex flex-col">
                      <span className="font-normal text-base">{name}</span>
                      {form.formState.errors.name && (
                        <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                          <ErrorIcon />
                          {form.formState.errors.name.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
              <Label className="font-medium text-lg">
                {textConstants.itemQuantityLabel}
              </Label>
              <div className="flex w-full">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <div className="w-full flex flex-col">
                      <span>${price}</span>
                      {form.formState.errors.quantity && (
                        <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                          <ErrorIcon />
                          {form.formState.errors.quantity.message}
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
              {textConstants.zakatPayableText}
            </span>
            <span className="font-semibold text-2xl text-zakatText flex-1 text-end">
              {zakatVal !== null ? `$${zakatVal.toFixed(2)}` : '$0.00'}
            </span>
          </div>

          {/* <div className="flex flex-col justify-evenly items-center w-full gap-5">
            <hr className="w-full border-[1px] border-solid border-underline" />
            <div className="flex justify-between items-center w-full md:flex-row md:justify-between md:items-center">
              <Link
                className="flex justify-start items-center text-base font-medium"
                href={''}
                onClick={handleBack}
              >
                <ArrowLeftIcon />
                {textConstants.formBackButtonText}
              </Link>
              <Button className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover">
                {id
                  ? textConstants.formEditItemButton
                  : textConstants.formAddItemButton}
              </Button>
            </div>
          </div> */}
          <BackFlow
            nextButtonText={
              id
                ? textConstants.formEditItemButton
                : textConstants.formAddItemButton
            }
            handleBack={handleBack}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        </form>
      </Form>
    </div>
  );
};

export default SummaryForm;
