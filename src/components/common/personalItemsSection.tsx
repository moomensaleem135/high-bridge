import React from 'react';
import { textConstants } from '@/configs/textConstants';
import { PersonalItemCard } from './personalItemsCard';

export const PersonalItemsSection = ({ items, cash, house }: any) => {
  const personalText = [
    textConstants.goldAndSilverItem,
    textConstants.liquidAssetsItem,
    textConstants.houseItem,
  ];

  const categorizedItems = categorizeItems(items, personalText);
  const categorizedCash = categorizeItems(cash, personalText);
  const houseItems = categorizeItems(house, personalText);

  return (
    <div>
      <h2 className="font-medium text-2xl mb-2">
        {textConstants.personalPropertyType}
      </h2>
      {categorizedItems['Gold & Silver'] && (
        <PersonalItemCard
          title={textConstants.reviewGoldAndSilver}
          items={categorizedItems['Gold & Silver']}
        />
      )}
      {houseItems['House'] && (
        <PersonalItemCard
          title={textConstants.reviewHouse}
          items={houseItems['House']}
        />
      )}
      {categorizedCash['Liquid Assets (Cash, Checking, Saving, Loan)'] && (
        <PersonalItemCard
          title={textConstants.reviewCashAndChecking}
          items={
            categorizedCash['Liquid Assets (Cash, Checking, Saving, Loan)']
          }
        />
      )}
    </div>
  );
};

const categorizeItems = (items: any[], categoryList: string[]) => {
  return items.reduce((acc, item) => {
    const category = categoryList.includes(item.income) ? item.income : null;
    if (category) {
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
    }
    return acc;
  }, {});
};
