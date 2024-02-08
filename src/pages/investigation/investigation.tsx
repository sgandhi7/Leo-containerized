import { Button, Icon } from '@metrostar/comet-uswds';
import { Search } from '@src/components/search/search';
import useApi from '@src/hooks/use-api';
import useAuth from '@src/hooks/use-auth';
import {
  CompletionSource,
  Investigation as InvestigationState,
  Prompt,
} from '@src/types/investigation';
import { getReference, getScore, getSource } from '@src/utils/api';
import { getAvatarInitials } from '@src/utils/auth';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentInvestigation as defaultInvestigation } from '../../store';
import infinteLoop from '/img/infinteLoop.svg';
import logomark from '/img/logo-mark.svg';
export const Investigation = (): React.ReactElement => {
  const { id } = useParams();
  const { getItem, item, loading } = useApi();
  const { currentUserData } = useAuth();
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);
  const [currentInvestigation, setCurrentInvestigation] =
    useRecoilState<InvestigationState>(defaultInvestigation);
  const [showSources, setShowSources] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (item) {
      const prompts = item.prompts;
      let newPrompts: Prompt[] = [];
      if (prompts) {
        newPrompts = [...prompts];
        // Reverse the prompts so that the most recent is at the top
        newPrompts?.sort((a, b) => {
          return a.id < b.id ? 1 : -1;
        });
      }

      setCurrentInvestigation({ ...item, prompts: newPrompts });
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
        setPrompts(responsePrompts);
      }
    }
  }, [currentInvestigation]);

  return (
    <>
      <div className="grid-container">
        <div className="grid-row display-flex height-viewport">
          <div
            className="flex-align-self-start width-full margin-x-auto margin-y-auto"
            style={{ overflowY: 'auto', height: '80%' }}
          >
            <div className="chat-content">
              {prompts?.map((prompt: Prompt) => (
                <div key={`chat-content-${prompt.id}`}>
                  <div
                    key={`chat-content-question-${prompt.id}`}
                    className="chat-content-question margin-bottom-2"
                  >
                    <div className="grid-row">
                      <div className="grid-col-1">
                        <div className="chat-question-avatar">
                          <span>{getAvatarInitials(currentUserData)}</span>
                        </div>
                      </div>
                      <div className="grid-col-11">{prompt.prompt}</div>
                    </div>
                  </div>
                  {loading ? (
                    <div
                      key={`chat-content-answer-loading`}
                      className="grid-row chat-content-answer text-bold"
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
                      className="chat-content-answer margin-bottom-2 "
                    >
                      <div className="grid-row">
                        <div className="grid-col-1">
                          <img
                            className="usa__logo-mark"
                            src={logomark}
                            alt="Horizon Hunt Logo"
                          />
                        </div>
                        <div className="grid-col-11">
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
                                          )} (Text Similarity Score: ${getScore(
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
          <div className="flex-align-self-end width-full margin-bottom-5">
            <Search searchInput={searchInput} setSearchInput={setSearchInput} />
          </div>
        </div>
      </div>
    </>
  );
};
