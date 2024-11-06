import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { HousePurposeForm } from './details/purpose/housePurpose';
import { NotAcceptable } from './details/notAcceptable';
import { HaveYouRecordedAssets } from './details/recorded';
import HouseItemDetailsForm from './details/detailForm';
import HouseSummaryForm from './details/summary';

const purposeOptions = [
  {
    id: 'personal',
    label: 'Personal Use',
    description: 'Your primary residence for personal living.',
  },
  {
    id: 'rental',
    label: 'Rental',
    description: 'Used for generating rental income.',
  },
  {
    id: 'saving',
    label: 'Saving',
    description: 'Holding as a long-term investment.',
  },
  {
    id: 'trading',
    label: 'Trading',
    description: 'Planned for future sale for profit.',
  },
];

const options = [
  {
    id: 'yes',
    label: 'Yes',
  },
  {
    id: 'no',
    label: 'No',
  },
];

export default function HouseDetails() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [houseId, setHouseId] = React.useState('');
  const [zakat, setZakat] = React.useState(0);

  const id = searchParams.get('id');
  console.log(name, price);

  const handleNext = () => {
    if (selectedPurpose === 'rental' && step === 1) {
      setStep(2);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (
      (selectedPurpose === 'rental' || step === 2) &&
      selectedOption === 'Yes'
    ) {
      setStep(0);
    } else {
      setStep(step - 1);
    }
  };

  console.log(name);
  console.log(price);

  return (
    <div className="flex flex-col self-stretch w-full gap-y-4 overflow-y-scroll xs:mb-16 lg:my-5 gridscrollbar">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-center px-4 text-3xl font-semibold">
          {id ? 'Edit House Items' : 'Add House Items'}
        </h1>
        <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2">
          Please add your house items, as zakat is valid only on savings and
          items held for trading or rental purposes.
        </span>
        <hr className="w-full border-[1px] border-underline" />
      </div>

      <div className="flex justify-center items-center mt-2 flex-col ">
        {step === 0 && (
          <HousePurposeForm
            selectedPurpose={selectedPurpose}
            purposeOptions={purposeOptions}
            setSelectedPurpose={setSelectedPurpose}
            setHouseId={setHouseId}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
        {step === 2 && selectedOption === 'No' && (
          <HouseItemDetailsForm
            houseId={houseId}
            setName={setName}
            setPrice={setPrice}
            setZakat={setZakat}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        )}
        {step === 2 && selectedOption === 'Yes' && (
          <NotAcceptable
            title="Your Zakat is not applicable to this item."
            description="You have already included your zakat in your liquid assets; therefore, no zakat is required for this item."
            handleBack={handleBack}
          />
        )}
        {step === 1 && selectedPurpose === 'Personal' && (
          <NotAcceptable
            title="Your Zakat is not applicable to this item."
            description="Zakat is not applicable for items used for Personal Use. This means you don’t need to pay zakat on things you use for living, as zakat only applies to items for trading, rental, or savings."
            handleBack={handleBack}
          />
        )}
        {step === 1 && selectedPurpose === 'Trading' && (
          <NotAcceptable
            title="Your zakat is applicable to this item."
            description="Zakat is applicable to assets designated for trading. Kindly include this item in your commercial assets, as zakat is calculated based on items held for sale or profit."
            handleBack={handleBack}
          />
        )}
        {step === 3 && selectedPurpose === 'Rental' && (
          <HouseSummaryForm
            name={name}
            price={price}
            houseId={houseId}
            item={selectedPurpose}
            zakatVal={zakat}
            handleBack={handleBack}
          />
        )}
        {step === 1 && selectedPurpose === 'Rental' && (
          <HaveYouRecordedAssets
            options={options}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        )}
      </div>
    </div>
  );
}
