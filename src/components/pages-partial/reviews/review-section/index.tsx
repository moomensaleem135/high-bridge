'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { completeZakatUrl } from '@/configs/constants';
import { textConstants } from '@/configs/textConstants';
import { PersonalItemsSection } from '@/components/common/personalItemsSection';
import { CommercialItemsSection } from '@/components/common/commercialItemsSection';

const ZakatCard = () => {
  const items = useSelector((state: any) => state.items.items) || [];
  const cash = useSelector((state: any) => state.cash.cash) || [];
  const house = useSelector((state: any) => state.house.house);
  const hasPersonalItems =
    items.length > 0 || cash.length > 0 || house.length > 0;
  const hasCommercialItems = items.some(
    (item: any) => item.income === 'commercial'
  );

  const router = useRouter();

  return (
    <div className="mb-8">
      {hasPersonalItems && (
        <PersonalItemsSection items={items} cash={cash} house={house} />
      )}
      {hasCommercialItems && <CommercialItemsSection items={items} />}

      {(items.length > 0 || cash.length > 0 || house.length > 0) && (
        <div className="flex flex-col justify-evenly items-center w-full gap-5 mt-12">
          <hr className="w-full border-[1px] border-solid border-underline" />
          <div className="flex flex-row justify-end items-center w-full">
            <div>
              <Button
                className="bg-detailsBtn text-btnText font-medium text-base w-6/6 hover:bg-btnHover px-4"
                onClick={() => router.push(completeZakatUrl)}
              >
                {textConstants.completeZakatButtonText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZakatCard;
