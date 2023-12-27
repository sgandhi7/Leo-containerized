import axios from '@src/utils/axios';
import { useCallback, useState } from 'react';
import { ChatHistory, Completion, Investigation } from '../types/investigation';

const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Investigation[]>();
  const [item, setItem] = useState<Investigation>();
  const [completions, setCompletions] = useState<Completion[]>();
  const [error, setError] = useState<string | null>(null);
  const search = async (
    query: string,
    dataSet: string,
    chatHistory: ChatHistory[],
  ): Promise<Completion[]> => {
    return await new Promise((resolve, reject) => {
      setLoading(true);
      const url = `/wiki-search`;
      const queryParams = {
        query,
        search_database: dataSet,
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

  const getItems = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get('/investigations');
      setItems(response.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setItems]);

  const getItem = useCallback(
    async (id: string): Promise<void> => {
      try {
        setLoading(true);
        const response = await axios.get(`/investigations/${id}`);
        setItem(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setItem],
  );

  return {
    loading,
    items,
    item,
    completions,
    error,
    search,
    getItems,
    getItem,
  };
};

export default useApi;
