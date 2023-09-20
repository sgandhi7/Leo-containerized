import { Search } from '@src/components/search/search';
import useApi from '@src/hooks/use-api';
import {
  Investigation as InvestigationState,
  Prompt,
} from '@src/types/investigation';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentInvestigation as defaultInvestigation } from 'src/store';

export const Investigation = (): React.ReactElement => {
  const { id } = useParams();
  const { getItem, item, loading } = useApi();
  const [currentInvestigation, setCurrentInvestigation] = useRecoilState<
    InvestigationState | undefined
  >(defaultInvestigation);

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

  return (
    <>
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-col">
            <div className="chat-content">
              {currentInvestigation?.prompts.map((prompt: Prompt) => (
                <div key={`chat-content-${prompt.id}`}>
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
                      className="chat-content-answer"
                    >
                      {prompt.completion}
                    </div>
                  )}
                  <div
                    key={`chat-content-question-${prompt.id}`}
                    className="chat-content-question"
                  >
                    {prompt.prompt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Search />
    </>
  );
};
