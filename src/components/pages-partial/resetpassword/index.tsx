'use client';
import React from 'react';
import ResetPassword from './reset-passwordform';
import { LogoIcon } from '@/assets/svgs';

import { useState } from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';

const PartialResetPassword = () => {
  return (
    <AuthLayout>
      <div className="flex justify-center gap-x-32 items-center h-full lg:h-[100vh]">
        <div className="w-full">
          <ResetPassword />
        </div>
      </div>
    </AuthLayout>
  );
};

export default PartialResetPassword;
