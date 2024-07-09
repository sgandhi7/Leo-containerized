import axios from '@src/utils/axios';
import { useState } from 'react';
import { ChatHistory, Completion } from '../types/chat';

const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [completions, setCompletions] = useState<Completion[]>();
  const [error, setError] = useState<string | null>(null);
  const search = async (
    query: string,
    chatHistory: string[] | ChatHistory[] = [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    return await new Promise((resolve, reject) => {
      setLoading(true);
      const url = `/score`;
      const data = { question: query, chat_history: chatHistory };
      axios
        .post(url, JSON.stringify(data))
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setCompletions(data);
          resolve(data);
        })
        .catch((error) => {
          setError(error.message);
          reject(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return {
    loading,
    completions,
    error,
    search,
  };
};

export default useApi;
