import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeletons: React.FC = () => {
  return (
    <div className="flex flex-col w-full gap-12 xl:gap-16 xl:w-3/5 items-center justify-center min-h-screen ">
      {/* <Skeleton className="w-2/5 h-[30px] my-4" />
      <Skeleton className="w-full h-[40px]" />
      <Skeleton className="w-full h-[72px]" />
      <Skeleton className="w-full h-[120px]" />
      <Skeleton className="w-full h-[120px]" />
      <Skeleton className="w-full h-[72px]" />
      <Skeleton className="w-full h-[152px]" />
      <Skeleton className="w-2/5 h-[40px]" /> */}
      <p>Loading . . . </p>
    </div>
  );
};

export default LoadingSkeletons;
