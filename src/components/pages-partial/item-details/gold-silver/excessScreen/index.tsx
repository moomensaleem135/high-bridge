'use client';
import React from 'react';
import Link from 'next/link';

import { ArrowLeftIcon } from '@/assets/svgs';
import { Button } from '@/components/ui/button';
import { useCreateItemMutation } from '@/store/features/items/itemsApi';
import StepperComponent from '@/components/ui/stepper';
import { textConstants } from '@/configs/textConstants';

const listText = [
  {
    id: 1,
    text: textConstants.goldItemExcessiveAmountListText,
  },

  {
    id: 2,
    text: textConstants.goldItemExcessiveAmountListText,
  },
  {
    id: 3,
    text: textConstants.goldItemExcessiveAmountListText,
  },
];

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
  const [item, setItem] = React.useState<string>('');
  const [activeStep, setActiveStep] = React.useState(1);
  const [createItem, { isLoading }] = useCreateItemMutation();

  React.useEffect(() => {}, [item]);

  return (
    <div className="flex flex-col w-full max-w-[960px] justify-start items-center gap-8 rounded-3xl mt-6 pl-6 pr-6">
      <StepperComponent activeStep={activeStep} />
      <p className="font-medium text-xl w-full">
        {textConstants.goldItemExcessiveAmountText}
      </p>
      <div className="w-full flex flex-col gap-y-6">
        <p className="w-full font-normal text-base">
          {textConstants.goldItemExcessiveAmountFirstParagraph}
        </p>

        <div className="w-full items-start flex flex-col justify-start pl-6 gap-y-3">
          {listText.map((item: any) => (
            <p className="w-full font-normal text-base" key={item.id}>
              {item.text}
            </p>
          ))}
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
            {textConstants.formBackButtonText}
          </Link>

          <div className="flex gap-x-2">
            <Button
              className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover"
              onClick={() => {
                setSelection('No');
                setValue(value + 1);
              }}
            >
              {textConstants.formNoButtonText}
            </Button>
            <Button
              className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover"
              onClick={() => {
                setSelection('Yes');
                setValue(value + 1);
              }}
            >
              {textConstants.formYesButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcessScreen;
