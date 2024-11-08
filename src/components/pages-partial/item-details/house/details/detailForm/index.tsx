'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { Form } from '@/components/ui/form';
import { ArrowLeftIcon } from '@/assets/svgs';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';

import { calculateZakat } from '@/lib/helpers';
import { HouseIItems } from '@/lib/types';
import GenericFormField from '@/components/common/form';
import { useAppSelector } from '@/store/hooks';
import { textConstants } from '@/configs/textConstants';

interface ItemDetailsProps {
  setName: (value: string) => void;
  setPrice: (value: string) => void;
  houseId: string;
  setZakat: (value: any) => void;
  handleBack: () => void;
  handleNext: () => void;
  name: string;
  price: string;
}

const ItemDetailsSchema = z.object({
  itemQuantity: z.string().min(1, { message: 'Amount is required' }),
  itemName: z.string().min(1, { message: 'Name of entered item is required' }),
});

type FormFields = z.infer<typeof ItemDetailsSchema>;

const HouseItemDetailsForm: React.FC<ItemDetailsProps> = ({
  setName,
  setPrice,
  houseId,
  setZakat,
  handleBack,
  handleNext,
  name,
  price,
}) => {
  const searchparams = useSearchParams();
  const id = searchparams.get('id');
  const house: HouseIItems[] = useAppSelector(
    (state: any) => state.house.house
  );
  const setup = useSelector((state: any) => state.setup.setup);
  const [payableAmount, setPayableAmount] = React.useState<number | null>(null);

  const form = useForm<FormFields>({
    resolver: zodResolver(ItemDetailsSchema),
    defaultValues: {
      itemQuantity: price ? price : '',
      itemName: name ? name : '',
    },
  });

  React.useEffect(() => {
    if (id) {
      const data = house.filter((item) => item.houseId === id);

      form.reset({
        itemQuantity: data[0].quantity,
        itemName: data[0].name,
      });
    }
  }, [id]);

  const onSubmit = async (itemsData: FormFields) => {
    const zakatAmount = calculateZakat(
      Number(itemsData.itemQuantity),
      setup.year,
      setup.generic
    );

    setZakat(zakatAmount);

    const zakatCalData = {
      id: houseId,
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
        setName(itemsData.itemName);
        setPrice(itemsData.itemQuantity);
        handleNext();
      } else {
        setName(itemsData.itemName);
        setPrice(itemsData.itemQuantity);
        handleNext();
      }
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to create event', {
        position: 'top-right',
      });
    }
  };

  React.useEffect(() => {
    const itemQuantity = form.watch('itemQuantity');
    if (itemQuantity) {
      const zakat = calculateZakat(
        Number(itemQuantity),
        setup.year,
        setup.generic
      );
      setZakat(zakat);
      setPayableAmount(zakat);
    } else {
      setPayableAmount(null);
    }
  }, [form.watch('itemQuantity')]);

  return (
    <div className="flex flex-col w-full max-w-[960px] justify-center items-center gap-12 rounded-3xl mt-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[82%] gap-5 mb-10"
          data-testid="event-form"
        >
          <GenericFormField
            control={form.control}
            name="itemName"
            label={textConstants.itemNameLabel}
            placeholder="Enter Item Name"
            error={form.formState.errors.itemName}
          />
          <GenericFormField
            control={form.control}
            name="itemQuantity"
            type="number"
            label={textConstants.itemQuantityLabel}
            placeholder="Enter Amount"
            error={form.formState.errors.itemQuantity}
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

          <div className="flex flex-col justify-evenly items-center w-full gap-5">
            <hr className="w-full border-[1px] border-solid border-underline" />
            <div className="flex justify-between items-center w-full md:flex-row md:justify-between md:items-center">
              <Link
                className="flex justify-start items-center text-base font-medium"
                href={''}
                onClick={() => {
                  handleBack();
                }}
              >
                <ArrowLeftIcon />
                {textConstants.formBackButtonText}
              </Link>
              <Button
                className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover"
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
              >
                {textConstants.formNextButtonText}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HouseItemDetailsForm;
