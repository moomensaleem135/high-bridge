'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { ErrorIcon } from '@/assets/svgs';
import StepperComponent from '@/components/ui/stepper';
import { GoldIItems } from '@/lib/types';
import { textConstants } from '@/configs/textConstants';
import BackContainer from '@/components/common/backContainer';
import GenericFormField from '@/components/common/form';

interface GoldChoiceProps {
  setValue: (value: number) => void;
  value: number;
  item: string;
  purpose: string;
  setUserItem: (value: string) => void;
  setPurpose: (value: string) => void;
  setGoldId: (value: string) => void;
}

const GoldChoiceSchema = z.object({
  item: z.string().min(1, { message: textConstants.itemValidationText }),
  purpose: z.string().min(1, { message: textConstants.purposeValidationText }),
});

type FormFields = z.infer<typeof GoldChoiceSchema>;

const GoldChoiceForm: React.FC<GoldChoiceProps> = ({
  setValue,
  value,
  setUserItem,
  setPurpose,
  setGoldId,
  purpose,
  item,
}) => {
  const searchparams = useSearchParams();
  const id = searchparams.get('id');
  const gold: GoldIItems[] =
    useSelector((state: any) => state.items.items) || [];
  const [activeStep, setActiveStep] = React.useState(0);

  const form = useForm<FormFields>({
    resolver: zodResolver(GoldChoiceSchema),
    defaultValues: {
      item: item ? item : '',
      purpose: purpose ? purpose : '',
    },
  });

  React.useEffect(() => {
    if (id) {
      const data = gold.filter((item) => item.goldId === id);

      form.reset({
        item: data[0].item,
        purpose: data[0].purpose,
      });
    }
  }, [id]);

  const onSubmit = async (itemsData: FormFields) => {
    let goldId;

    if (!id) {
      goldId = `gold-${Date.now()}`;
    } else {
      goldId = id;
    }

    const formData = new FormData();

    Object.keys(itemsData).forEach((key) => {
      const value = itemsData[key as keyof FormFields];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    try {
      if (id) {
        setUserItem(itemsData.item);
        setPurpose(itemsData.purpose);
        setValue(value + 1);
        setGoldId(id);
      } else {
        setUserItem(itemsData.item);
        setPurpose(itemsData.purpose);
        setGoldId(goldId);
        setValue(value + 1);
      }
    } catch (error) {
      console.error(textConstants.errorInCreatingEventMsg, error);
      toast.error(textConstants.failedToCreateEventMsg);
    }
  };

  React.useEffect(() => {}, [item]);

  return (
    <div className="flex flex-col w-full max-w-[960px] justify-center items-center gap-12 rounded-3xl mt-6">
      <StepperComponent activeStep={activeStep} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[82%] gap-5 mb-10"
          data-testid="event-form"
        >
          <Label className="font-medium text-xl">
            {textConstants.itemLabel}
          </Label>
          <div>
            <div className="w-full items-center flex justify-start xs:gap-x-10 md:gap-x-28 pl-4">
              <GenericFormField
                control={form.control}
                checkbox={true}
                name="item"
                checkedValue="Gold"
                label={textConstants.goldItemCheckboxLabel}
                setSelection={setUserItem}
              />

              <GenericFormField
                control={form.control}
                checkbox={true}
                name="item"
                checkedValue="Silver"
                label={textConstants.silverItemCheckboxLabel}
                setSelection={setUserItem}
              />
            </div>
            {form.formState.errors.item && (
              <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                <ErrorIcon />
                {form.formState.errors.item.message}
              </span>
            )}
          </div>

          <Label className="font-medium text-xl">
            {textConstants.goldItemPurposeLabel}
          </Label>
          <div>
            <div className="w-full items-center flex justify-start xs:gap-x-10 md:gap-x-20 pl-4">
              <GenericFormField
                control={form.control}
                checkbox={true}
                name="purpose"
                checkedValue="Personal"
                label={textConstants.personalItemCheckboxLabel}
                setSelection={setPurpose}
              />

              <GenericFormField
                control={form.control}
                checkbox={true}
                name="purpose"
                checkedValue="Saving"
                label={textConstants.savingItemChackboxLabel}
                setSelection={setPurpose}
              />
            </div>
            {form.formState.errors.purpose && (
              <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                <ErrorIcon />
                {form.formState.errors.purpose.message}
              </span>
            )}
          </div>

          <BackContainer
            incomeArray={gold}
            nextButtonText={textConstants.formNextButtonText}
            routeOne="/income"
            routeTwo="/income/income-details/add-items"
          />
        </form>
      </Form>
    </div>
  );
};

export default GoldChoiceForm;
