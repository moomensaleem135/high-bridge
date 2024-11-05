'use client';

import React from 'react';
import ItemDetailsForm from './detailsForm';
import { useSearchParams } from 'next/navigation';
import GoldChoiceForm from './choiceForm';
import ExcessScreen from './excessScreen';

export default function GoldItemDetails() {
  const searchparams = useSearchParams();
  const [value, setValue] = React.useState<number>(0);
  const [item, setUserItem] = React.useState('');
  const [purpose, setPurpose] = React.useState('');
  const [goldId, setGoldId] = React.useState('');
  const [selection, setSelection] = React.useState('');
  const id = searchparams.get('id');
  return (
    <div className="flex flex-col self-stretch w-full gap-y-4 overflow-y-scroll xs:mb-16 lg:my-5 gridscrollbar">
      <div className="flex flex-col justify-center items-center ">
        {id ? (
          <h1 className="text-center px-4 text-3xl font-semibold">
            Edit Gold & Sliver Items
          </h1>
        ) : (
          <h1 className="text-center px-4 text-3xl font-semibold">
            Add Gold & Sliver Items
          </h1>
        )}

        <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2">
          Here’s what you have so far. Please add your gold and silver items
          such as tola, grams, or ounces.
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
          />
        )}
        {value === 1 && (
          <ExcessScreen
            setSelection={setSelection}
            setValue={setValue}
            value={value}
          />
        )}
        {value === 2 && selection === 'Yes' && <ItemDetailsForm />}
      </div>
    </div>
  );
}
