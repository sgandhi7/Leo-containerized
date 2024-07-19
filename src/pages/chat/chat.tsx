import { Search } from '@src/components/search/search';
import useAuth from '@src/hooks/use-auth';
import { Chat as ChatState, Prompt } from '@src/types/chat';
import { getAvatarInitials } from '@src/utils/auth';
import { SUGGESTIONS } from '@src/utils/constants';
import React, { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { useRecoilState } from 'recoil';
import {
  currentChat as defaultChat,
  currentSearch as defaultSearch,
  searching,
} from '../../store';
import SourceInfo from './source-info/source-info';
import logomark from '/img/logo.png';

export const Chat = (): React.ReactElement => {
  const { currentUserData } = useAuth();
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);
  const [currentChat] = useRecoilState<ChatState>(defaultChat);
  const [isSearching] = useRecoilState<boolean>(searching);
  const [searchInput, setSearchInput] = useState('');
  const [currentSearch] = useRecoilState<string>(defaultSearch);
  const chatContentRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const answers = document.querySelectorAll('.chat-content-answer');
    if (answers.length > 0) {
      const lastAnswer = answers[0] as HTMLElement;
      lastAnswer.scrollIntoView();
    }
  };

  const handleButtonClick = (buttonText: string) => {
    setSearchInput(buttonText);
  };

  useEffect(() => {
    if (currentChat) {
      const responsePrompts = currentChat.prompts;
      if (responsePrompts) {
        setPrompts(responsePrompts);
      }
    }
  }, [currentChat]);

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    // Observe chat content for changes and scroll to the bottom when changes occur
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((item) => {
        if (
          item.type === 'childList' &&
          item.addedNodes.length > 0 &&
          (item.target as HTMLElement).className === 'chat-content'
        ) {
          scrollToBottom();
        }
      });
    });

    // Start observing the target element
    if (chatContentRef.current) {
      observer.observe(chatContentRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    // Clean up by disconnecting the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="grid-container">
        <div className="grid-row display-flex height-viewport">
          <div
            className="flex-align-self-start margin-x-auto margin-y-auto"
            style={{ overflowY: 'auto', height: '80%', width: '90%' }}
          >
            {!currentSearch ? (
              <div
                className="flex-align-self-start width-100 margin-x-auto margin-y-auto"
                style={{ textAlign: 'center' }}
              >
                <h1 className="margin-bottom-2">
                  What would you like to Search?
                </h1>
                <p className="margin-bottom-3">
                  This chatbot can ONLY answer questions about PTO, Leave, All
                  Benefits (like Healthcare or Retirement and including Life
                  Events).
                </p>
                <div className="button-container">
                  {SUGGESTIONS.map((suggestion: string, index: number) => (
                    <button
                      key={`suggestion-${index}`}
                      className="helper-button"
                      onClick={() => handleButtonClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="chat-content" ref={chatContentRef}>
              {isSearching ? (
                <div key={`chat-content-loading`}>
                  <div
                    key={`chat-content-question-loading`}
                    className="chat-content-question margin-bottom-2"
                  >
                    <div className="grid-row">
                      <div className="grid-col-1">
                        <div className="chat-question-avatar">
                          <span>{getAvatarInitials(currentUserData)}</span>
                        </div>
                      </div>
                      <div className="grid-col-11">{currentSearch}</div>
                    </div>
                  </div>
                  <div
                    key={`chat-content-answer-loading`}
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
                      <div className="grid-col-11">Generating response...</div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
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
                      <div className="grid-col-11">
                        <p>{prompt.prompt}</p>
                      </div>
                    </div>
                  </div>
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
                        <Markdown>{prompt.completion}</Markdown>
                        {prompt.sources && prompt.sources.length > 0 ? (
                          <SourceInfo prompt={prompt} items={prompt.sources} />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
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
