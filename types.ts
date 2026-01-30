
import React from 'react';

export enum Page {
  DASHBOARD = 'dashboard',
  MY_INFO = 'my_info',
  PRICING = 'pricing',
  GUIDE = 'guide',
  SUPPORT = 'support',
  DOWNLOAD = 'download',
  ADMIN_SUPPORT = 'admin_support',
}

export type Tool = {
  id: string;
  title: string;
  desc: React.ReactNode;
  icon: React.ElementType;
  color: string;
  enabled: boolean;
};

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}
