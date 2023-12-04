import { DataTable } from '@metrostar/comet-extras';
import { Button } from '@metrostar/comet-uswds';
import useApi from '@src/hooks/use-api';
import { Investigation } from '@src/types/investigation';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { convertToReadableFormat } from '../../utils/utils';
import infinteLoop from '/img/infinteLoop.svg';
export const History = (): React.ReactElement => {
  const [loading, setLoading] = useState(true);
  const { getItems, items } = useApi();
  const [investigations, setInvestigiations] = useState<Investigation[]>();
  const cols = React.useMemo<ColumnDef<Investigation>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'created',
        header: 'Created',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'createdBy',
        header: 'Created By',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        cell: (info) => info.getValue(),
      },
    ],
    [],
  );
  useEffect(() => {
    if (items) {
      const newData: Investigation[] = [];
      items.items.forEach((item: Investigation) => {
        newData.push({
          id: item.id,
          name: (
            <NavLink
              id={`investigation-link-${item.id}`}
              to={`/investigations/${item.id}`}
            >
              {item.name}
            </NavLink>
          ),
          created: convertToReadableFormat(item.created)?.toLocaleString(),
          createdBy: item.createdBy,

          status: item.status,
          prompts: item.prompts,
          actions: (
            <Button id={`share-${item.id}`} onClick={() => {}}>
              Share
            </Button>
          ),
        });
      });
      setInvestigiations(newData);
    }
  }, [items]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    if (investigations) {
      setLoading(false);
    }
  }, [loading, investigations]);
  return (
    <div className="grid-container padding-top-1">
      <div className="grid-row">
        <div className="grid-col">
          <h1>History</h1>
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col">
          {loading ? (
            <img
              src={infinteLoop}
              alt="loading"
              className="searching history"
            />
          ) : investigations ? (
            <DataTable
              id="investigation-table"
              className="width-full"
              columns={cols}
              data={investigations}
              sortable
              sortCol="id"
              sortDir="desc"
            ></DataTable>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
