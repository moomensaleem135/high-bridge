'use client';
import React from 'react';
import SignUp from './signup-form';
import AuthLayout from '@/components/layouts/AuthLayout';

import { useState } from 'react';

const PartialSignup = () => {
  return (
    <div className="flex justify-center gap-x-32 items-center h-[100vh]">
      <AuthLayout>
        <div className="w-full">
          <SignUp />
        </div>
      </AuthLayout>
    </div>
  );
};

export default PartialSignup;
