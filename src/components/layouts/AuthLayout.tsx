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
    <main className="flex justify-center gap-x-32 items-center w-screen h-screen">
      <div className="flex flex-col justify-between items-start h-3/6 w-3/12">
        <div className="w-full">
          <LogoIcon />
        </div>

        <CarouselText
          textParas={paras}
          interval={5000}
          title="Building the Future..."
        />
      </div>
      <div className="w-[32%]">{children}</div>
    </main>
  );
};

export default AuthLayout;
