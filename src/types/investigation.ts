import { ReactNode } from 'react';

export interface Investigation {
  id?: string;
  name?: string | ReactNode;
  status?: 'In Progress' | 'Complete' | 'Cancelled';
  created?: string | Date;
  createdBy?: string;
  modified?: string | Date;
  modifiedBy?: string;
  prompts?: Prompt[];
  actions?: ReactNode;
}

export interface Prompt {
  id: string;
  prompt: string;
  completion: string;
  suggestion?: string;
  sources?: CompletionSource[];
}

export interface CompletionSource {
  reference: string | null;
  document: string;
  gdelt?: string;
  score: number;
}

export interface Completion {
  completion: string;
  sources: CompletionSource[];
}
