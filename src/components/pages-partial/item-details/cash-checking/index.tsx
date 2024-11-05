'use client';

import React from 'react';
import ItemChoiceForm from './choiceForm';
import ItemDetailsForm from './detailsForm';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Summary from './summary';

export default function CashItemDetails() {
  const searchparams = useSearchParams();
  const router = useRouter();
  const id = searchparams.get('id');
  const [value, setValue] = React.useState<number>(0);
  const [item, setUserItem] = React.useState('');
  const [cashId, setCashId] = React.useState('');
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [zakat, setZakat] = React.useState(0);

  return (
    <div className="flex flex-col self-stretch w-full gap-y-4 overflow-y-scroll xs:mb-16 lg:my-5 gridscrollbar">
      <div className="flex flex-col justify-center items-center ">
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
          Here’s what you have so far. Please add your cash and checking account
          balances for accurate zakat calculation
        </span>
        <hr className="w-full border-[1px] border-underline" />
      </div>

      <div className="flex justify-center items-center mt-2 flex-col ">
        {value === 0 && (
          <ItemChoiceForm
            setValue={setValue}
            value={value}
            setCashId={setCashId}
            setUserItem={setUserItem}
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
    </div>
  );
}
