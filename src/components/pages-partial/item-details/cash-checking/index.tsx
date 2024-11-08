'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

import ItemChoiceForm from './choiceForm';
import ItemDetailsForm from './detailsForm';
import Summary from './summary';
import { textConstants } from '@/configs/textConstants';

export default function CashItemDetails() {
  const searchparams = useSearchParams();
  const id = searchparams.get('id');
  const [value, setValue] = React.useState<number>(0);
  const [item, setUserItem] = React.useState('');
  const [cashId, setCashId] = React.useState('');
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [zakat, setZakat] = React.useState(0);
  const [itemForm, setItemForm] = React.useState<string>('');

  return (
    <div className="flex flex-col self-stretch w-full gap-y-4 overflow-y-scroll xs:mb-16 lg:my-5 gridscrollbar">
      <div className="flex flex-col justify-center items-center ">
        {id ? (
          <h1 className="text-center px-4 text-3xl font-semibold">
            {textConstants.editCashAndChecking}
          </h1>
        ) : (
          <h1 className="text-center px-4 text-3xl font-semibold">
            {value <= 1 && <>{textConstants.addLiquidAssetsMainHeading}</>}
            {value > 1 && <>{textConstants.liquidAssetSummaryReport}</>}
          </h1>
        )}

        <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2 lg:w-3/4 w-full">
          {textConstants.LiquidItemsMainParagraph}
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
    </div>
  );
}
