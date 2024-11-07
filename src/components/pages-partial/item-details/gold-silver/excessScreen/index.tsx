'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { Form, FormControl, FormField } from '@/components/ui/form';
import { ArrowLeftIcon } from '@/assets/svgs';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ErrorIcon } from '@/assets/svgs';

import { useCreateItemMutation } from '@/store/features/items/itemsApi';

import Spinner from '@/components/common/Spinner';
import { CashIItems, GoldIItems } from '@/lib/types';
import StepperComponent from '@/components/ui/stepper';

interface ExcessScreenProps {
  setSelection: (value: string) => void;
  setValue: (value: number) => void;
  value: number;
}

const ExcessScreen: React.FC<ExcessScreenProps> = ({
  setSelection,
  setValue,
  value,
}) => {
  const router = useRouter();
  const searchparams = useSearchParams();
  const id = searchparams.get('id');
  const gold: GoldIItems[] =
    useSelector((state: any) => state.items.items) || [];
  const [item, setItem] = React.useState<string>('');
  const [activeStep, setActiveStep] = React.useState(1);
  const [createItem, { isLoading }] = useCreateItemMutation();

  React.useEffect(() => {}, [item]);

  return (
    <div className="flex flex-col w-full max-w-[960px] justify-start items-center gap-8 rounded-3xl mt-6 pl-6 pr-6">
      <StepperComponent activeStep={activeStep} />
      <p className="font-medium text-xl w-full">
        Does this exceed the normal personal usage quantity in your society?
      </p>
      <div className="w-full flex flex-col gap-y-6">
        <p className="w-full font-normal text-base">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        <div className="w-full items-start flex flex-col justify-start pl-6 gap-y-3">
          <p className="w-full font-normal text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <p className="w-full font-normal text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <p className="w-full font-normal text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-evenly items-center w-full gap-5">
        <hr className="w-full border-[1px] border-solid border-underline" />
        <div className="flex justify-between items-center w-full md:flex-row md:justify-between md:items-center">
          <Link
            className="flex justify-start items-center text-base font-medium"
            href={''}
            onClick={() => setValue(value - 1)}
          >
            <ArrowLeftIcon />
            Back
          </Link>

          <div className="flex gap-x-2">
            <Button
              className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover"
              onClick={() => {
                setSelection('No');
                setValue(value + 1);
              }}
            >
              No
            </Button>
            <Button
              className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover"
              onClick={() => {
                setSelection('Yes');
                setValue(value + 1);
              }}
            >
              Yes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcessScreen;
