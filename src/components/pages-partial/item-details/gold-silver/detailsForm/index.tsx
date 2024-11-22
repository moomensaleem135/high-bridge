'use client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { calculateZakat } from '@/lib/helpers';
import { GoldIItems } from '@/lib/types';
import StepperComponent from '@/components/ui/stepper';
import { textConstants } from '@/configs/textConstants';
import { setPrevItem } from '@/store/features/prev-item/prevItemSlice';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import BackContainer from '@/components/common/backContainer';
import GenericFormField from '@/components/common/form';

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
  purpose: string;
}

const ItemDetailsSchema = z.object({
  quality: z.string().min(1, { message: textConstants.qualityValidationText }),
  quantity: z
    .string()
    .min(1, { message: textConstants.quantityValidationText }),
  weight: z.string().min(1, { message: textConstants.weightValidationText }),
  price: z.string().min(1, { message: textConstants.priceValidationText }),
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
  purpose,
}) => {
  const searchparams = useSearchParams();
  const id = searchparams.get('id');
  const prevItem = useAppSelector((state: any) => state.prevItem.prevItem);
  const dispatch = useAppDispatch();

  const items: GoldIItems[] =
    useSelector((state: any) => state.items.items) || [];
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

  React.useEffect(() => {
    if (item !== prevItem) {
      setQuality('');
      form.setValue('quality', '');
      setItem(userItem);
    }
  }, [item, prevItem]);

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
      dispatch(setPrevItem(userItem));
    } catch (error) {
      console.error(textConstants.errorInCreatingEventMsg, error);
      toast.error(textConstants.failedToCreateEventMsg);
    }
  };

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
          <GenericFormField
            label={textConstants.goldItemQualityLabel}
            dropdown={true}
            qualityDropdown={true}
            name="quality"
            item={item}
            control={form.control}
          />

          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
              <Label>{textConstants.goldItemWeightLabel}</Label>
              <div className="flex w-full">
                <GenericFormField
                  control={form.control}
                  name="weight"
                  label={textConstants.goldItemWeightLabel}
                  placeholder="Enter Weight"
                  textFieldClassName="bg-inputBg rounded-r-none rounded-l-lg h-[45px] border-inputBorder py-1.5 text-black"
                  error={form.formState.errors.weight}
                  textInput={true}
                  type="number"
                  weightText={true}
                />

                <GenericFormField
                  dropdown={true}
                  weightDropdown={true}
                  name="quantity"
                  control={form.control}
                />
              </div>
            </div>
          </div>

          <GenericFormField
            control={form.control}
            name="price"
            label={textConstants.goldItemPriceLabel}
            placeholder="Enter Price"
            error={form.formState.errors.price}
            textInput={true}
            type="number"
            weightText={false}
          />

          <div className="flex justify-between items-center">
            <span className="xs:text-base font-medium sm:text-xl flex-1">
              {textConstants.zakatPayableText}
            </span>
            <span className="font-semibold text-2xl text-zakatText flex-1 text-end">
              {payableAmount !== null
                ? `$${payableAmount.toFixed(2)}`
                : '$0.00'}
            </span>
          </div>

          <BackContainer
            purpose={purpose}
            nextButtonText={textConstants.formNextButtonText}
            setValue={setValue}
            value={value}
            subtractValue={1}
          />
        </form>
      </Form>
    </div>
  );
};

export default ItemDetailsForm;
