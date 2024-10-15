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
import CustomToast from '@/components/common/CustomToast';
import { addCashItems } from '@/store/features/cash-items/cashSlice';
import { zakatCal } from '@/store/features/zakat/zakatSlice';
import { updateCashItem } from '@/store/features/cash-items/cashSlice';
import { editZakat } from '@/store/features/zakat/zakatSlice';

import Spinner from '@/components/common/Spinner';
import { calculateZakat } from '@/lib/helpers';
import { CashIItems } from '@/lib/types';

interface ItemDetailsProps {}

const ItemDetailsSchema = z.object({
  item: z.string().min(1, { message: 'Purpose is required' }),
  quantity: z.string().min(1, { message: 'Amount is required' }),
});

type FormFields = z.infer<typeof ItemDetailsSchema>;

const ItemDetailsForm: React.FC<ItemDetailsProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchparams = useSearchParams();
  const id = searchparams.get('id');
  const cash: CashIItems[] = useSelector((state: any) => state.cash.cash) || [];
  const religion = useSelector((state: any) => state.sect.sect);
  const income = useSelector((state: any) => state.income.income);
  const setup = useSelector((state: any) => state.setup.setup);
  const [item, setItem] = React.useState<string>('');
  const [payableAmount, setPayableAmount] = React.useState<number | null>(null);
  const [reason, setReason] = React.useState<string>('');
  const [createItem, { isLoading }] = useCreateItemMutation();

  const form = useForm<FormFields>({
    resolver: zodResolver(ItemDetailsSchema),
    defaultValues: {
      item: '',
      quantity: '',
    },
  });

  React.useEffect(() => {
    console.log(id);
    if (id) {
      const data = cash.filter((item) => item.cashId === id);
      console.log('in use effect', data, cash);
      form.reset({
        item: data[0].item,
        quantity: data[0].quantity,
      });
      console.log({ data: form.getValues() });
    }
  }, [id]);

  const onSubmit = async (itemsData: FormFields) => {
    const zakatAmount = calculateZakat(
      Number(itemsData.quantity),
      setup.year,
      setup.generic
    );
    let cashId;

    // Generate a unique goldId (using Date.now for simplicity, you might want to use a better method)
    if (!id) {
      console.log('in to set id');
      cashId = `cash-${Date.now()}`;
    } else {
      cashId = id;
    }

    const zakatCalData = {
      id: cashId,
      value: zakatAmount || 0, // Use logical OR for fallback
    };

    const itemData = {
      item: itemsData.item,
      quantity: itemsData.quantity,
      zakat: zakatAmount,
      income: income,
      religion: religion,
      cashId: cashId, // Add the unique goldId to the itemData
    };

    const formData = new FormData();

    Object.keys(itemsData).forEach((key) => {
      const value = itemsData[key as keyof FormFields];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any); // Type assertion for `value` to `any`
      }
    });

    try {
      // const response = await createItem(formData); // Uncomment if needed
      if (id) {
        dispatch(updateCashItem(itemData));
        dispatch(editZakat(zakatCalData));
      } else {
        dispatch(addCashItems(itemData));
        dispatch(zakatCal(zakatCalData));
      }

      form.reset();

      toast.success(`${itemsData.item} ${itemsData.quantity}`, {
        position: 'top-right',
      });

      router.push('/income/income-details/add-items');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to create event', {
        position: 'top-right',
      });
    }
  };

  React.useEffect(() => {
    console.log(item);
  }, [item]);

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
          <Label>1. Which item do you have?</Label>
          <div>
            <div className="w-full items-center flex justify-start gap-8 pl-4">
              <div className="flex justify-center items-center gap-4">
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
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px] border-detailsCheck data-[state=checked]:bg-detailsChecked"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">Cash</label>
              </div>
              <div className="flex justify-center items-center gap-4">
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
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px] border-detailsCheck data-[state=checked]:bg-detailsChecked"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">Checking</label>
              </div>
            </div>
            {form.formState.errors.item && (
              <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                <ErrorIcon />
                {form.formState.errors.item.message}
              </span>
            )}
          </div>

          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
              <Label>2. What is the total amount you have?</Label>
              <div className="flex w-full">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <div className="w-full flex flex-col">
                      <FormControl>
                        <IconInput
                          {...field}
                          type="text"
                          id="amount"
                          aria-label="amount"
                          placeholder="Enter amount"
                          className="bg-inputBg rounded-lg h-[45px] border-inputBorder py-1.5 text-black"
                          error={!!form.formState.errors.quantity}
                          data-cy="amount"
                          data-testid="amount"
                        />
                      </FormControl>

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
            <span className="font-medium text-xl">
              Your payable zakat for this item is:
            </span>
            <span className="font-semibold text-2xl text-zakatText">
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
                onClick={() => router.back()}
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

export default ItemDetailsForm;
