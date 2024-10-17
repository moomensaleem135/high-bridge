'use client';
import React from 'react';
import SignUp from './signup-form';
import AuthLayout from '@/components/layouts/AuthLayout';

import { useState } from 'react';

const PartialSignup = () => {
  return (
    <AuthLayout>
      <div className="flex justify-center gap-x-32 items-center h-full xs:pb-16 lg:pb-0">
        <div className="w-full">
          <SignUp />
        </div>
      </div>
    </AuthLayout>
  );
};

export default PartialSignup;
