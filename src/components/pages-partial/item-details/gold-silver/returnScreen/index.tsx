'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import { ArrowLeftIcon } from '@/assets/svgs';
import { Button } from '@/components/ui/button';
import StepperComponent from '@/components/ui/stepper';
import { textConstants } from '@/configs/textConstants';

interface ReturnScreenProps {
  setValue: (value: number) => void;
  value: number;
}

const ReturnScreen: React.FC<ReturnScreenProps> = ({ setValue, value }) => {
  useSelector((state: any) => state.items.items) || [];
  const [item, setItem] = React.useState<string>('');
  const [activeStep, setActiveStep] = React.useState(2);

  React.useEffect(() => {}, [item]);

  return (
    <div className="flex flex-col w-full max-w-[960px] justify-start items-center gap-8  rounded-3xl mt-6 pl-6 pr-6">
      <StepperComponent activeStep={activeStep} />
      <p className="font-medium text-xl w-full">
        {textConstants.zakatNotApplicableHeading}
      </p>
      <div className="w-full flex flex-col gap-y-6">
        <p className="w-full font-normal text-base">
          {textConstants.zakatnotApplicableText}
        </p>
      </div>

      <div className="flex flex-col justify-evenly items-center w-full gap-5">
        <hr className="w-full border-[1px] border-solid border-underline" />
        <div className="flex justify-between items-center w-full md:flex-row md:justify-between md:items-center">
          <Link
            className="flex justify-start items-center text-base font-medium"
            href={''}
            onClick={() => {
              setValue(0);
            }}
          >
            <ArrowLeftIcon />
            {textConstants.formBackButtonText}
          </Link>

          <div className="flex gap-x-2">
            <Button
              className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover"
              onClick={() => {
                setValue(0);
              }}
            >
              {textConstants.formAddAnotherItemButton}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnScreen;
