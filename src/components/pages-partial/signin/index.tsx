import React from 'react';
import Login from './signin-form/index';
import { LogoIcon } from '@/assets/svgs';
import AuthLayout from '@/components/layouts/AuthLayout';

export default function PartialSignin() {
  return (
    <div className="flex justify-center gap-x-32 items-center h-[100vh]">
      <AuthLayout>
        <div className="w-full">
          <Login />
        </div>
      </AuthLayout>
    </div>
  );
}
