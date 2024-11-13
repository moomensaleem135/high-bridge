import React, { useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { useAppSelector } from '@/store/hooks';
import { textConstants } from '@/configs/textConstants';
import CSVDownload from '@/components/common/csvDownload';

import { Button } from '../ui/button';

interface ExportCardProps {
  cardData: {
    text: string;
    title: string;
  }[];
  className?: string;
}

const ExportCard: React.FC<ExportCardProps> = ({
  cardData,
  className,
  ...props
}) => {
  const cash = useAppSelector((state: any) => state.cash.cash);
  const items = useAppSelector((state: any) => state.items.items);
  const house = useAppSelector((state: any) => state.house.house);

  const data = cash.concat(items, house);

  return (
    <>
      {cardData.map((card, index) => {
        const tooltipId = `card-tooltip-${index}`;
        return (
          <div key={index} className="flex justify-center items-center mt-10">
            <div className="p-2 pt-8 pb-8 gap-y-2 bg-cardbg border-cardBorder rounded-2xl border-[1px] cursor-pointer">
              <div className="flex flex-col justify-start items-center md:h-44 md:w-[400px] xs:w-[300px] gap-y-6 pl-2 pr-2">
                <h2
                  className="text-cardHeading font-medium md:text-xl w-full text-center xs:text-base"
                  data-tooltip-id={tooltipId}
                >
                  {card.title}
                </h2>
                <span className="text-center text-cardText md:text-base xs:text-sm w-full text-wrap font-light">
                  {card.text}
                </span>
                {card.title.includes('Locally') ? (
                  <CSVDownload dataSet={data} />
                ) : (
                  <Button
                    className="bg-black hover:bg-gray-500 text-white xs:text-sm md:text-base  font-medium"
                    disabled
                  >
                    {textConstants.downloadButtonText}
                  </Button>
                )}
              </div>
            </div>

            {card.title === 'Assembly of Muslim Jurists of America' && (
              <ReactTooltip
                id={tooltipId}
                place="top"
                variant="info"
                content={card.title}
                className="custom-tooltip"
              />
            )}
          </div>
        );
      })}
    </>
  );
};

ExportCard.displayName = 'ExportCard';

export default ExportCard;
