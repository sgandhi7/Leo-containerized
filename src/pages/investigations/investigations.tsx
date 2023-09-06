import { DataTable } from '@metrostar/comet-extras';
import { investigationData } from '@src/data/investigation';
import { Investigation } from '@src/types/investigation';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Investigations = (): React.ReactElement => {
  const [items] = useState<Investigation[]>(investigationData);
  const [data, setData] = useState<Investigation[]>();
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
    ],
    [],
  );

  useEffect(() => {
    if (items) {
      const newData: Investigation[] = [];
      items.forEach((item: Investigation) => {
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
          created: item.created.toLocaleString(),
          createdBy: item.createdBy,
          status: item.status,
        });
      });
      setData(newData);
    }
  }, [items]);

  return (
    <div className="grid-container padding-top-1">
      <div className="grid-row">
        <div className="grid-col">
          <h1>Current Investigations</h1>
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col">
          {data ? (
            <DataTable
              id="investigation-table"
              className="width-full"
              columns={cols}
              data={data}
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
