'use client';
import React from 'react';
import { useDispatch, UseDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
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
import { addItems } from '@/store/features/items/golditemsSlice';
import { zakatCal } from '@/store/features/zakat/zakatSlice';

import Spinner from '@/components/common/Spinner';
import { calculateZakat } from '@/lib/helpers';

interface ItemDetailsProps {}

const ItemDetailsSchema = z.object({
  item: z.string().min(1, { message: 'Purpose is required' }),
  amount: z.string().min(1, { message: 'Acount is required' }),
});

type FormFields = z.infer<typeof ItemDetailsSchema>;

const ItemDetailsForm: React.FC<ItemDetailsProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [item, setItem] = React.useState<string>('');
  const [payableAmount, setPayableAmount] = React.useState<number | null>(null);
  const [reason, setReason] = React.useState<string>('');
  const [createItem, { isLoading }] = useCreateItemMutation();

  const form = useForm<FormFields>({
    resolver: zodResolver(ItemDetailsSchema),
    defaultValues: {
      item: '',
      amount: '',
    },
  });



  const onSubmit = async (itemsData: FormFields) => {
    const zakatAmount = calculateZakat(Number(itemsData.amount));

    const itemData = {
      item: itemsData.item,
      amount: itemsData.amount,
      zakat: zakatAmount,
    };

    const formData = new FormData();

    Object.keys(itemsData).forEach((key) => {
      const value = itemsData[key as keyof FormFields];
      console.log(value);
      if (value !== undefined && value !== null) {
        formData.append(key, value as any); // Type assertion for `value` to `any`
      }
    });

    try {
      // const response = await createItem(formData);
      dispatch(addItems(itemData));
      dispatch(zakatCal(zakatAmount));

      form.reset();

      toast.custom((t) => (
        <CustomToast t={t} title={`${itemsData.item} ${itemsData.amount}`} />
      ));
      router.push('/income/income-details/add-items');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to Create event');
    }
  };

  React.useEffect(() => {
    console.log(item);
  }, [item]);

  React.useEffect(() => {
    if (form.watch('amount')) {
      const zakat = calculateZakat(Number(form.watch('amount')));
      setPayableAmount(zakat);
    }
  }, [form.watch('amount')]);

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
                  name="amount"
                  render={({ field }) => (
                    <div className="w-full flex flex-col">
                      <FormControl>
                        <IconInput
                          {...field}
                          type="text"
                          id="amount"
                          aria-label="amount"
                          placeholder=""
                          className="bg-inputBg rounded-lg h-[45px] border-inputBorder py-1.5 text-black"
                          error={!!form.formState.errors.amount}
                          data-cy="amount"
                          data-testid="amount"
                        />
                      </FormControl>

                      {form.formState.errors.amount && (
                        <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                          <ErrorIcon />
                          {form.formState.errors.amount.message}
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
            <div className="flex justify-between items-center w-full md:flex-row md:justify-between md:items-center xs:flex-col-reverse xs:gap-y-4 xs:justify-start xs:items-start">
              <Link
                className="flex justify-start items-center "
                href={''}
                onClick={() => router.back()}
              >
                <ArrowLeftIcon />
                Back
              </Link>

              <Button className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover">
                Add Item
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ItemDetailsForm;
