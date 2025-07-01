import { Search } from '@/pages/chat';
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import {
  Investigation as InvestigationState,
  Session,
} from '@src/types/investigation';
import { User } from '@src/types/user';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  currentUserState,
  currentInvestigation as defaultInvestigation,
  sessionId,
  sessions,
} from '../store';
import { getApiBaseUrl } from '../utils/env';

export const Dashboard = (): React.ReactElement => {
  const [, setCurrentInvestigation] =
    useRecoilState<InvestigationState>(defaultInvestigation);
  const [searchInput, setSearchInput] = useState<string>('');
  const [user] = useRecoilState<User | null | undefined>(currentUserState);
  const [sessionsValue, setSessions] = useRecoilState<Session[] | undefined>(
    sessions,
  );
  const [, setSessionId] = useRecoilState<string | undefined>(sessionId);
  const handleButtonClick = (buttonText: string) => {
    setSearchInput(buttonText);
  };

  useEffect(() => {
    setCurrentInvestigation({});
    setSessionId(undefined);
    const fetchSessions = async () => {
      console.log('Fetching sessions');
      const temp = [];
      const response = await fetch(`${getApiBaseUrl()}/fetchSessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user?.emailAddress,
          action: 'pull',
        }),
      });
      const tempSessions = await response.json();
      console.log('Sessions: ', tempSessions);
      for (const session of tempSessions) {
        const tempNewSess = JSON.parse(session);
        const newSess = {
          sessionId: tempNewSess.Name,
          prompts: tempNewSess.Content.prompts,
          chatHistory: tempNewSess.Content.chatHistory,
        };
        temp.push(newSess);
      }
      console.log('Temp: ', temp);
      setSessions(temp);
    };
    if (sessionsValue === undefined) {
      fetchSessions();
    } else {
      console.log('Sessions already fetched: ', sessions);
    }
  }, [
    sessionsValue,
    setCurrentInvestigation,
    setSessionId,
    setSessions,
    user?.emailAddress,
  ]);

  const prompts = [
    'List employees that have experience with Drupal and PHP',
    'List employees that best fit job posting SharePoint Developer 5361',
    'What job postings best fit Jorge Vasquez',
    'List employees that have experience with React and Node.js',
    'What job postings best fit Preetham Ramesh',
  ];

  return (
    <Flex
      direction="column"
      px={6}
      pt={24}
      bg="#f6f6fe"
      minH="100vh"
      align="center"
      overflowY="auto"
      overflowX="hidden"
    >
      <Box
        maxW="1120px"
        w="full"
        ml={{ base: '64px', md: '140px' }}
        mr={{ base: '64px', md: '65px' }}
        //px={{ base: 4, md: 8 }}
      >
        <VStack align="flex-start" spacing="8" w="full">
          <Text fontSize="52px" fontWeight="700" color="#081049">
            Let&apos;s Discover Top Talent
          </Text>

          <Text fontSize="16px" color="#081049" fontWeight="400" maxW="800px">
            At MetroStar, we’re serious about connecting the right talent with
            the right opportunities. LEO helps you explore teams and positions
            aligned with your experience, goals, and mission (because great work
            starts with great people).
          </Text>

          <VStack align="flex-start" spacing="4" w="full">
            <Text fontWeight="600" fontSize="16px" color="#081049" mb={2}>
              Get started with a sample prompt
            </Text>
            <Wrap spacing={6} mb={7} justify="flex-start">
              {prompts.map((prompt) => (
                <WrapItem key={prompt}>
                  <Button
                    borderRadius="28px"
                    //padding="px"
                    bgSize="200% 100%"
                    color="#f6f6fe"
                    bgPos="left bottom"
                    bgGradient="linear(to-r, rgba(70, 101, 202, 0.8), rgba(3, 8, 78, 0.8))"
                    _hover={{
                      bgGradient:
                        'linear(to-r, rgba(169, 203, 247, 0.8), rgba(132, 192, 248, 0.8))',
                    }}
                    px={4}
                    py={7}
                    fontSize="16px"
                    fontWeight="600"
                    textAlign="left"
                    onClick={() => handleButtonClick(prompt)}
                    whiteSpace="normal"
                    maxW="350px"
                    lineHeight="1.4"
                    boxShadow="md"
                  >
                    {prompt}
                  </Button>
                </WrapItem>
              ))}
            </Wrap>
          </VStack>
        </VStack>

        <Box mt={12} w="100%">
          <Search searchInput={searchInput} setSearchInput={setSearchInput} />
        </Box>
      </Box>
    </Flex>
  );
};
