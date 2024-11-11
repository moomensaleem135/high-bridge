import React from 'react';
import { LogoIcon } from '@/assets/svgs';
import CarouselText from '../common/carousel';
import { textConstants } from '@/configs/textConstants';

const paras = [
  {
    text: <p> {textConstants.CarouselTextParagraphOne}</p>,
    alt: 'info',
  },
  {
    text: <p> {textConstants.CarouselTextParagraphTwo}</p>,
    alt: 'info',
  },
  {
    text: <p> {textConstants.CarouselTextParagraphThree}</p>,
    alt: 'info',
  },
];

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col xs:justify-start md:justify-center lg:flex-row py-0 lg:pr-[7rem] lg:pl-[7rem] items-center w-screen h-screen max-lg:my-10 overflow-y-auto overflow-x-hidden lg:pt-52 custom:pt-20 lg:pb-20 xl:py-0">
      <div className="flex flex-col justify-between items-start lg:h-3/6 mb-12 lg:w-1/2 max-w-[770px]">
        <div className="w-full max-lg:flex max-lg:justify-center max-lg:items-center">
          <LogoIcon />
        </div>

        <CarouselText
          textParas={paras}
          interval={5000}
          title="Building the Future..."
        />
      </div>
      <div className="lg:w-1/2 max-w-[650px] w-full xs:px-4 sm:px-16 lg:px-0">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
