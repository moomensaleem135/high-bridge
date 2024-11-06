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
import { addItems } from '@/store/features/items/golditemsSlice';
import { updateItem } from '@/store/features/items/golditemsSlice';

import Spinner from '@/components/common/Spinner';
import { calculateZakat } from '@/lib/helpers';
import { GoldIItems } from '@/lib/types';
import { useAppSelector } from '@/store/hooks';

interface GoldSummaryProps {
  setValue: (value: number) => void;
  value: number;
  purpose: string;
  quality: string;
  quantity: string;
  price: string;
  weight: string;
  goldId: string;
  item: string;
  zakatVal: number;
  selection: string;
}

const GoldSummarySchema = z.object({
  item: z.string().min(0, { message: 'Item is required' }),
  purpose: z.string().min(0, { message: 'Purpose is required' }),
  quality: z.string().min(0, { message: 'Quality is required' }),
  quantity: z.string().min(0, { message: 'Quantity is required' }),
  weight: z.string().min(0, { message: 'Weight is required' }),
  price: z.string().min(0, { message: 'Price is required' }),
  selection: z.string().min(0, { message: 'Selection is required' }).optional(),
});

type FormFields = z.infer<typeof GoldSummarySchema>;

const GoldSummaryForm: React.FC<GoldSummaryProps> = ({
  setValue,
  value,
  purpose,
  quality,
  quantity,
  price,
  weight,
  goldId,
  item,
  zakatVal,
  selection,
}) => {
  console.log('cash id passed to summary through prop :', goldId);
  console.log(item, purpose, quality, quantity, weight, price, selection);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchparams = useSearchParams();
  const id = searchparams.get('id');
  const items: GoldIItems[] =
    useSelector((state: any) => state.items.items) || [];
  const religion = useSelector((state: any) => state.sect.sect);
  const income = useSelector((state: any) => state.income.income);
  const setup = useSelector((state: any) => state.setup.setup);
  const [payableAmount, setPayableAmount] = React.useState<number | null>(null);
  const [createItem, { isLoading }] = useCreateItemMutation();

  const form = useForm<FormFields>({
    resolver: zodResolver(GoldSummarySchema),
    defaultValues: {
      item: '',
      quantity: '',
      purpose: '',
      quality: '',
      weight: '',
      price: '',
      selection: '',
    },
  });

  React.useEffect(() => {
    if (id) {
      console.log(id);
      const data = items.filter((item) => item.goldId === id);
      console.log('data', data);
      form.reset({
        item: data[0].item,
        price: data[0].price,
        weight: data[0].weight,
        quantity: data[0].quantity,
        quality: data[0].quality,
        purpose: data[0].purpose,
      });
    }
  }, [id]);

  const onSubmit = async (itemsData: FormFields) => {
    const zakatAmount = calculateZakat(
      Number(itemsData.quantity),
      setup.year,
      setup.generic
    );

    console.log('in form submit');

    const itemData = {
      item: item,
      purpose: purpose,
      quality: quality,
      weight: weight,
      quantity: quantity,
      price: price,
      income: income,
      religion: religion,
      zakat: zakatVal,
      goldId: goldId,
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
      // const response = await createItem(formData); // Uncomment if needed
      if (id) {
        console.log(id);
        console.log('in updating item');
        dispatch(updateItem(itemData));
        toast.success(`${itemsData.item} item edited successfully.`, {
          position: 'top-right',
        });
      } else {
        dispatch(addItems(itemData));
        toast.success(`${itemsData.item} item added successfully.`, {
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

            <div className="flex w-full">
              <FormField
                control={form.control}
                name="item"
                render={({ field }) => (
                  <div className="w-full flex flex-col">
                    <span>{item}</span>

                    {form.formState.errors.item && (
                      <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                        <ErrorIcon />
                        {form.formState.errors.item.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
              <Label className="font-medium text-lg">
                What is the purpose of this item?
              </Label>
              <div className="flex w-full">
                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <div className="w-full flex flex-col">
                      <span>{purpose}</span>

                      {form.formState.errors.purpose && (
                        <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                          <ErrorIcon />
                          {form.formState.errors.purpose.message}
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
                Does this accessible level in your society?
              </Label>
              <div className="flex w-full">
                <FormField
                  control={form.control}
                  name="selection"
                  render={({ field }) => (
                    <div className="w-full flex flex-col">
                      <span>{selection}</span>

                      {form.formState.errors.selection && (
                        <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                          <ErrorIcon />
                          {form.formState.errors.selection.message}
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
                What is the purity of this item?
              </Label>
              <div className="flex w-full">
                <FormField
                  control={form.control}
                  name="quality"
                  render={({ field }) => (
                    <div className="w-full flex flex-col">
                      <span>{quality}</span>

                      {form.formState.errors.quality && (
                        <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                          <ErrorIcon />
                          {form.formState.errors.quality.message}
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
                What is the estimated weight of this item?
              </Label>
              <div className="w-full items-center flex justify-start">
                <div className="flex justify-center items-center">
                  <span className="font-normal text-base">
                    {`${weight} ${quantity}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
              <Label className="font-medium text-lg">
                What is the price to buy this item?
              </Label>
              <div className="flex w-full">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <div className="w-full flex flex-col">
                      <span>{price}</span>

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
                <Button
                  className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover"
                  onClick={form.handleSubmit(onSubmit)}
                >
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

export default GoldSummaryForm;
