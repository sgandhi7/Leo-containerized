import { Search } from '@src/components/search/search';
import useApi from '@src/hooks/use-api';
import {
  Investigation as InvestigationState,
  Prompt,
} from '@src/types/investigation';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentInvestigation as defaultInvestigation } from '../../store';
import logomark from '/img/logo-mark.svg';
export const Investigation = (): React.ReactElement => {
  const { id } = useParams();
  const { getItem, item, loading } = useApi();

  const [currentInvestigation, setCurrentInvestigation] =
    useRecoilState<InvestigationState>(defaultInvestigation);

  useEffect(() => {
    if (item) {
      console.log('////item', item);
      setCurrentInvestigation(item);

      console.log('////currentInvestigation', currentInvestigation);
      console.log(
        '////currentInvestigation.prompts',
        currentInvestigation?.prompts,
      );
      console.log(
        '////Type of currentInvestigation.prompts',
        typeof currentInvestigation?.prompts,
      );
    }
  }, [item, setCurrentInvestigation]);

  useEffect(() => {
    if (id) {
      console.log('////id', id);
      getItem(id);
    }
  }, [id, getItem, setCurrentInvestigation]);

  useEffect(() => {
    if (currentInvestigation) {
      console.log('========currentInvestigation', currentInvestigation);
    }
  }, [currentInvestigation]);

  return (
    <>
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-col">
            <div className="chat-content">
              {currentInvestigation?.prompts?.map((prompt: Prompt) => (
                <div key={`chat-content-${prompt.id + Math.random()}`}>
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
                      Loading...
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
                        <div className="grid-col-10">{prompt.completion}</div>
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
