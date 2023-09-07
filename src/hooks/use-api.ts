import { investigationData } from '@src/data/investigation';
import { useCallback, useState } from 'react';
import { Investigation } from '../types/investigation';

const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Investigation[]>();
  const [item, setItem] = useState<Investigation>();
  const [error] = useState<string | null>(null);

  const getItems = useCallback((): void => {
    setLoading(true);
    setItems(investigationData);
    setLoading(false);
  }, []);

  const getItem = useCallback((id: string): void => {
    setLoading(true);
    const investigationItems = investigationData.filter(
      (item) => item.id === id,
    );
    if (investigationItems) {
      setItem(investigationItems[0]);
    }
    setLoading(false);
  }, []);

  return {
    loading,
    items,
    item,
    error,
    getItems,
    getItem,
  };
};

export default useApi;
