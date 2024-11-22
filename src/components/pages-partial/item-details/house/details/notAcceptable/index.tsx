import React from 'react';
import { useRouter } from 'next/navigation';

import { textConstants } from '@/configs/textConstants';
import BackContainer from '@/components/common/backContainer';
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
    <div className="flex flex-col text-black px-1 max-w-[807px] pl-12 pr-12">
      <div className="xs:text-xl font-medium sm:text-2xl flex-1 my-8">
        {title}
      </div>
      <div className=" font-regular text-base flex-1 mb-4">{description}</div>

      <BackContainer
        nextButtonText={textConstants.formAddAnotherItemButton}
        handleBack={handleBack}
        useHandleBack={true}
      />
    </div>
  );
};
