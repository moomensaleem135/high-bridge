'use client';
import React from 'react';
import VerifyCode from './verify-form';
import { LogoIcon } from '@/assets/svgs';

import { useState } from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';

const PartialVerify = () => {
  return (
    <AuthLayout>
      <div className="flex justify-center gap-x-32 items-center h-full xs:pb-16 lg:pb-0">
        <div className="w-full">
          <VerifyCode />
        </div>
      </div>
    </AuthLayout>
  );
};

export default PartialVerify;
