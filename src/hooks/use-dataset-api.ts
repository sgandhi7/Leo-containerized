import { Dataset } from '@src/types/dataset';
import axios from '@src/utils/axios';
import { useCallback, useState } from 'react';

const useDatasetApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Dataset[]>();
  const [item, setItem] = useState<Dataset>();

  const getItems = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get('/datasets');
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
        const response = await axios.get(`/datasets/${id}`);
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

export default useDatasetApi;
