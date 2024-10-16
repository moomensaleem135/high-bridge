'use client';
import React from 'react';
import ForgotPassword from './forgotPassword-form';
import { LogoIcon } from '@/assets/svgs';

import { useState } from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';

const PartialForgotPassword = () => {
  return (
    <AuthLayout>
      <div className="flex justify-center gap-x-32 items-center h-full lg:h-[100vh] xs:pb-16 lg:pb-0">
        <div className="w-full">
          <ForgotPassword />
        </div>
      </div>
    </AuthLayout>
  );
};

export default PartialForgotPassword;
