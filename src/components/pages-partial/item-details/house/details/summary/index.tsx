'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { zakatCal } from '@/store/features/zakat/zakatSlice';
import { editZakat } from '@/store/features/zakat/zakatSlice';
import { calculateZakat } from '@/lib/helpers';
import { HouseIItems } from '@/lib/types';
import { useAppSelector } from '@/store/hooks';
import SummaryForm from '@/components/common/summaryForm';
import {
  addHouseItems,
  updateHouseItem,
} from '@/store/features/house-items/houseSlice';
import { textConstants } from '@/configs/textConstants';

interface SummaryProps {
  name: string;
  price: string;
  houseId: string;
  item: string;
  zakatVal: number;
  handleBack: () => void;
}

const SummarySchema = z.object({
  item: z.string().min(0, { message: textConstants.purposeValidationText }),
  quantity: z.string().min(0, { message: textConstants.amountValidationText }),
  name: z.string().min(0, { message: textConstants.nameValidationText }),
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
      if (id) {
        dispatch(updateHouseItem(itemData));
        dispatch(editZakat(zakatCalData));
        router.push('/income/income-details/add-items');
        toast.success(`${itemsData.item} ${textConstants.itemEditSuccessText}`);
      } else {
        dispatch(addHouseItems(itemData));
        dispatch(zakatCal(zakatCalData));
        router.push('/income/income-details/add-items');
        toast.success(`${itemsData.item} ${textConstants.itemAddSuccessText}`);
      }

      form.reset();
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
      Id={houseId}
      item={item}
      zakatVal={zakatVal}
      onSubmit={handleSubmit}
    />
  );
};

export default HouseSummaryForm;
