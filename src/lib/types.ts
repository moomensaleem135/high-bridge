/* eslint-disable no-unused-vars */
import { JSX, ReactNode } from 'react';
import { StaticImageData } from 'next/image';

export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}

export type IconType = (_props: IconBaseProps) => JSX.Element;

export interface ILayoutProps {
  children?: ReactNode;
  description?: string;
  icon?: IconType;
}

export interface IEvent {
  date: string;
  description: string;
  title: string;
  id?: string;
  image?: string | StaticImageData;
}


interface IItems {
  income: string;
  religion: string;
  item: string;
  purpose: string;
  usage: string;
  quality: string;
  weight: string;
  price: string
  quantity : string
}

export interface GoldIItems extends IItems {
  goldId: string;
}

export interface CashIItems extends IItems {
  cashId: string;
}



export interface ISects {
  sect: string;
}

export interface ISelection{
  selection : string
}

export interface IIncome {
  income: string;
}

export interface ISetup {
  startDate: string;
  generic : string
  year: string;
  religion: string;
}

export interface IZakat {
  id: string,
  quantity?: number;
  weight?: string;
  value?: number;
}

export interface ITimezone {
  value: string;
  abbr: string;
  offset: number;
  isdst: boolean;
  text: string;
  utc: string[];
}

export interface IUser {
  firstName: string;
  lastName: string;
}
