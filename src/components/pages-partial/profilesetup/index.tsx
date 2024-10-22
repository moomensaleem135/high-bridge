'use client';
import React from 'react';
import ProfileSetup from './profile-setupform';
import AuthLayout from '@/components/layouts/AuthLayout';

const PartialProfileSetup = () => {
  return (
    <AuthLayout>
      <div className="flex justify-center gap-x-32 items-center h-full xs:pb-28 lg:pb-0 ">
        <div className="w-full">
          <ProfileSetup />
        </div>
      </div>
    </AuthLayout>
  );
};

export default PartialProfileSetup;
