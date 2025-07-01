import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const faqs = [
  {
    question: 'What is Leo?',
    answer:
      'Leo is an AI-powered tool designed to analyze resumes and discover top talent.',
  },
  {
    question: 'Why use Leo?',
    answer:
      'To save time by utilizing various data sources such as SharePoint Repo and Greenhouse for job requisitions.',
  },
  {
    question: 'How does Leo work?',
    answer:
      'Leo matches resumes with internal roles using systems like Greenhouse and SharePoint.',
  },
  {
    question: 'Who can use Leo?',
    answer:
      'Leo is designed for talent acquisition teams to streamline resume analysis and role matching.',
  },
];

export const Faqs: React.FC = () => {
  return (
    <Flex
      direction="column"
      height="100vh"
      overflowY="auto"
      overflowX="hidden"
      align="center"
      bg="#f6f6fe"
      pl={{ base: '0px', md: '60px' }}
    >
      <Container
        maxW="7xl"
        py={{ base: 10, md: 16 }}
        px={{ base: 4, md: 8 }}
        pl={{ base: '80px', md: '15' }}
      >
        <Heading
          fontSize="52px !important"
          fontWeight="700 !important"
          textAlign="center"
          mb={{ base: 12, md: 30 }}
        >
          Frequently{' '}
          <Box as="span" color="#00A3E0">
            Asked
          </Box>{' '}
          Questions
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
          {faqs.map(({ question, answer }) => (
            <Box
              key={question}
              bg="white"
              borderRadius="xl"
              boxShadow="md"
              p={8}
              transition="transform 0.2s"
            >
              <Heading as="h2" size="md" color="#00A3E0" mb={4}>
                {question}
              </Heading>
              <Text fontSize="md" color="#333">
                {answer}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Flex>
  );
};
