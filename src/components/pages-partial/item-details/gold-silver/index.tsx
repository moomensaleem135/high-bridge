'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import ItemDetailsForm from './detailsForm';
import GoldChoiceForm from './choiceForm';
import ExcessScreen from './excessScreen';
import GoldSummaryForm from './goldSummary';
import ReturnScreen from './returnScreen';
import { textConstants } from '@/configs/textConstants';
import Modal from '@/components/ui/modal';
import { useAppSelector } from '@/store/hooks';

export default function GoldItemDetails() {
  const searchparams = useSearchParams();
  const setup = useAppSelector((state: any) => state.setup.setup);

  const router = useRouter();
  const [value, setValue] = React.useState<number>(0);
  const [item, setUserItem] = React.useState('');
  const [purpose, setPurpose] = React.useState('');
  const [goldId, setGoldId] = React.useState('');
  const [selection, setSelection] = React.useState('');
  const [quality, setQuality] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [zakatVal, setZakatVal] = React.useState(0);
  const id = searchparams.get('id');

  const [isDirty, setIsDirty] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [navigateAway, setNavigateAway] = React.useState('');

  console.log('value', value);
  React.useEffect(() => {
    const checkForUnsavedChanges = () => {
      if (item || purpose || quantity || price || quality) {
        setIsDirty(true);
      }
    };

    checkForUnsavedChanges();

    return () => {
      checkForUnsavedChanges();
    };
  }, [item, purpose, quantity, price, quality]);

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
        {id ? (
          <h1 className="text-center px-4 text-3xl font-semibold">
            {textConstants.goldItemEditFormHeading}
          </h1>
        ) : (
          <h1 className="text-center px-4 text-3xl font-semibold">
            {textConstants.goldItemAddFormHeading}
          </h1>
        )}

        <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2">
          {textConstants.goldItemFormParagraph}
        </span>
        <hr className="w-full border-[1px] border-underline" />
      </div>

      <div className="flex justify-center items-center mt-2 flex-col ">
        {value === 0 && (
          <GoldChoiceForm
            setUserItem={setUserItem}
            setPurpose={setPurpose}
            setGoldId={setGoldId}
            setValue={setValue}
            value={value}
            item={item}
            purpose={purpose}
          />
        )}
        {value === 1 && purpose === 'Personal' && (
          <ExcessScreen
            setSelection={setSelection}
            setValue={setValue}
            value={value}
          />
        )}
        {value === 1 && purpose === 'Saving' && (
          <ItemDetailsForm
            setValue={setValue}
            value={value + 1}
            goldId={goldId}
            setGoldId={setGoldId}
            setPrice={setPrice}
            setWeight={setWeight}
            setQuality={setQuality}
            setQuantity={setQuantity}
            setZakatVal={setZakatVal}
            userItem={item}
            purpose={purpose}
            price={price}
            quality={quality}
            quantity={quantity}
            weight={weight}
          />
        )}
        {value === 2 && selection === 'Yes' && (
          <ItemDetailsForm
            setValue={setValue}
            value={value}
            goldId={goldId}
            setGoldId={setGoldId}
            setPrice={setPrice}
            setWeight={setWeight}
            setQuality={setQuality}
            setQuantity={setQuantity}
            setZakatVal={setZakatVal}
            userItem={item}
            purpose={purpose}
            price={price}
            quality={quality}
            quantity={quantity}
            weight={weight}
          />
        )}
        {value === 2 && selection === 'No' && (
          <ReturnScreen setValue={setValue} value={value} />
        )}
        {value === 3 && (
          <GoldSummaryForm
            setValue={setValue}
            value={value}
            item={item}
            price={price}
            zakatVal={zakatVal}
            quality={quality}
            quantity={quantity}
            weight={weight}
            goldId={goldId}
            purpose={purpose}
            selection={selection ? selection : ''}
          />
        )}
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          heading="Unsaved Changes Detected"
          paragraph="You've made some changes that haven't been saved yet.
                    Would you like to complete your action now or save
                    your progress to finish later?"
          buttonText="Yes"
          onClose={cancelNavigation}
          onConfirm={confirmNavigation}
        />
      )}
    </div>
  );
}
