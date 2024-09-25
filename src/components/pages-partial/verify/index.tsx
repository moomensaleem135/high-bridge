'use client';
import React from 'react';
import VerifyCode from './verify-form';
import { LogoIcon } from '@/assets/svgs';

import { useState } from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';

const PartialVerify = () => {
  return (
    <AuthLayout>
      <div className="flex justify-center gap-x-32 items-center h-full lg:h-[100vh]">
        <div className="w-full">
          <VerifyCode />
        </div>
      </div>
    </AuthLayout>
  );
};

export default PartialVerify;
