import { Button, Icon } from '@metrostar/comet-uswds';
import { Search } from '@src/components/search/search';
import useApi from '@src/hooks/use-api';
import {
  CompletionSource,
  Investigation as InvestigationState,
  Prompt,
} from '@src/types/investigation';
import { getReference, getScore, getSource } from '@src/utils/api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentInvestigation as defaultInvestigation } from '../../store';
import infinteLoop from '/img/infinteLoop.svg';
import logomark from '/img/logo-mark.svg';
export const Investigation = (): React.ReactElement => {
  const { id } = useParams();
  const { getItem, item, loading } = useApi();
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);
  const [currentInvestigation, setCurrentInvestigation] =
    useRecoilState<InvestigationState>(defaultInvestigation);
  const [showSources, setShowSources] = useState<boolean>(false);

  useEffect(() => {
    if (item) {
      setCurrentInvestigation(item);
    }
  }, [item, setCurrentInvestigation]);

  useEffect(() => {
    if (id) {
      getItem(id);
    }
  }, [id, getItem, setCurrentInvestigation]);

  useEffect(() => {
    if (currentInvestigation) {
      const responsePrompts = currentInvestigation.prompts;

      if (responsePrompts) {
        const newPrompts = [...responsePrompts];
        setPrompts(
          // Reverse the prompts so that the most recent is at the top
          newPrompts?.sort((a, b) => {
            return a.id < b.id ? 1 : -1;
          }),
        );
      }
    }
  }, [currentInvestigation]);

  return (
    <>
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-col">
            <div className="chat-content">
              {prompts?.map((prompt: Prompt) => (
                <div key={`chat-content-${prompt.id}`}>
                  <div className="grid-row flex-column">
                    <div
                      key={`chat-content-question-${prompt.id}`}
                      className="chat-content-question grid-col-3"
                    >
                      {prompt.prompt}
                    </div>
                  </div>
                  {loading ? (
                    <div
                      key={`chat-content-answer-loading`}
                      className="chat-content-answer text-bold"
                    >
                      <img
                        src={infinteLoop}
                        alt="loading"
                        className="searching"
                      />
                    </div>
                  ) : (
                    <div
                      key={`chat-content-answer-${prompt.id}`}
                      className="chat-content-answer grid-col-9"
                    >
                      <div className="grid-row">
                        <div className="grid-col-1">
                          <img
                            className="usa__logo-mark"
                            src={logomark}
                            alt="Horizon Hunt Logo"
                          />
                        </div>
                        <div className="grid-col-10">
                          {prompt.completion}
                          {prompt.sources && prompt.sources.length > 0 ? (
                            <div
                              className="grid-row"
                              key={`chat-content-sources-${prompt.id}`}
                            >
                              <div className="grid-col padding-top-3">
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
                                <span
                                  id={`chat-content-sources-span-${prompt.id}`}
                                >
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
                                {showSources ? (
                                  <ul className="usa-list">
                                    {prompt.sources.map(
                                      (
                                        source: CompletionSource,
                                        index: number,
                                      ) => (
                                        <li
                                          key={`chat-content-sources-item-${index}`}
                                          style={{ listStyle: 'square' }}
                                        >
                                          {`${getSource(source)}${getReference(
                                            source,
                                          )} (Confidence Score: ${getScore(
                                            source,
                                          )}%)`}
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id="investigations">
        <Search />
      </div>
    </>
  );
};
