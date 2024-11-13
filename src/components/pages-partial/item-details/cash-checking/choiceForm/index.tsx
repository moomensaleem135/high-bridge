'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';

import { Form } from '@/components/ui/form';
import { ArrowLeftIcon } from '@/assets/svgs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ErrorIcon } from '@/assets/svgs';
import { CashIItems } from '@/lib/types';
import { textConstants } from '@/configs/textConstants';

interface ItemChoiceProps {
  setValue: (value: number) => void;
  value: number;
  setUserItem: (value: string) => void;
  setCashId: (value: string) => void;
  setItemForm: (value: string) => void;
  itemForm: string;
}

const ItemChoiceSchema = z.object({
  itemForm: z.string().min(1, { message: textConstants.itemValidationText }),
});

type FormFields = z.infer<typeof ItemChoiceSchema>;

const ItemChoiceForm: React.FC<ItemChoiceProps> = ({
  setValue,
  value,
  setUserItem,
  setCashId,
  setItemForm,
  itemForm,
}) => {
  const router = useRouter();
  const searchparams = useSearchParams();
  const id = searchparams.get('id');
  const cash: CashIItems[] = useSelector((state: any) => state.cash.cash) || [];

  const form = useForm<FormFields>({
    resolver: zodResolver(ItemChoiceSchema),
    defaultValues: {
      itemForm: itemForm ? itemForm : '',
    },
  });

  React.useEffect(() => {
    if (id) {
      const data = cash.filter((item) => item.cashId === id);

      form.reset({
        itemForm: data[0].item,
      });
    }
  }, [id]);

  const onSubmit = async (itemsData: FormFields) => {
    let cashId;

    if (!id) {
      cashId = `cash-${Date.now()}`;
    } else {
      cashId = id;
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
        setUserItem(itemsData.itemForm);
        setItemForm(itemsData.itemForm);
        setValue(value + 1);
        setCashId(id);
      } else {
        setUserItem(itemsData.itemForm);
        setItemForm(itemsData.itemForm);
        setCashId(cashId);
        setValue(value + 1);
      }
    } catch (error) {
      console.error(textConstants.errorInCreatingEventMsg, error);
      toast.error(textConstants.failedToCreateEventMsg, {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[960px] justify-center items-center gap-12 rounded-3xl mt-6">
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
            <div className="w-full xl:items-center xl:flex xl:flex-row xl:justify-start xl:gap-x-28 xs:flex-col xs:items-start xs:justify-start xs:gap-y-10 pl-4">
              <div className="flex justify-start items-center gap-4">
                <Controller
                  name="itemForm"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === 'Cash'}
                      onCheckedChange={() => {
                        field.onChange('Cash');
                        setItemForm('Cash');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">
                  {textConstants.cashItemCheckboxLabel}
                </label>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Controller
                  name="itemForm"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === 'Checking'}
                      onCheckedChange={() => {
                        field.onChange('Checking');
                        setItemForm('Checking');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">
                  {textConstants.checkingItemCheckboxLabel}
                </label>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Controller
                  name="itemForm"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === 'Saving'}
                      onCheckedChange={() => {
                        field.onChange('Saving');
                        setItemForm('Saving');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">
                  {textConstants.savingItemCheckboxLabel}
                </label>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Controller
                  name="itemForm"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === 'Loan'}
                      onCheckedChange={() => {
                        field.onChange('Loan');
                        setItemForm('Loan');
                      }}
                      className="rounded-sm h-5 w-5 mt-0.5 border-[2px]"
                    />
                  )}
                />
                <label htmlFor="myCheckbox">
                  {textConstants.loanItemCheckboxLabel}
                </label>
              </div>
            </div>
            {form.formState.errors.itemForm && (
              <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                <ErrorIcon />
                {form.formState.errors.itemForm.message}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-evenly items-center w-full gap-5">
            <hr className="w-full border-[1px] border-solid border-underline" />
            <div className="flex justify-between items-center w-full md:flex-row md:justify-between md:items-center">
              <div
                className="flex justify-start items-center text-base font-medium cursor-pointer"
                onClick={() => {
                  if (cash?.length === 0) {
                    localStorage.clear();
                    router.push('/income');
                  } else {
                    router.push('/income/income-details/add-items');
                  }
                }}
              >
                <ArrowLeftIcon />
                {textConstants.formBackButtonText}
              </div>

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

export default ItemChoiceForm;
