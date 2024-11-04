import React from 'react';
import AppLayout from '@/components/layouts/AppLayout';
import ComingSoon from '@/components/common/ComingSoon';

export default function PartialDeductions() {
  return (
    <AppLayout>
      <div className="flex justify-center gap-x-32 items-center h-full lg:h-[100vh]">
        <div className="w-full">
          <ComingSoon />
        </div>
      </div>
    </AppLayout>
  );
}
