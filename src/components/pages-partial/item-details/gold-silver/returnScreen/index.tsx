'use client';
import React from 'react';
import { useSelector } from 'react-redux';

import StepperComponent from '@/components/ui/stepper';
import { textConstants } from '@/configs/textConstants';
import BackContainer from '@/components/common/backContainer';

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

      <BackContainer
        nextButtonText={textConstants.formAddAnotherItemButton}
        setValue={setValue}
        value={0}
      />
    </div>
  );
};

export default ReturnScreen;
