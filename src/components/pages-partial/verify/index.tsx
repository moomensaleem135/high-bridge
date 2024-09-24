'use client';
import React from 'react';
import VerifyCode from './verify-form';
import { LogoIcon } from '@/assets/svgs';

import { useState } from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';

const PartialVerify = () => {
  return (
    <div className="flex justify-center gap-x-32 items-center h-[100vh]">
      <AuthLayout>
        <div className="w-full">
          <VerifyCode />
        </div>
      </AuthLayout>
    </div>
  );
};

export default PartialVerify;
