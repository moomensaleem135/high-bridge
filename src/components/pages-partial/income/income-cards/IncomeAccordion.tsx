'use client';

import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion';

import { AccordionDownIcon } from '@/assets/svgs/accordion-down';

import PersonalCards from './PersonalCards';
import CommercialCards from './CommercialCards';

const IncomeAccordion = () => {
  // const [selected, setSelected] = useState<string>('');

  // const handleSelection = (value: string) => {
  //   setSelected((prevSelected) => (prevSelected === value ? '' : value));
  // };
  return (
    <Accordion
      type="single"
      collapsible
      className="flex flex-col justify-center items-center gap-y-3 w-full"
    >
      <AccordionItem
        value="Personal Property"
        className="w-full flex flex-col justify-center items-center"
      >
        <AccordionTrigger className="bg-accordionBg border-[1px] border-accodionBorder font-[500] text-accordionText flex justify-between items-center w-4/5 p-4 pl-6 pr-6 rounded-md ">
          Personal Property
          <AccordionDownIcon className="AccordionIcon" />
        </AccordionTrigger>
        <AccordionContent className="flex justify-center items-center">
          <PersonalCards />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="Commercial Property"
        className="w-full flex flex-col justify-center items-center"
      >
        <AccordionTrigger className="bg-accordionBg border-[1px] border-accodionBorder font-[500] text-accordionText flex justify-between items-center w-4/5 p-4 pl-6 pr-6 rounded-md ">
          Commercial Property
          <AccordionDownIcon className="AccordionIcon" />
        </AccordionTrigger>
        <AccordionContent className="flex justify-center items-center">
          <CommercialCards />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default IncomeAccordion;
