'use client';
import React from 'react';
import ResetPassword from './reset-passwordform';
import { LogoIcon } from '@/assets/svgs';

import { useState } from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';

const PartialResetPassword = () => {
  return (
    <div className="flex justify-center gap-x-32 items-center h-[100vh]">
      <AuthLayout>
        <div className="w-full">
          <ResetPassword />
        </div>
      </AuthLayout>
    </div>
  );
};

export default PartialResetPassword;
