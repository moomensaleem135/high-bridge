'use client';
import React from 'react';
import StorageSelection from './selection-form';
import AuthLayout from '@/components/layouts/AuthLayout';

const PartialSelection = () => {
  return (
    <AuthLayout>
      <div className="flex justify-center gap-x-32 items-center h-full lg:h-[100vh] xs:pb-16 lg:pb-0">
        <div className="w-full">
          <StorageSelection />
        </div>
      </div>
    </AuthLayout>
  );
};

export default PartialSelection;
