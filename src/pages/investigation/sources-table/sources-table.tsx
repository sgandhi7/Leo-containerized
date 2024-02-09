import { DataTable } from '@metrostar/comet-extras';
import { ChatSource, CompletionSource } from '@src/types/investigation';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface SourcesTableProps {
  id: string;
  items: CompletionSource[] | undefined;
}

export const SourcesTable = ({
  id,
  items,
}: SourcesTableProps): React.ReactElement => {
  const [sources, setSources] = useState<ChatSource[]>();
  const cols = React.useMemo<ColumnDef<ChatSource>[]>(
    () => [
      {
        accessorKey: 'source',
        header: 'Source',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'section',
        header: 'Section',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'dataset',
        header: 'Dataset',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'score',
        header: 'Text Similarity Score',
        cell: (info) => info.getValue(),
      },
    ],
    [],
  );

  const getDatasetFromReference = (source: CompletionSource): string => {
    if (source.document || source.audio) {
      return '9/11 Commission';
    } else if (source.gdelt) {
      return 'GDELT';
    } else {
      return '';
    }
  };

  const getUrlFromReference = (source: CompletionSource): string => {
    if (source.reference) {
      const split = source.reference.split(',');
      return split[0];
    }
    return '';
  };

  const getNameFromReference = (source: CompletionSource): string => {
    const reference = source.reference;
    if (reference) {
      const split = reference.split(',');
      const name = split[0].split('/').pop();
      if (name) return name;
    }
    return '';
  };

  const getSectionFromReference = (source: CompletionSource): string => {
    const reference = source.reference;
    if (reference) {
      const split = reference.split(',');
      if (split.length === 2) {
        return `${split[1]}`;
      } else if (split.length === 3) {
        return `${split[1]}, ${split[2]}`;
      }
    }
    return '';
  };

  useEffect(() => {
    if (items) {
      const newData: ChatSource[] = [];
      items.forEach((item: CompletionSource, index: number) => {
        const dataset = getDatasetFromReference(item);
        newData.push({
          source: (
            <NavLink
              id={`source-link-${index}`}
              to={getUrlFromReference(item)}
              target="_blank"
            >
              {getNameFromReference(item)}
            </NavLink>
          ),
          section: getSectionFromReference(item),
          dataset,
          score: item.score,
        });
      });
      setSources(newData);
    }
  }, [items]);

  return (
    <div id={id} className="padding-y-2">
      {sources ? (
        <DataTable
          id="sources-table"
          className="width-full"
          columns={cols}
          data={sources}
        ></DataTable>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SourcesTable;
