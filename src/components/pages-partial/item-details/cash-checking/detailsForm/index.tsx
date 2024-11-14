'use client';
import React from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { z } from 'zod';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';

import { Form } from '@/components/ui/form';
import { ArrowLeftIcon } from '@/assets/svgs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { calculateZakat } from '@/lib/helpers';
import { CashIItems } from '@/lib/types';
import GenericFormField from '@/components/common/form';
import { textConstants } from '@/configs/textConstants';

interface ItemDetailsProps {
  setValue: (value: number) => void;
  value: number;
  setName: (value: string) => void;
  setPrice: (value: string) => void;
  cashId: string;
  setZakat: (value: any) => void;
  name: string;
  price: string;
}

const ItemDetailsSchema = z.object({
  quantity: z.string().min(1, { message: textConstants.amountValidationText }),
  name: z.string().min(1, { message: textConstants.nameValidationText }),
});

type FormFields = z.infer<typeof ItemDetailsSchema>;

const ItemDetailsForm: React.FC<ItemDetailsProps> = ({
  setValue,
  value,
  setName,
  setPrice,
  cashId,
  setZakat,
  name,
  price,
}) => {
  const searchparams = useSearchParams();
  const id = searchparams.get('id');
  const cash: CashIItems[] = useSelector((state: any) => state.cash.cash) || [];
  const setup = useSelector((state: any) => state.setup.setup);
  const [item, setItem] = React.useState<string>('');
  const [payableAmount, setPayableAmount] = React.useState<number | null>(null);

  const form = useForm<FormFields>({
    resolver: zodResolver(ItemDetailsSchema),
    defaultValues: {
      quantity: price ? price : '',
      name: name ? name : '',
    },
  });

  React.useEffect(() => {
    if (id) {
      const data = cash.filter((item) => item.cashId === id);

      form.reset({
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

    const zakatCalData = {
      id: cashId,
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
        setName(itemsData.name);
        setPrice(itemsData.quantity);
        setValue(value + 1);
      } else {
        setName(itemsData.name);
        setPrice(itemsData.quantity);
        setValue(value + 1);
      }
    } catch (error) {
      console.error(textConstants.errorInCreatingEventMsg, error);
      toast.error(textConstants.failedToCreateEventMsg);
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
      setZakat(zakat);
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
          <GenericFormField
            control={form.control}
            name="name"
            label={textConstants.itemNameLabel}
            placeholder="Enter Item Name"
            error={form.formState.errors.name}
          />
          <GenericFormField
            control={form.control}
            type="number"
            name="quantity"
            label={textConstants.itemQuantityLabel}
            placeholder="Enter Amount"
            error={form.formState.errors.quantity}
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
                  setValue(value - 1);
                }}
              >
                <ArrowLeftIcon />
                {textConstants.formBackButtonText}
              </Link>

              <Button className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover">
                {textConstants.formNextButtonText}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ItemDetailsForm;
