//import { Button, Icon } from '@metrostar/comet-uswds';
import Typewriter from '@/components/text-area-input/typewriter';
import useApi from '@/hooks/use-api';
import { Search } from '@/pages/chat';
import {
  currentUserState,
  currentInvestigation as defaultInvestigation,
  currentSearch as defaultSearch,
  searching,
  sessionId,
  sessions,
} from '@/store';
import {
  Investigation as InvestigationState,
  Prompt,
  Session,
} from '@/types/investigation';
import { User } from '@/types/user';
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { getApiBaseUrl } from '../utils/env';
import lockIcon from '/img/lockIcon.svg';

export const clearChat = (
  setPrompts: React.Dispatch<React.SetStateAction<Prompt[] | null>>,
  setSessionId: React.Dispatch<React.SetStateAction<string | undefined>>,
  setCurrentInvestigation: React.Dispatch<
    React.SetStateAction<InvestigationState>
  >,
) => {
  window.sessionStorage.removeItem('chat_history');
  setPrompts([]);
  setSessionId(undefined);
  setCurrentInvestigation((prev) => ({ ...prev, prompts: [] }));
};

export const Investigation = (): React.ReactElement => {
  const { id } = useParams();
  const { getItem, item } = useApi();
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);
  const [currentInvestigation, setCurrentInvestigation] =
    useRecoilState<InvestigationState>(defaultInvestigation);
  const [isSearching] = useRecoilState<boolean>(searching);
  const [showSources, setShowSources] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState('');
  const [currentSearch] = useRecoilState<string>(defaultSearch);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [user] = useRecoilState(currentUserState);
  const chatContentRef = useRef<HTMLDivElement>(null);
  const [sessId, setSessionId] = useRecoilState<string | undefined>(sessionId);
  const [, setSessions] = useRecoilState<Session[] | undefined>(sessions);
  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };

  // const clearChat = () => {
  //   window.sessionStorage.removeItem('chat_history');
  //   setPrompts([]);
  //   setSessionId(undefined);
  //   setCurrentInvestigation((prev) => ({ ...prev, prompts: [] }));
  // };

  const handleButtonClick = (buttonText: string) => {
    setSearchInput(buttonText);
  };

  useEffect(() => {
    if (item) {
      const newPrompts = item.prompts ? [...item.prompts] : [];
      setCurrentInvestigation({ ...item, prompts: newPrompts });
      setIsTypingComplete(false);
    }
  }, [item, setCurrentInvestigation, sessId, setSessionId]);

  useEffect(() => {
    if (id) {
      getItem(id);
    }
  }, [id, getItem]);

  useEffect(() => {
    if (sessId === undefined) {
      setSessionId(uuidv4());
    }
    const uploadSession = () => {
      console.log('Uploading Session: ', sessId);
      if (prompts && prompts.length > 0) {
        const session = JSON.stringify({
          prompts: prompts,
          chatHistory: window.sessionStorage.getItem('chat_history'),
        });
        /*changed fetch statement here to connect front-end to backend when containerizing*/
        fetch(`${getApiBaseUrl()}/fetchSessions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user?.emailAddress,
            sessionId: sessId,
            action: 'push',
            session: session,
          }),
        });
      }
    };
    const fetchSessions = async () => {
      if (!user?.emailAddress) return;

      try {
        const response = await fetch(`${getApiBaseUrl()}/fetchSessions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user: user.emailAddress, action: 'pull' }),
        });
        const tempSessions = await response.json();
        const parsedSessions = tempSessions.map((session: string) => {
          const parsedSession = JSON.parse(session);
          return {
            sessionId: parsedSession.Name,
            prompts: parsedSession.Content.prompts,
            chatHistory: parsedSession.Content.chatHistory,
          };
        });
        setSessions(parsedSessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };
    if (currentInvestigation && currentInvestigation.prompts) {
      setPrompts(currentInvestigation.prompts);
    }
    if (isTypingComplete) {
      uploadSession();
      fetchSessions();
    }
  }, [
    currentInvestigation,
    prompts,
    sessId,
    user?.emailAddress,
    isTypingComplete,
    setSessionId,
    setSessions,
  ]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      scrollToBottom();
    });

    if (chatContentRef.current) {
      observer.observe(chatContentRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid-container">
      <div
        className="grid-row display-flex height-viewport"
        style={{ width: '100%' }}
      >
        <div
          className="flex-align-self-start margin-x-auto margin-y-auto"
          style={{
            overflowY: 'auto',
            overflowX: 'auto',
            width: '100%',
            maxHeight: 'calc(100vh - 200px)',
          }}
          ref={chatContentRef}
        >
          <div className="chat-content">
            <div style={{ textAlign: 'center' }}>
              {isSearching && (
                <ChatMessage
                  isLoading={true}
                  prompt={{
                    id: 'temp-id',
                    prompt: currentSearch,
                    //should add the infinity symbol here
                    completion: 'Generating response...',
                    sources: [],
                    suggestions: [],
                  }}
                  user={user || null || undefined}
                  isLatestMessage={true} // This will be the latest message while searching
                />
              )}
            </div>
            {prompts?.map((prompt: Prompt, index: number) => (
              <ChatMessage
                key={`chat-content-${prompt.id}`}
                prompt={prompt}
                user={user || null || undefined}
                isTypingComplete={isTypingComplete}
                setIsTypingComplete={setIsTypingComplete}
                showSources={showSources}
                setShowSources={setShowSources}
                handleButtonClick={handleButtonClick}
                isLatestMessage={index === 0 && !isSearching} // Only the last message is latest if not searching
              />
            ))}
          </div>
        </div>
        <div className="flex-align-self-end width-full">
          {/* <Button
            id="clear-chat-btn"
            onClick={() =>
              clearChat(setPrompts, setSessionId, setCurrentInvestigation)
            }
            style={{
              position: 'relative',
              float: 'left',
              marginLeft: '100px',
              marginTop: '5px',
              zIndex: 2,
            }}
          >
            New Chat
          </Button> */}
          <Search searchInput={searchInput} setSearchInput={setSearchInput} />
          <div
            className="md:px-[60px]"
            style={{
              position: 'relative',
              bottom: '10px',
              right: '0',
              color: 'gray',
              fontSize: '0.8rem',
              textAlign: 'center',
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px', // space between the texts and icon
                color: 'gray',
                width: '100%',
              }}
            >
              <img
                src={lockIcon}
                alt="Lock Icon"
                style={{ width: '18px', height: '18px' }}
              />
              <span>Leo can make mistakes.</span>
              <span>
                Work content and chats are private to your organization
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ChatMessageProps {
  prompt: Prompt;
  user?: User | null | undefined;
  isLoading?: boolean;
  isTypingComplete?: boolean;
  setIsTypingComplete?: (value: boolean) => void;
  showSources?: boolean;
  setShowSources?: (value: boolean) => void;
  handleButtonClick?: (text: string) => void;
  isLatestMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  prompt,
  //user,
  isLoading = false,
  setIsTypingComplete,
  showSources = false,
  setShowSources,
  handleButtonClick,
  isLatestMessage,
}) => {
  const [localTypingComplete, setLocalTypingComplete] = useState(false);

  return (
    <Box px={4} py={2} maxW="100%" overflowX="hidden">
      {/* USER MESSAGE */}
      <Flex justify="flex-end" mb={2}>
        <Box
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"
          px={4}
          py={2}
          maxW="75%"
          wordBreak="break-word"
          boxShadow="sm"
        >
          <Text fontSize="sm" whiteSpace="pre-wrap">
            {prompt.prompt}
          </Text>
        </Box>
      </Flex>

      {/* BOT MESSAGE */}
      <Flex justify="flex-start" mb={4}>
        <Box
          border="none"
          px={2}
          py={1}
          maxW="75%"
          wordBreak="break-word"
          whiteSpace="pre-wrap"
        >
          {isLoading ? (
            <Flex justify="flex-start">
              <Image
                src="/img/infinteLoop.svg"
                alt="Loading..."
                boxSize="40px"
              />
            </Flex>
          ) : (
            prompt.completion.split('\n').map((part, index) => (
              <Typewriter
                key={index}
                sentence={part.trim()}
                delay={700}
                index={index}
                length={prompt.completion.split('\n').length}
                sources={prompt.sources}
                onPartComplete={() => {
                  if (index === prompt.completion.split('\n').length - 1) {
                    setLocalTypingComplete(true);
                    if (setIsTypingComplete) {
                      setIsTypingComplete(true);
                    }
                  }
                }}
              />
            ))
          )}

          {/* SOURCES (if available) */}
          {prompt.sources &&
            localTypingComplete &&
            prompt.sources.length > 0 && (
              <SourcesSection
                prompt={prompt}
                showSources={showSources}
                setShowSources={setShowSources || (() => {})}
              />
            )}

          {/* SUGGESTED PROMPTS */}
          {prompt.suggestions &&
            prompt.suggestions.length > 0 &&
            localTypingComplete &&
            isLatestMessage && (
              <Wrap mt={4} spacing={2} justify="space-between" width="100%">
                {prompt.suggestions.slice(0, 3).map((suggestion, index) => (
                  <WrapItem key={index} minW="200px" maxW="100%">
                    <Button
                      bgGradient="linear(to-r, rgba(70, 101, 202, 0.8), rgba(3, 8, 78, 0.8))"
                      _hover={{
                        bgGradient:
                          'linear(to-r, rgba(169, 203, 247, 0.8), rgba(132, 192, 248, 0.8))',
                      }}
                      color="#f6f6fe"
                      borderRadius="xl"
                      fontSize="sm"
                      fontWeight="medium"
                      whiteSpace="normal"
                      wordBreak="break-word"
                      textAlign="left"
                      px={4}
                      py={4}
                      width="100%"
                      w="100%"
                      height="auto"
                      lineHeight="1.4"
                      boxShadow="md"
                      onClick={() => handleButtonClick?.(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  </WrapItem>
                ))}
              </Wrap>
            )}
        </Box>
      </Flex>
    </Box>
  );
};

interface SourcesSectionProps {
  prompt: Prompt;
  showSources?: boolean;
  setShowSources: (value: boolean) => void;
}

const SourcesSection: React.FC<SourcesSectionProps> = ({
  prompt,
  showSources,
  setShowSources,
}) => (
  <>
    <div className="grid-row">
      <div className="grid-col padding-top-3">
        <span
          className="padding-right-1"
          style={{ position: 'relative', top: '5px' }}
        >
          <Icon type="info" className="color-primary" id={''} />
        </span>
        <span>
          <Button
            id={`chat-content-sources-btn-${prompt}`}
            variant="unstyled"
            onClick={() => setShowSources(!showSources)}
            className="font-sans-3xs"
            style={{
              paddingTop: '9px',
            }}
          >
            {showSources ? 'Hide' : 'Show'} Source
          </Button>
        </span>
      </div>
    </div>
    {showSources && (
      <div>
        <h2>List of Sources:</h2>
        <ul>
          {prompt.sources.map((source, index) => (
            <li key={index}>
              <a href={source[1]} target="_blank" rel="noopener noreferrer">
                {index + 1}. {source[0]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </>
);

// interface SuggestionsButtonsProps {
//   suggestions: string[];
//   handleButtonClick: (text: string) => void;
// }

// const SuggestionsButtons: React.FC<SuggestionsButtonsProps> = ({
//   suggestions,
//   handleButtonClick,
// }) => (
//   <div
//     className="button-container-two"
//     style={{
//       margin: '.5rem',
//       justifyContent: 'center',
//     }}
//   >
//     {suggestions.slice(0, 3).map((suggestion, index) => (
//       <button
//         key={index}
//         className="helper-button-two"
//         style={{
//           whiteSpace: 'pre-wrap',
//           fontSize: '13px',
//         }}
//         onClick={() => handleButtonClick(suggestion)}
//       >
//         {suggestion}
//       </button>
//     ))}
//   </div>
// );
