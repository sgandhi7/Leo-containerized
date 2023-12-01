import { completionData } from '@src/data/investigation';
import { isMocked } from '@src/utils/api';
import axios from '@src/utils/axios';
import { useCallback, useState } from 'react';
import { Completion, Investigation } from '../types/investigation';

const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Investigation[]>();
  const [item, setItem] = useState<Investigation>();
  const [completions, setCompletions] = useState<Completion[]>();
  const [error, setError] = useState<string | null>(null);
  const horizonHuntApi =
    'https://ca-horizon-hunt-api.greensand-19f121e4.eastus.azurecontainerapps.io/api/';

  const search = async (
    query: string,
    dataSet: string,
  ): Promise<Completion[]> => {
    return await new Promise((resolve, reject) => {
      setLoading(true);
      if (isMocked()) {
        resolve(completionData);
        setLoading(false);
      } else {
        const url = `/wiki-search`;
        const queryParams = {
          query,
          search_database: dataSet,
        };
        axios
          .get(url, {
            params: queryParams,
          })
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
      }
    });
  };

  const getItems = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(`${horizonHuntApi}investigations`);
      console.log('///getItems:response.data', response.data);
      setItems(response.data);
      console.log('///getItems:items', items);
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
        const response = await axios.get(
          `${horizonHuntApi}investigations/${id}`,
        );
        console.log('///response', response);
        console.log('///response.data', response.data);
        setItem(response.data);
        console.log('///setItem', item);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setItem],
  );
  // const getItem = useCallback((id: string): void => {
  //   setLoading(true);
  //   const investigationItems = investigationData.filter(
  //     (item) => item.id === id,
  //   );
  //   if (investigationItems) {
  //     setItem(investigationItems[0]);
  //   }
  //   setLoading(false);
  // }, []);

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
