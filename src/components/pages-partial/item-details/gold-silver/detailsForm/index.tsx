'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
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
import PurposeDropdown from './purposeDropdown';
import QualityDropdown from './qualityDropdown';
import WeightDropdown from './weightDropdown';
import { ErrorIcon } from '@/assets/svgs';

import { useCreateItemMutation } from '@/store/features/items/itemsApi';
import CustomToast from '@/components/common/CustomToast';
import { addItemssUrl } from '@/configs/constants';
import { addItems } from '@/store/features/items/golditemsSlice';
import { updateItem } from '@/store/features/items/golditemsSlice';
import { zakatCal } from '@/store/features/zakat/zakatSlice';

import Spinner from '@/components/common/Spinner';
import { calculateZakat } from '@/lib/helpers';
import { GoldItem } from '@/components/pages-partial/add-items/item-section/table';
import { editZakat } from '@/store/features/zakat/zakatSlice';
import { GoldIItems } from '@/lib/types';

interface ItemDetailsProps {}

const ItemDetailsSchema = z.object({
  item: z.string().min(1, { message: 'Item is required' }),
  purpose: z.string().min(1, { message: 'Purpose is required' }),
  usage: z.string().min(0, { message: 'Usage is required' }),
  quality: z.string().min(1, { message: 'Quality is required' }),
  quantity: z.string().min(1, { message: 'Quantity is required' }),
  weight: z.string().min(1, { message: 'Weight is required' }),
  price: z.string().min(1, { message: 'Price is required' }),
});

type FormFields = z.infer<typeof ItemDetailsSchema>;

const ItemDetailsForm: React.FC<ItemDetailsProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const searchparams = useSearchParams();
  const id = searchparams.get('id');

  const religion = useSelector((state: any) => state.sect.sect);
  const items: GoldIItems[] =
    useSelector((state: any) => state.items.items) || [];
  const income = useSelector((state: any) => state.income.income);
  const setup = useSelector((state: any) => state.setup.setup);
  const [payableAmount, setPayableAmount] = React.useState<number | null>(null);
  const [item, setItem] = React.useState<string>('');
  const [reason, setReason] = React.useState<string>('');
  const [createItem, { isLoading }] = useCreateItemMutation();

  const form = useForm<FormFields>({
    resolver: zodResolver(ItemDetailsSchema),
    defaultValues: {
      item: '',
      purpose: '',
      usage: '',
      quality: '',
      quantity: 'Grams',
      weight: '',
      price: '',
    },
  });

  useEffect(() => {
    console.log(id);
    if (id) {
      const data = items.filter((item) => item.goldId === id);
      console.log('in use effect', data, items);
      setItem(data[0].item as string);
      setReason(data[0].purpose);
      form.reset({
        item: data[0].item,
        price: data[0].price,
        weight: data[0].weight,
        quantity: data[0].quantity,
        quality: data[0].quality,
        usage: data[0].usage,
        purpose: data[0].purpose,
      });
      console.log({ data: form.getValues() });
    }
  }, [id]);

  const onSubmit = async (itemsData: FormFields) => {
    console.log('setup data', setup);
    const zakatAmount = calculateZakat(
      Number(itemsData.price),
      setup.year,
      setup.generic
    );
    let goldId;

    const usage = itemsData.usage ? itemsData.usage : '';
    console.log(usage);

    if (!id) {
      console.log('in to set id');
      goldId = `gold-${Date.now()}`;
    } else {
      goldId = id;
    }

    const itemData = {
      item: itemsData.item,
      purpose: itemsData.purpose,
      usage: usage,
      quality: itemsData.quality,
      weight: itemsData.weight,
      quantity: itemsData.quantity,
      price: itemsData.price,
      income: income,
      religion: religion,
      zakat: zakatAmount,
      goldId: goldId,
    };

    const zakatCalData = {
      id: goldId,
      quantity: itemsData.quantity,
      weight: itemsData.weight,
      value: zakatAmount || 0,
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
      if (id) {
        dispatch(updateItem(itemData));
        dispatch(editZakat(zakatCalData));
        toast.success(`${itemsData.item} item edited successfully.`, {
          position: 'top-right',
        });
      } else {
        dispatch(addItems(itemData));
        dispatch(zakatCal(zakatCalData));
        toast.success(`${itemsData.item} item added successfully.`, {
          position: 'top-right',
        });
      }

      form.reset();

      router.push('/income/income-details/add-items');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to Create event', {
        position: 'top-right',
      });
    }
  };

  React.useEffect(() => {}, [item]);

  React.useEffect(() => {
    console.log('setup', setup);
    if (form.watch('price').length > 0) {
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[82%] gap-5 mb-10"
          data-testid="event-form"
        >
          <Label>1 . Which item do you have?</Label>
          <div>
            <div className="w-full items-center flex justify-start gap-8 pl-4">
              <div className="flex justify-center items-center gap-4">
                <Controller
                  name="item"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === 'Gold'}
                      onCheckedChange={() => {
                        field.onChange('Gold');
                        setItem('Gold');
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
                        setItem('Silver');
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
          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-y-2 items-start">
              <Label>2 . What is the purpose of this item?</Label>
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => {
                  console.log({ field });

                  return (
                    <PurposeDropdown
                      initialValue={field.value}
                      onPurposeChange={(purposeVal) =>
                        field.onChange(purposeVal)
                      }
                      setReason={setReason}
                    />
                  );
                }}
              />
              {form.formState.errors.purpose && (
                <span className="text-destructive text-sm flex items-center gap-1">
                  <ErrorIcon />
                  {form.formState.errors.purpose.message}
                </span>
              )}
            </div>
          </div>

          {reason === 'personal' && (
            <>
              <Label>
                3 . Did you use this item at least once in the last one year?
              </Label>
              <div className="w-full items-center flex justify-start gap-8 pl-4">
                <div className="flex justify-center items-center gap-4">
                  <Controller
                    name="usage"
                    control={form.control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value === 'Yes'}
                        onCheckedChange={() => field.onChange('Yes')}
                        className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                      />
                    )}
                  />
                  <label htmlFor="myCheckbox">Yes</label>
                </div>
                <div className="flex justify-center items-center gap-4">
                  <Controller
                    name="usage"
                    control={form.control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value === 'No'}
                        onCheckedChange={() => field.onChange('No')}
                        className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                      />
                    )}
                  />
                  <label htmlFor="myCheckbox">No</label>
                </div>
              </div>
            </>
          )}

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
                          type="text"
                          id="weight"
                          aria-label="weight"
                          placeholder=""
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
                          type="text"
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
