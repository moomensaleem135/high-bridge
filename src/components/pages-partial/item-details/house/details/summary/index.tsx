'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateItemMutation } from '@/store/features/items/itemsApi';
import { addCashItems } from '@/store/features/cash-items/cashSlice';
import { zakatCal } from '@/store/features/zakat/zakatSlice';
import { updateCashItem } from '@/store/features/cash-items/cashSlice';
import { editZakat } from '@/store/features/zakat/zakatSlice';

import Spinner from '@/components/common/Spinner';
import { calculateZakat } from '@/lib/helpers';
import { CashIItems, HouseIItems } from '@/lib/types';
import { useAppSelector } from '@/store/hooks';
import SummaryForm from '@/components/common/summaryForm';
import {
  addHouseItems,
  updateHouseItem,
} from '@/store/features/house-items/houseSlice';

interface SummaryProps {
  name: string;
  price: string;
  houseId: string;
  item: string;
  zakatVal: number;
  handleBack: () => void;
}

const SummarySchema = z.object({
  item: z.string().min(0, { message: 'Purpose is required' }),
  quantity: z.string().min(0, { message: 'Amount is required' }),
  name: z.string().min(0, { message: 'Name of entered item is required' }),
});

type FormFields = z.infer<typeof SummarySchema>;

const HouseSummaryForm: React.FC<SummaryProps> = ({
  name,
  price,
  houseId,
  item,
  zakatVal,
  handleBack,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchparams = useSearchParams();
  const id = searchparams.get('id');
  const house: HouseIItems[] = useAppSelector(
    (state: any) => state.house.house
  );
  const religion = useSelector((state: any) => state.sect.sect);
  const income = useSelector((state: any) => state.income.income);
  const setup = useSelector((state: any) => state.setup.setup);
  const [payableAmount, setPayableAmount] = React.useState<number>(0);
  const [createItem, { isLoading }] = useCreateItemMutation();

  console.log('house id in house summary', houseId);
  console.log(item, price);

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
      const data = house.filter((item) => item.houseId === id);

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

    const zakatCalData = {
      id: houseId,
      value: zakatVal || 0,
    };

    const itemData = {
      item: item,
      quantity: price,
      zakat: zakatVal,
      income: income,
      name: name,
      religion: religion,
      houseId: houseId,
    };

    const formData = new FormData();

    Object.keys(itemsData).forEach((key) => {
      const value = itemsData[key as keyof FormFields];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    try {
      localStorage.clear();
      // const response = await createItem(formData); // Uncomment if needed
      if (id) {
        console.log(id);
        dispatch(updateHouseItem(itemData));
        dispatch(editZakat(zakatCalData));
        toast.success(`${itemsData.item} item edited successfully.`, {
          position: 'top-right',
        });
      } else {
        dispatch(addHouseItems(itemData));
        dispatch(zakatCal(zakatCalData));
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
      setPayableAmount(0);
    }
  }, [form.watch('quantity')]);

  const handleSubmit = (data: FormFields) => {
    onSubmit(data);
  };

  return (
    <SummaryForm
      handleBack={handleBack}
      value={1}
      name={name}
      price={price}
      cashId={houseId}
      item={item}
      zakatVal={zakatVal}
      onSubmit={handleSubmit}
    />
  );
};

export default HouseSummaryForm;
