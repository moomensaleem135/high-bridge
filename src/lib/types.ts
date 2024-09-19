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
