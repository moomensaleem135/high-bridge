'use client';

import { ILayoutProps } from '@/lib/types';
import Navbar from '@/components/navbar/Navbar';

const AppLayout = ({ children, ...props }: ILayoutProps) => {
  return <Navbar {...props}>{children}</Navbar>;
};

export default AppLayout;
