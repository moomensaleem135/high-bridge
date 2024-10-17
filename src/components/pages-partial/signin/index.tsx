import React from 'react';
import Login from './signin-form/index';
import { LogoIcon } from '@/assets/svgs';
import AuthLayout from '@/components/layouts/AuthLayout';

export default function PartialSignin() {
  return (
    <AuthLayout>
      {/* removed lg:h-[100vh] in all forms*/}
      <div className="flex justify-center gap-x-32 items-center h-full xs:pb-16 lg:pb-0">
        <div className="w-full">
          <Login />
        </div>
      </div>
    </AuthLayout>
  );
}
