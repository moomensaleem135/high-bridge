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
import PurposeDropdown from './purposeDropdown';
import QualityDropdown from './qualityDropdown';
import WeightDropdown from './weightDropdown';
import { ErrorIcon } from '@/assets/svgs';

import { useCreateItemMutation } from '@/store/features/items/itemsApi';
import CustomToast from '@/components/common/CustomToast';
import { addItemssUrl } from '@/configs/constants';
import { addItems } from '@/store/features/items/itemsSlice';

import Spinner from '@/components/common/Spinner';

interface ItemDetailsProps {}

const ItemDetailsSchema = z.object({
  item: z.string(),
  purpose: z.string().min(1, { message: 'purpose is required' }),
  usage: z.string().min(1, { message: 'usage is required' }),
  quality: z.string().min(1, { message: 'quality is required' }),
  quantity: z.string().min(1, { message: 'quantity is required' }),
  weight: z.string().min(1, { message: 'weight is required' }),
});

type FormFields = z.infer<typeof ItemDetailsSchema>;

const ItemDetailsForm: React.FC<ItemDetailsProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [createItem, { isLoading }] = useCreateItemMutation();

  const form = useForm<FormFields>({
    resolver: zodResolver(ItemDetailsSchema),
    defaultValues: {
      item: '',
      purpose: '',
      usage: '',
      quality: '',
      weight: '',
    },
  });

  const onSubmit = async (itemsData: FormFields) => {
    console.log('in submit');

    const itemData = {
      item: itemsData.item,
      purpose: itemsData.purpose,
      usage: itemsData.usage,
      quality: itemsData.quality,
      weight: itemsData.weight,
      quantity: itemsData.quantity,
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
      form.reset();

      toast.custom((t) => (
        <CustomToast
          t={t}
          title={`${itemsData.item} ${itemsData.purpose} ${itemsData.usage} ${itemsData.quality}`}
        />
      ));
      router.push('/add-items');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to Create event');
    }
  };

  return (
    <div className="flex flex-col w-4/6 justify-center items-center gap-12 rounded-3xl mt-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[82%] gap-5 mb-10"
          data-testid="event-form"
        >
          <Label>1 . Which item do you have?</Label>
          <div className="w-full items-center flex justify-start gap-8 pl-4">
            <div className="flex justify-center items-center gap-4">
              <Controller
                name="item"
                control={form.control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value === 'Gold'}
                    onCheckedChange={() => field.onChange('Gold')}
                    className="rounded-sm h-5 w-5 mt-0.5 border-[2px] border-[#79747E] data-[state=checked]:bg-[#79747E]"
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
                    onCheckedChange={() => field.onChange('Silver')}
                    className="rounded-sm h-5 w-5 mt-0.5 border-[2px] border-[#79747E] data-[state=checked]:bg-[#79747E]"
                  />
                )}
              />
              <label htmlFor="myCheckbox">Silver</label>
            </div>
          </div>
          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-y-2 items-start">
              <Label>2 . What is the purpose of this item?</Label>
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <PurposeDropdown
                    initialValue={field.value}
                    onPurposeChange={(purposeVal) => field.onChange(purposeVal)}
                  />
                )}
              />
            </div>
          </div>

          <Label>
            3 . Did you use this item at least once in the last one year??
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
                    className="rounded-sm h-5 w-5 mt-0.5 border-[2px] border-[#79747E] data-[state=checked]:bg-[#79747E]"
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
                    className="rounded-sm h-5 w-5 mt-0.5 border-[2px] border-[#79747E] data-[state=checked]:bg-[#79747E]"
                  />
                )}
              />
              <label htmlFor="myCheckbox">No</label>
            </div>
          </div>

          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
              <Label>4 . What is the purity of this item?</Label>
              <FormField
                control={form.control}
                name="quality"
                render={({ field }) => (
                  <QualityDropdown
                    initialValue={field.value}
                    onQualityChange={(qualityVal) => field.onChange(qualityVal)}
                  />
                )}
              />
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
                          className="bg-outline rounded-r-none rounded-l-lg h-[50px]"
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
                <div className="w-1/6 items-center">
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

          <div className="flex flex-col justify-evenly items-center w-full gap-5 mt-6">
            <hr className="w-full border-[1px] border-solid border-[#DFE3E6]" />
            <div className="flex justify-between items-center w-full">
              <Link
                className="flex justify-start items-center "
                href={addItemssUrl}
              >
                <ArrowLeftIcon />
                Back
              </Link>

              <Button className="bg-detailsBtn text-btnText font-normal hover:bg-[#5e5f5d]">
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
