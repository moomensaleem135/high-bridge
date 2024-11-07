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
import GenericFormField from '@/components/common/form';

interface ItemDetailsProps {
  setValue: (value: number) => void;
  value: number;
  setName: (value: string) => void;
  setPrice: (value: string) => void;
  cashId: string;
  setZakat: (value: any) => void;
}

const ItemDetailsSchema = z.object({
  //   item: z.string().min(1, { message: 'Purpose is required' }),
  quantity: z.string().min(1, { message: 'Amount is required' }),
  name: z.string().min(1, { message: 'Name of entered item is required' }),
});

type FormFields = z.infer<typeof ItemDetailsSchema>;

const ItemDetailsForm: React.FC<ItemDetailsProps> = ({
  setValue,
  value,
  setName,
  setPrice,
  cashId,
  setZakat,
}) => {
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
      quantity: '',
      name: '',
    },
  });

  React.useEffect(() => {
    const storedFormData = localStorage.getItem('itemDetailsForm');
    if (storedFormData) {
      form.reset(JSON.parse(storedFormData));
    }
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
      // const response = await createItem(formData); // Uncomment if needed
      localStorage.setItem('itemDetailsForm', JSON.stringify(itemsData));
      if (id) {
        console.log('id in details form', id);
        //dispatch(editZakat(zakatCalData));
        setName(itemsData.name);
        setPrice(itemsData.quantity);
        setValue(value + 1);
        // toast.success(`${itemsData.name} item edited successfully.`, {
        //   position: 'top-right',
        // });
      } else {
        //dispatch(zakatCal(zakatCalData));
        setName(itemsData.name);
        setPrice(itemsData.quantity);
        setValue(value + 1);
        // toast.success(`${itemsData.name} item added successfully.`, {
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
            label="What should the title for this item be?"
            placeholder="Enter Item Name"
            error={form.formState.errors.name}
          />
          <GenericFormField
            control={form.control}
            type='number'
            name="quantity"
            label="What is the balance of this account on the zakat pay date?"
            placeholder="Enter Amount"
            error={form.formState.errors.quantity}
          />
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
                onClick={() => {
                  setValue(value - 1);
                  localStorage.removeItem('itemDetailsForm');
                }}
              >
                <ArrowLeftIcon />
                Back
              </Link>
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

export default ItemDetailsForm;
