'use client';
import React from 'react';
import ResetPassword from './reset-passwordform';

import AuthLayout from '@/components/layouts/AuthLayout';

const PartialResetPassword = () => {
  return (
    <AuthLayout>
      <div className="flex justify-center gap-x-32 items-center h-full xs:pb-16 lg:pb-0">
        <div className="w-full">
          <ResetPassword />
        </div>
      </div>
    </AuthLayout>
  );
};

export default PartialResetPassword;
