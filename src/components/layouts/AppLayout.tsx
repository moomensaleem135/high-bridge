'use client';

import { ILayoutProps } from '@/lib/types';
import Navbar from '@/components/navbar/Navbar';

const AppLayout = ({ children, ...props }: ILayoutProps) => {
  return (
    <div className="overflow-x-hidden">
      <Navbar {...props}>{children}</Navbar>;
    </div>
  );
};

export default AppLayout;