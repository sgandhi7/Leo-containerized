import { DataTable } from '@metrostar/comet-extras';
import { Button, Icon } from '@metrostar/comet-uswds';
import { ChatSource, CompletionSource, Prompt } from '@src/types/chat';
import { hasReport } from '@src/utils/api';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface SourcesTableProps {
  prompt: Prompt;
  items: CompletionSource[] | undefined;
}

export const SourceInfo = ({
  prompt,
  items,
}: SourcesTableProps): React.ReactElement => {
  const [sources, setSources] = useState<ChatSource[]>();
  const [showSources, setShowSources] = useState<boolean>(false);
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

  const handleDownload = () => {
    console.log('Download report');
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
    <div className="grid-row" key={`chat-content-sources-${prompt.id}`}>
      <div className="grid-col padding-top-3">
        <div className="float-left">
          <span
            className="padding-right-1"
            style={{ position: 'relative', top: '5px' }}
          >
            <Icon
              id={`chat-content-sources-icon-${prompt.id}`}
              type="info"
              className="color-primary"
            />
          </span>
          <span id={`chat-content-sources-span-${prompt.id}`}>
            <Button
              id={`chat-content-sources-btn-${prompt.id}`}
              variant="unstyled"
              onClick={() => {
                setShowSources(!showSources);
              }}
              className="font-sans-3xs"
            >
              {showSources ? 'Hide' : 'Show'} Source
            </Button>
          </span>
        </div>
        {hasReport(prompt.prompt) ? (
          <div className="float-right padding-right-3">
            <span
              className="padding-right-1"
              style={{ position: 'relative', top: '5px' }}
            >
              <Icon
                id={`chat-content-download-icon-${prompt.id}`}
                type="file_download"
                className="color-primary"
              />
            </span>
            <span id={`chat-content-download-span-${prompt.id}`}>
              <Button
                id={`chat-content-download-btn-${prompt.id}`}
                variant="unstyled"
                onClick={() => {
                  handleDownload();
                }}
                className="font-sans-3xs"
              >
                Download Report
              </Button>
            </span>
          </div>
        ) : (
          <></>
        )}

        {showSources ? (
          <div className="clear-both padding-top-5 padding-bottom-2">
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
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SourceInfo;
