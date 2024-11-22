'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';

import { calculateZakat } from '@/lib/helpers';
import { HouseIItems } from '@/lib/types';
import GenericFormField from '@/components/common/form';
import { useAppSelector } from '@/store/hooks';
import { textConstants } from '@/configs/textConstants';
import BackContainer from '@/components/common/backContainer';

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
  itemQuantity: z
    .string()
    .min(1, { message: textConstants.amountValidationText }),
  itemName: z.string().min(1, { message: textConstants.nameValidationText }),
});

type FormFields = z.infer<typeof ItemDetailsSchema>;

const HouseItemDetailsForm: React.FC<ItemDetailsProps> = ({
  setName,
  setPrice,
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
      console.error(textConstants.errorInCreatingEventMsg, error);
      toast.error(textConstants.failedToCreateEventMsg);
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
            textInput={true}
            weightText={false}
          />
          <GenericFormField
            control={form.control}
            name="itemQuantity"
            type="number"
            label={textConstants.itemQuantityLabel}
            placeholder="Enter Amount"
            error={form.formState.errors.itemQuantity}
            textInput={true}
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
            nextButtonText={textConstants.formNextButtonText}
            handleBack={handleBack}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        </form>
      </Form>
    </div>
  );
};

export default HouseItemDetailsForm;
