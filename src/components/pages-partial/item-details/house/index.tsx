'use client';
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import Modal from '@/components/ui/modal';
import { useAppSelector } from '@/store/hooks';
import { textConstants } from '@/configs/textConstants';

import { HousePurposeForm } from './details/purpose/housePurpose';
import { NotAcceptable } from './details/notAcceptable';
import { HaveYouRecordedAssets } from './details/recorded';
import HouseItemDetailsForm from './details/detailForm';
import HouseSummaryForm from './details/summary';

const purposeOptions = [
  {
    id: 'personal',
    label: textConstants.housePersonalUseLabel,
    description: textConstants.housePersonalUserDesc,
  },
  {
    id: 'rental',
    label: textConstants.houseRentalUseLabel,
    description: textConstants.houseRentalUseDesc,
  },
  {
    id: 'saving',
    label: textConstants.houseSavingUseLabel,
    description: textConstants.houseSavingUseDesc,
  },
  {
    id: 'trading',
    label: textConstants.houseTradingUseLabel,
    description: textConstants.houseTradingUseDesc,
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
  const router = useRouter();
  const setup = useAppSelector((state: any) => state.setup.setup);
  const [step, setStep] = useState(0);
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [houseId, setHouseId] = React.useState('');
  const [zakat, setZakat] = React.useState(0);
  const [show, setShow] = useState<boolean>(true);

  const showRef = React.useRef<boolean>(show);

  React.useEffect(() => {
    showRef.current = show;
  }, [show]);

  const id = searchParams.get('id');

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
      setShow(true);
    }
  };

  const [isDirty, setIsDirty] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [navigateAway, setNavigateAway] = React.useState('');

  React.useEffect(() => {
    const checkForUnsavedChanges = () => {
      if (selectedPurpose || name || price) {
        setIsDirty(true);
      }
    };

    checkForUnsavedChanges();

    return () => {
      checkForUnsavedChanges();
    };
  }, [selectedPurpose, name, price]);

  React.useEffect(() => {
    if (step === 3) {
      setShow(false);
    }
  }, [step]);

  const confirmNavigation = () => {
    router.replace(navigateAway);
    setIsModalOpen(false);
  };

  const cancelNavigation = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    const originalPush = router.push;

    router.push = (...args) => {
      if (args[0] !== '' && args[0] !== '/income/income-details/add-items') {
        if (isDirty) {
          setNavigateAway(args[0]);
          setIsModalOpen(true);
          return;
        }
      } else if (
        args[0] === '/income/income-details/add-items' &&
        showRef.current === true
      ) {
        if (isDirty) {
          setNavigateAway(args[0]);
          setIsModalOpen(true);
          return;
        }
      }

      return originalPush(...args);
    };

    return () => {
      router.push = originalPush;
    };
  }, [isDirty, router]);

  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  React.useEffect(() => {
    if (setup.startDate === '' || setup.year === '') {
      router.replace('/income');
    }
  });

  return (
    <div className="flex flex-col self-stretch w-full gap-y-4 overflow-y-scroll xs:mb-16 lg:my-5 gridscrollbar">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-center px-4 text-3xl font-semibold">
          {id
            ? textConstants.editHouseItemTitle
            : textConstants.addHouseItemTitle}
        </h1>
        <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2">
          {textConstants.houseItemDescription}
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
            name={name}
            price={price}
          />
        )}
        {step === 2 && selectedOption === 'Yes' && (
          <NotAcceptable
            title={textConstants.zakatNotApplicableHeading}
            description={textConstants.zakatAlreadyRecordedText}
            handleBack={handleBack}
          />
        )}
        {step === 1 && selectedPurpose === 'Personal' && (
          <NotAcceptable
            title={textConstants.zakatNotApplicableHeading}
            description={textConstants.personalUseText}
            handleBack={handleBack}
          />
        )}
        {step === 1 && selectedPurpose === 'Trading' && (
          <NotAcceptable
            title={textConstants.zakatApplicableHeading}
            description={textConstants.tradeUseText}
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
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          heading={textConstants.modalHeading}
          paragraph={textConstants.modalDesc}
          buttonText="Yes"
          onClose={cancelNavigation}
          onConfirm={confirmNavigation}
        />
      )}
    </div>
  );
}
