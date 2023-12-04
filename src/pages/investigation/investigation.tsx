import { Search } from '@src/components/search/search';
import useApi from '@src/hooks/use-api';
import { Investigation as InvestigationState } from '@src/types/investigation';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentInvestigation as defaultInvestigation } from '../../store';
import infinteLoop from '/img/infinteLoop.svg';
import logomark from '/img/logo-mark.svg';
export const Investigation = (): React.ReactElement => {
  const { id } = useParams();
  const { getItem, item, loading } = useApi();
  const [prompts, setPrompts] = useState(null);
  const [currentInvestigation, setCurrentInvestigation] =
    useRecoilState<InvestigationState>(defaultInvestigation);

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
      const prompts = currentInvestigation.prompts;

      if (prompts) {
        // prompts = JSON.parse(prompts);
        setPrompts(prompts);
      }
      if (typeof prompts === 'string') {
        try {
          setPrompts(prompts);
        } catch (error) {
          console.error('Error parsing JSON:', prompts);
          console.error(error);
        }
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
