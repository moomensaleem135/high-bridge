import React from 'react';
import { LogoIcon } from '@/assets/svgs';
import CarouselText from '../common/carousel';

const paras = [
  {
    text: (
      <p>
        {' '}
        Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit, sed do
        eiusmod tempor incididunt ut labore et <br />
        dolore magna aliqua.{' '}
      </p>
    ),
    alt: 'info',
  },
  {
    text: (
      <p>
        {' '}
        Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit, sed do
        eiusmod tempor incididunt ut labore et <br />
        dolore magna aliqua.{' '}
      </p>
    ),
    alt: 'info',
  },
  {
    text: (
      <p>
        {' '}
        Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit, sed do
        eiusmod tempor incididunt ut labore et <br />
        dolore magna aliqua.{' '}
      </p>
    ),
    alt: 'info',
  },
];

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col lg:flex-row py-0 lg:pr-[7rem] xl:pl-[15rem] lg:pl-[8rem] items-center w-screen h-screen max-lg:my-10 overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col justify-between items-start lg:h-3/6 mb-12 lg:w-1/2 w-full">
        <div className="w-full max-lg:flex max-lg:justify-center max-lg:items-center">
          <LogoIcon />
        </div>

        <CarouselText
          textParas={paras}
          interval={5000}
          title="Building the Future..."
        />
      </div>
      <div className="lg:w-1/2 max-w-[650px] w-full px-16 lg:px-0">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
