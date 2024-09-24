'use client';

import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion';

import { ArrowDownIcon } from '@/assets/svgs';

import PersonalCards from './PersonalCards';
import CommercialCards from './CommercialCards';

const IncomeAccordion = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="flex flex-col justify-center items-center gap-y-5 w-full"
    >
      <AccordionItem
        value="Personal Property"
        className="w-full flex flex-col justify-center items-center"
      >
        <AccordionTrigger className="bg-[#F8F8F8] border-[1px] border-[#DFE3E6] flex justify-between items-center w-4/5 p-4 pl-6 pr-6 rounded-md">
          Personal Property
          <ArrowDownIcon className="h-4 w-4 ml-2 transition-transform duration-200" />
        </AccordionTrigger>
        <AccordionContent className="flex justify-center items-center">
          <PersonalCards />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="Personal Property"
        className="w-full flex flex-col justify-center items-center"
      >
        <AccordionTrigger className="bg-[#F8F8F8] border-[1px] border-[#DFE3E6] flex justify-between items-center w-4/5 p-4 pl-6 pr-6 rounded-md">
          Commercial Property
          <ArrowDownIcon className="h-4 w-4 ml-2 transition-transform duration-200" />
        </AccordionTrigger>
        <AccordionContent className="flex justify-center items-center">
          <CommercialCards />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default IncomeAccordion;
