
import React from 'react';


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
