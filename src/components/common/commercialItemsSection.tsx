import React from 'react';
import { textConstants } from '@/configs/textConstants';
import { CommercialItemCard } from './commercialItemsCard';

export const CommercialItemsSection = ({ items }: any) => {
  const commercialText = [
    textConstants.goodAndServiceItem,
    textConstants.manufactureItem,
    textConstants.farmItem,
    textConstants.livestockItem,
    textConstants.realEstateItem,
    textConstants.rentalItem,
  ];

  const categorizedItems = categorizeItems(items, commercialText);

  return (
    <div>
      {Object.keys(categorizedItems).map((incomeKey) => (
        <CommercialItemCard
          key={incomeKey}
          title={incomeKey}
          items={categorizedItems[incomeKey]}
        />
      ))}
    </div>
  );
};

const categorizeItems = (items: any[], categoryList: string[]) => {
  return items.reduce((acc: any, item: any) => {
    const category = categoryList.includes(item.income) ? item.income : null;
    if (category) {
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
    }
    return acc;
  }, {});
};
