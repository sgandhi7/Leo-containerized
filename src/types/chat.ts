import { ReactNode } from 'react';

export interface Chat {
  id?: string;
  name?: string | ReactNode;
  status?: 'In Progress' | 'Complete' | 'Cancelled';
  created?: string | Date;
  created_by?: string;
  modified?: string | Date;
  modified_by?: string;
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
  audio?: string;
  score: number;
}

export interface Completion {
  completion: string;
  sources: CompletionSource[];
}

export interface ChatHistory {
  prompt: string;
  completion: string;
}

export interface ChatSource {
  source: string | ReactNode;
  section: string | null;
  dataset: string | null;
  score: number;
}
