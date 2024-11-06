'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { Form, FormControl, FormField } from '@/components/ui/form';
import { ArrowLeftIcon } from '@/assets/svgs';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ErrorIcon } from '@/assets/svgs';

import { useCreateItemMutation } from '@/store/features/items/itemsApi';

import Spinner from '@/components/common/Spinner';
import { CashIItems } from '@/lib/types';

interface ItemChoiceProps {
  setValue: (value: number) => void;
  value: number;
  setUserItem: (value: string) => void;
  setCashId: (value: string) => void;
}

const ItemChoiceSchema = z.object({
  item: z.string().min(1, { message: 'Item is required' }),
});

type FormFields = z.infer<typeof ItemChoiceSchema>;

const ItemChoiceForm: React.FC<ItemChoiceProps> = ({
  setValue,
  value,
  setUserItem,
  setCashId,
}) => {
  const router = useRouter();
  const searchparams = useSearchParams();
  const id = searchparams.get('id');
  const cash: CashIItems[] = useSelector((state: any) => state.cash.cash) || [];
  const [item, setItem] = React.useState<string>('');
  const [createItem, { isLoading }] = useCreateItemMutation();

  const form = useForm<FormFields>({
    resolver: zodResolver(ItemChoiceSchema),
    defaultValues: {
      item: '',
    },
  });

  React.useEffect(() => {
    const storedFormData = localStorage.getItem('itemChoiceForm');
    if (storedFormData) {
      form.reset(JSON.parse(storedFormData));
    }
    if (id) {
      const data = cash.filter((item) => item.cashId === id);

      form.reset({
        item: data[0].item,
      });
    }
  }, [id]);

  const onSubmit = async (itemsData: FormFields) => {
    let cashId;

    // Generate a unique goldId (using Date.now for simplicity, you might want to use a better method)
    if (!id) {
      cashId = `cash-${Date.now()}`;
    } else {
      cashId = id;
    }

    const formData = new FormData();

    Object.keys(itemsData).forEach((key) => {
      const value = itemsData[key as keyof FormFields];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any); // Type assertion for `value` to `any`
      }
    });

    try {
      localStorage.setItem('itemChoiceForm', JSON.stringify(itemsData));
      // const response = await createItem(formData); // Uncomment if needed
      if (id) {
        console.log('id in Choice form', id);
        setUserItem(itemsData.item);
        setValue(value + 1);
        setCashId(id);
        // toast.success(`${itemsData.item} item edited successfully.`, {
        //   position: 'top-right',
        // });
      } else {
        setUserItem(itemsData.item);
        setCashId(cashId);
        setValue(value + 1);
        // toast.success(`${itemsData.item} item selection successful.`, {
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

  React.useEffect(() => {}, [item]);

  return (
    <div className="flex flex-col w-full max-w-[960px] justify-center items-center gap-12 rounded-3xl mt-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[82%] gap-5 mb-10"
          data-testid="event-form"
        >
          <Label className="font-medium text-xl">Which item do you have?</Label>
          <div>
            <div className="w-full xl:items-center xl:flex xl:flex-row xl:justify-start xl:gap-x-28 xs:flex-col xs:items-start xs:justify-start xs:gap-y-10 pl-4">
              <div className="flex justify-start items-center gap-4">
                <Controller
                  name="item"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === 'Cash'}
                      onCheckedChange={() => {
                        field.onChange('Cash');
                        setItem('Cash');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">Cash</label>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Controller
                  name="item"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === 'Checking'}
                      onCheckedChange={() => {
                        field.onChange('Checking');
                        setItem('Checking');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">Checking</label>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Controller
                  name="item"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === 'Saving'}
                      onCheckedChange={() => {
                        field.onChange('Saving');
                        setItem('Saving');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">Saving</label>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Controller
                  name="item"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === 'Loan'}
                      onCheckedChange={() => {
                        field.onChange('Loan');
                        setItem('Loan');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">Loan</label>
              </div>
            </div>
            {form.formState.errors.item && (
              <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                <ErrorIcon />
                {form.formState.errors.item.message}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-evenly items-center w-full gap-5">
            <hr className="w-full border-[1px] border-solid border-underline" />
            <div className="flex justify-between items-center w-full md:flex-row md:justify-between md:items-center">
              <div
                className="flex justify-start items-center text-base font-medium cursor-pointer"
                // href={''}
                onClick={() => {
                  if (cash.length === 0) {
                    localStorage.clear();
                    router.push('/income');
                  } else {
                    localStorage.clear();
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

export default ItemChoiceForm;
