'use client';
import React from 'react';
import ProfileSetup from './profile-setupform';
import { LogoIcon } from '@/assets/svgs';

import { useState } from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';

const PartialProfileSetup = () => {
  return (
    <div className="flex justify-center gap-x-32 items-center h-[100vh]">
      <AuthLayout>
        <div className="w-full">
          <ProfileSetup />
        </div>
      </AuthLayout>
    </div>
  );
};

export default PartialProfileSetup;
