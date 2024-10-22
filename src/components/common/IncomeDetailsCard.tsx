import React, { useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { IncomeDetailsIcon } from '@/assets/svgs/Income-details';
import { SelectedIcon } from '@/assets/svgs/selected';
import { useDispatch, useSelector } from 'react-redux';
import { addSect } from '@/store/features/sects/sectsSlice';

interface IncomeDetailsCardProps {
  cardData: {
    text: string;
    title: string;
  }[];
  className?: string;
  setReligion: (value: string) => void;
}

const IncomeDetailsCard: React.FC<IncomeDetailsCardProps> = ({
  cardData,
  className,
  setReligion,
  ...props
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.setup.setup);

  React.useEffect(() => {
    const matchingIndex = cardData.findIndex(
      (card) => card.title === selector.religion
    );
    setSelectedIndex(matchingIndex !== -1 ? matchingIndex : null);
    setReligion(selector.religion);
    dispatch(addSect(selector.religion));
  }, [selector.religion, cardData]);

  return (
    <>
      {cardData.map((card, index) => {
        // Create a unique tooltip ID based on the card title
        const tooltipId = `card-tooltip-${index}`;
        return (
          <div
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <div
              className={`flex flex-col justify-start items-center p-2 pt-8 pb-3 gap-y-2 bg-cardbg rounded-xl ${
                selectedIndex === index
                  ? 'border-[#4CAF50] border-[2px]'
                  : 'border-cardBorder'
              } 
               
              border-[1px] cursor-pointer`}
              onClick={() => {
                setReligion(card.title);
                setSelectedIndex(index);
                dispatch(addSect(card.title));
              }}
            >
              {selectedIndex === index ? (
                <div className="rounded-[50%] bg-[#4CAF5026] border-[#4CAF50] border-[1px] h-14 w-14 flex justify-center items-center">
                  <SelectedIcon />
                </div>
              ) : (
                <div className="rounded-[50%] bg-[#DFE3E6] h-14 w-14 flex justify-center items-center">
                  <IncomeDetailsIcon />
                </div>
              )}

              <div className="flex flex-col justify-start items-center h-24 w-60 gap-1">
                <h2
                  className="text-cardHeading font-[600] text-lg w-full text-center line-clamp-1"
                  data-tooltip-id={tooltipId} // Apply tooltip ID to the title element
                >
                  {card.title}
                </h2>
                <span className="text-center text-cardText text-sm w-full text-wrap">
                  {card.text}
                </span>
              </div>
            </div>
            {/* Render the tooltip only for the specific card title */}
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

IncomeDetailsCard.displayName = 'IncomeDetailsCard';

export default IncomeDetailsCard;
