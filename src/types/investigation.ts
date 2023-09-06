import { ReactNode } from 'react';

export interface Investigation {
  id: string;
  name: string | ReactNode;
  status: 'In Progress' | 'Complete' | 'Cancelled';
  created: string | Date;
  createdBy: string;
  modified?: string | Date;
  modifiedBy?: string;
}
