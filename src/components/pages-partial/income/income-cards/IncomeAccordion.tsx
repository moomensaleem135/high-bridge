'use client';

import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion';

import { AccordionDownIcon } from '@/assets/svgs/accordion-down';
import { ArrowUpIcon } from '@/assets/svgs/arrow-up';

import PersonalCards from './PersonalCards';
import CommercialCards from './CommercialCards';

const IncomeAccordion = () => {
  const [selected, setSelected] = useState<string>('');

  const handleSelection = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const clickedValue = target.innerText;
    setSelected((prevSelected) =>
      prevSelected === clickedValue ? '' : clickedValue
    );
  };
  return (
    <Accordion
      type="single"
      value={selected}
      collapsible
      className="flex flex-col justify-center items-center gap-y-3"
    >
      <AccordionItem
        value="Personal Property"
        className="w-full flex flex-col justify-center items-center"
        onClick={(e) => handleSelection(e)}
      >
        <AccordionTrigger className="bg-accordionBg tracking-tight border-[1px] border-accodionBorder text-xl font-medium text-accordionText flex justify-between items-center w-[90%]  max-w-[985px] p-4 pl-6 pr-6 rounded-md">
          Personal Property
          {selected === 'Personal Property' ? (
            <ArrowUpIcon className="h-4 w-4 ml-2 transition-transform duration-200" />
          ) : (
            <AccordionDownIcon className="h-4 w-4 ml-2 transition-transform duration-200" />
          )}
        </AccordionTrigger>
        <AccordionContent className="flex justify-center items-center">
          <PersonalCards />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value={'Commercial Property'}
        className="w-full flex flex-col justify-center items-center"
        onClick={(e) => handleSelection(e)}
      >
        <AccordionTrigger className="bg-accordionBg border-[1px] text-xl tracking-tight border-accodionBorder  font-medium text-accordionText flex justify-between items-center w-[90%] max-w-[985px] p-4 pl-6 pr-6 rounded-md">
          Commercial Property
          {selected === 'Commercial Property' ? (
            <ArrowUpIcon className="h-4 w-4 ml-2 transition-transform duration-200" />
          ) : (
            <AccordionDownIcon className="h-4 w-4 ml-2 transition-transform duration-200" />
          )}
        </AccordionTrigger>
        <AccordionContent className="flex justify-center items-center">
          <CommercialCards />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default IncomeAccordion;
