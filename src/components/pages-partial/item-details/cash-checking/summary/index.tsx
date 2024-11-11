'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { addCashItems } from '@/store/features/cash-items/cashSlice';
import { zakatCal } from '@/store/features/zakat/zakatSlice';
import { updateCashItem } from '@/store/features/cash-items/cashSlice';
import { editZakat } from '@/store/features/zakat/zakatSlice';
import { calculateZakat } from '@/lib/helpers';
import { CashIItems } from '@/lib/types';
import SummaryForm from '@/components/common/summaryForm';
import { textConstants } from '@/configs/textConstants';

interface SummaryProps {
  setValue: (value: number) => void;
  value: number;
  name: string;
  price: string;
  cashId: string;
  item: string;
  zakatVal: number;
}

const SummarySchema = z.object({
  item: z.string().min(0, { message: textConstants.itemValidationText }),
  quantity: z
    .string()
    .min(0, { message: textConstants.quantityValidationText }),
  name: z.string().min(0, { message: textConstants.nameValidationText }),
});

type FormFields = z.infer<typeof SummarySchema>;

const CashSummaryForm: React.FC<SummaryProps> = ({
  setValue,
  value,
  name,
  price,
  cashId,
  item,
  zakatVal,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchparams = useSearchParams();
  const id = searchparams.get('id');
  const cash: CashIItems[] = useSelector((state: any) => state.cash.cash) || [];
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
      const data = cash.filter((item) => item.cashId === id);

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
      id: cashId,
      value: zakatVal || 0,
    };

    const itemData = {
      item: item,
      quantity: price,
      zakat: zakatVal,
      income: income,
      name: name,
      religion: religion,
      cashId: cashId,
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
        dispatch(updateCashItem(itemData));
        dispatch(editZakat(zakatCalData));
        toast.success(
          `${itemsData.item} ${textConstants.itemEditSuccessText}`,
          {
            position: 'top-right',
          }
        );
      } else {
        dispatch(addCashItems(itemData));
        dispatch(zakatCal(zakatCalData));
        toast.success(`${itemsData.item} ${textConstants.itemAddSuccessText}`, {
          position: 'top-right',
        });
      }

      form.reset();
      router.push('/income/income-details/add-items');
    } catch (error) {
      console.error(textConstants.errorInCreatingEventMsg, error);
      toast.error(textConstants.failedToCreateEventMsg, {
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

  const handleBack = () => {
    setValue(value - 1);
  };

  return (
    <SummaryForm
      handleBack={handleBack}
      value={1}
      name={name}
      price={price}
      Id={cashId}
      item={item}
      zakatVal={zakatVal}
      onSubmit={handleSubmit}
    />
  );
};

export default CashSummaryForm;
