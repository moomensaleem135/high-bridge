'use client';

import React from 'react';

import AppLayout from '@/components/common/layout/AppLayout';
import GoldItemDetails from './gold-silver';
import { useAppSelector } from '@/store/hooks';
import CashItemDetails from './cash-checking';

export default function PartialItemDetails() {
  const income = useAppSelector((state: any) => state.income.income);
  console.log('income', income);

  const renderItemDetails = () => {
    if (income?.toLowerCase().includes('gold')) {
      return <GoldItemDetails />;
    } else if (income?.toLowerCase().includes('cash')) {
      return <CashItemDetails />;
    } else {
      return <GoldItemDetails />;
    }
  };

  return <AppLayout>{renderItemDetails()}</AppLayout>;
}
