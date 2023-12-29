import { Suggestion } from '@src/types/suggestion';
import axios from '@src/utils/axios';
import { useCallback, useState } from 'react';

const useSuggestionsApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Suggestion[]>();
  const [item, setItem] = useState<Suggestion>();

  const getItems = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get('/suggestions');
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
        const response = await axios.get(`/suggestions/${id}`);
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
    getItems,
    getItem,
  };
};

export default useSuggestionsApi;
