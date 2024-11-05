'use client';
import React from 'react';
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { Form, FormControl, FormField } from '@/components/ui/form';
import { ArrowLeftIcon } from '@/assets/svgs';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconInput } from '@/components/ui/icon-input';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ErrorIcon } from '@/assets/svgs';

import { useCreateItemMutation } from '@/store/features/items/itemsApi';
import { addCashItems } from '@/store/features/cash-items/cashSlice';
import { zakatCal } from '@/store/features/zakat/zakatSlice';
import { updateCashItem } from '@/store/features/cash-items/cashSlice';
import { editZakat } from '@/store/features/zakat/zakatSlice';

import Spinner from '@/components/common/Spinner';
import { calculateZakat } from '@/lib/helpers';
import { CashIItems } from '@/lib/types';
import { useAppSelector } from '@/store/hooks';

interface SummaryProps {
  setValue: (value: number) => void;
  value: number;
  name: string;
  price: string;
  cashId: string;
  item: string;
  zakatVal: number;
}

const SummarySchema = z.object({
  item: z.string().min(0, { message: 'Purpose is required' }),
  quantity: z.string().min(0, { message: 'Amount is required' }),
  name: z.string().min(0, { message: 'Name of entered item is required' }),
});

type FormFields = z.infer<typeof SummarySchema>;

const SummaryForm: React.FC<SummaryProps> = ({
  setValue,
  value,
  name,
  price,
  cashId,
  item,
  zakatVal,
}) => {
  console.log('cash id passed to summary through prop :', cashId);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchparams = useSearchParams();
  const id = searchparams.get('id');
  const cash: CashIItems[] = useSelector((state: any) => state.cash.cash) || [];
  const religion = useSelector((state: any) => state.sect.sect);
  const income = useSelector((state: any) => state.income.income);
  const setup = useSelector((state: any) => state.setup.setup);
  const [payableAmount, setPayableAmount] = React.useState<number | null>(null);
  const [createItem, { isLoading }] = useCreateItemMutation();

  const form = useForm<FormFields>({
    resolver: zodResolver(SummarySchema),
    defaultValues: {
      item: '',
      quantity: '',
      name: '',
    },
  });

  React.useEffect(() => {
    if (id) {
      const data = cash.filter((item) => item.cashId === id);

      form.reset({
        item: data[0].item,
        quantity: data[0].quantity,
        name: data[0].name,
      });
    }
  }, [id]);

  const onSubmit = async (itemsData: FormFields) => {
    const zakatAmount = calculateZakat(
      Number(itemsData.quantity),
      setup.year,
      setup.generic
    );

    const itemData = {
      item: item,
      quantity: price,
      zakat: zakatVal,
      income: income,
      name: name,
      religion: religion,
      cashId: cashId, // Add the unique goldId to the itemData
    };

    const formData = new FormData();

    console.log('itemsData', itemsData);

    Object.keys(itemsData).forEach((key) => {
      const value = itemsData[key as keyof FormFields];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any); // Type assertion for `value` to `any`
      }
    });

    try {
      localStorage.clear();
      // const response = await createItem(formData); // Uncomment if needed
      if (id) {
        console.log(id);
        dispatch(updateCashItem(itemData));
        toast.success(`${itemsData.name} item edited successfully.`, {
          position: 'top-right',
        });
      } else {
        dispatch(addCashItems(itemData));
        toast.success(`${itemsData.name} item added successfully.`, {
          position: 'top-right',
        });
      }

      form.reset();
      router.push('/income/income-details/add-items');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to create event', {
        position: 'top-right',
      });
    }
  };

  React.useEffect(() => {}, [item]);

  React.useEffect(() => {
    if (form.watch('quantity')) {
      const zakat = calculateZakat(
        Number(form.watch('quantity')),
        setup.year,
        setup.generic
      );
      setPayableAmount(zakat);
    } else {
      setPayableAmount(null);
    }
  }, [form.watch('quantity')]);

  return (
    <div className="flex flex-col w-full max-w-[960px] justify-center items-center gap-12 rounded-3xl mt-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[82%] gap-5 mb-10"
          data-testid="event-form"
        >
          <div className="flex flex-col gap-y-2">
            <Label className="font-medium text-xl">
              Which item do you have?
            </Label>

            <div className="w-full items-center flex justify-start">
              <div className="flex justify-center items-center">
                <span className="font-normal text-base">{item}</span>
              </div>
            </div>
          </div>
          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
              <Label className="font-medium text-lg">
                What Should the Title for this Item be?
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
                What is the balance of this account on the zakat pay date?
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
              Your payable zakat for this item is:
            </span>
            <span className="font-semibold text-2xl text-zakatText flex-1 text-end">
              {zakatVal !== null ? `$${zakatVal.toFixed(2)}` : '$0.00'}
            </span>
          </div>

          <div className="flex flex-col justify-evenly items-center w-full gap-5">
            <hr className="w-full border-[1px] border-solid border-underline" />
            <div className="flex justify-between items-center w-full md:flex-row md:justify-between md:items-center">
              <Link
                className="flex justify-start items-center text-base font-medium"
                href={''}
                onClick={() => setValue(value - 1)}
              >
                <ArrowLeftIcon />
                Back
              </Link>
              {id ? (
                <Button className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover">
                  Update Item
                </Button>
              ) : (
                <Button className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover">
                  Add Item
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SummaryForm;
