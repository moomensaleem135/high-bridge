import React from 'react';
import { useRouter } from 'next/navigation';

import { ArrowLeftIcon } from '@/assets/svgs';
import { Button } from '@/components/ui/button';
import { textConstants } from '@/configs/textConstants';
interface ZakatInfoProps {
  title: string;
  description: string;
  handleBack: () => void;
}

export const NotAcceptable: React.FC<ZakatInfoProps> = ({
  title,
  description,
  handleBack,
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col text-black px-1 max-w-[807px]">
      <div className="xs:text-xl font-medium sm:text-2xl flex-1 my-8">
        {title}
      </div>
      <div className=" font-regular text-base flex-1 mb-4">{description}</div>
      <div className="flex flex-col justify-evenly items-center w-full gap-5">
        <hr className="w-full border-[1px] border-solid border-underline mt-10" />
        <div className="flex justify-between items-center w-full md:flex-row md:justify-between md:items-center">
          <div
            className="flex justify-start items-center text-base font-medium cursor-pointer"
            onClick={() => router.push('/income')}
          >
            <ArrowLeftIcon />
            {textConstants.formBackButtonText}
          </div>
          <Button
            className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover px-3"
            onClick={() => handleBack()}
          >
            {textConstants.formAddAnotherItemButton}
          </Button>
        </div>
      </div>
    </div>
  );
};
