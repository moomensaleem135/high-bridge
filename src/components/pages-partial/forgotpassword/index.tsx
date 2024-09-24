'use client';
import React from 'react';
import ForgotPassword from './forgotPassword-form';
import { LogoIcon } from '@/assets/svgs';

import { useState } from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';

const PartialForgotPassword = () => {
  return (
    <div className="flex justify-center gap-x-32 items-center h-[100vh]">
      <AuthLayout>
        <div className="w-full">
          <ForgotPassword />
        </div>
      </AuthLayout>
    </div>
  );
};

export default PartialForgotPassword;
