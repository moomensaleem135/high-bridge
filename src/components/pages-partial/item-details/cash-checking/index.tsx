'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import ItemChoiceForm from './choiceForm';
import ItemDetailsForm from './detailsForm';
import Summary from './summary';

export default function CashItemDetails() {
  const searchparams = useSearchParams();
  const router = useRouter();
  const id = searchparams.get('id');

  const [value, setValue] = useState<number>(0);
  const [item, setUserItem] = useState('');
  const [cashId, setCashId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [zakat, setZakat] = useState(0);
  const [itemForm, setItemForm] = useState<string>('');

  const [isDirty, setIsDirty] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [navigateAway, setNavigateAway] = useState('');

  useEffect(() => {
    const checkForUnsavedChanges = () => {
      if (itemForm || name || price) {
        setIsDirty(true);
      }
    };

    checkForUnsavedChanges();

    return () => {
      checkForUnsavedChanges();
    };
  }, [name, price, itemForm]);

  const confirmNavigation = () => {
    router.replace(navigateAway);
    setIsModalOpen(false);
  };

  const cancelNavigation = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
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

  return (
    <div className="flex flex-col self-stretch w-full gap-y-4 overflow-y-scroll xs:mb-16 lg:my-5 gridscrollbar">
      <div className="flex flex-col justify-center items-center">
        {id ? (
          <h1 className="text-center px-4 text-3xl font-semibold">
            Update Cash & Checking Items
          </h1>
        ) : (
          <h1 className="text-center px-4 text-3xl font-semibold">
            {value <= 1 && <>Add Liquid Assets Items</>}
            {value > 1 && <>Liquid Asset Item Summary Report</>}
          </h1>
        )}
        <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2 lg:w-3/4 w-full">
          Here's what you have so far. Please add your cash and checking account
          balances for accurate zakat calculation
        </span>
        <hr className="w-full border-[1px] border-underline" />
      </div>

      <div className="flex justify-center items-center mt-2 flex-col">
        {value === 0 && (
          <ItemChoiceForm
            setValue={setValue}
            value={value}
            setCashId={setCashId}
            setUserItem={setUserItem}
            setItemForm={setItemForm}
            itemForm={itemForm}
          />
        )}
        {value === 1 && (
          <ItemDetailsForm
            setValue={setValue}
            value={value}
            setName={setName}
            setPrice={setPrice}
            cashId={cashId}
            setZakat={setZakat}
            name={name}
            price={price}
          />
        )}
        {value === 2 && (
          <Summary
            name={name}
            price={price}
            cashId={cashId}
            item={item}
            setValue={setValue}
            value={value}
            zakatVal={zakat}
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
