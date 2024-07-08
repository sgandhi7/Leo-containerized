import axios from '@src/utils/axios';
import { useState } from 'react';
import { ChatHistory, Completion } from '../types/investigation';

const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [completions, setCompletions] = useState<Completion[]>();
  const [error, setError] = useState<string | null>(null);
  const search = async (
    query: string,
    chatHistory: ChatHistory[],
  ): Promise<Completion[]> => {
    return await new Promise((resolve, reject) => {
      setLoading(true);
      const url = `/wiki-search`;
      const queryParams = {
        query,
      };
      axios
        .post(url, chatHistory, { params: { ...queryParams } })
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
