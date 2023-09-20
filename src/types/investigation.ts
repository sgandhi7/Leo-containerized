import { ReactNode } from 'react';

export interface Investigation {
  id: string;
  name: string | ReactNode;
  status: 'In Progress' | 'Complete' | 'Cancelled';
  created: string | Date;
  createdBy: string;
  modified?: string | Date;
  modifiedBy?: string;
  prompts: Prompt[];
  actions?: ReactNode;
}

export interface Prompt {
  id: string;
  prompt: string;
  completion: string;
  score: number;
  suggestion?: string;
}

export interface Completion {
  id: string;
  text: string;
  score: number;
}
