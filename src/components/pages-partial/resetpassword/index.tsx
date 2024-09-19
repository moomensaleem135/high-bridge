'use client';
import React from 'react';
import Form from '@/components/ui/resetpasswordform';
import { LogoIcon } from '@/assets/svgs';

import { useState } from 'react';

const PartialResetPassword = () => {
  return (
    <div className="flex justify-evenly items-center h-[100vh]">
      <div className="flex flex-col justify-between items-start h-[45%] w-[30%]">
        <div>
          <LogoIcon />
        </div>
        <div className="w-[80%] h-[35%] flex flex-col justify-between">
          <h2 className="text-4xl font-[700] w-full">Building the Future...</h2>
          <p className="font-[400]">
            Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit, sed
            do eiusmod tempor incididunt ut labore et <br />
            dolore magna aliqua.{' '}
          </p>
        </div>
      </div>
      <div>
        <Form />
      </div>
    </div>
  );
};

export default PartialResetPassword;
