'use client';

import React from 'react';

import AppLayout from '@/components/layouts/AppLayout';
import { useAppSelector } from '@/store/hooks';
import GoldItemDetails from './gold-silver';
import CashItemDetails from './cash-checking';
import HouseDetails from './house';

export default function PartialItemDetails() {
  const income = useAppSelector((state: any) => state.income.income);

  const renderItemDetails = () => {
    if (income?.toLowerCase()?.includes('gold')) {
      return <GoldItemDetails />;
    } else if (income?.toLowerCase()?.includes('cash')) {
      return <CashItemDetails />;
    } else if (income?.toLowerCase()?.includes('house')) {
      return <HouseDetails />;
    } else {
      return <GoldItemDetails />;
    }
  };

  return <AppLayout>{renderItemDetails()}</AppLayout>;
}
