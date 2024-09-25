'use client';
import React from 'react';
import ProfileSetup from './profile-setupform';
import { LogoIcon } from '@/assets/svgs';

import { useState } from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';

const PartialProfileSetup = () => {
  return (
    <AuthLayout>
      <div className="flex justify-center gap-x-32 items-center h-[100vh]">
        <div className="w-full">
          <ProfileSetup />
        </div>
      </div>
    </AuthLayout>
  );
};

export default PartialProfileSetup;
