/* eslint-disable react/prop-types */
import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Textarea,
  VStack,
} from '@chakra-ui/react';

interface TextAreaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyUp: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  onCancel: () => void;
  onNewChat: () => void;
  showNewChat: boolean;
  isLoading: boolean;
  disabled?: boolean;
}

export const TextAreaInput: React.FC<TextAreaProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //id,
  value,
  onChange,
  onKeyDown,
  onKeyUp,
  onSend,
  onCancel,
  onNewChat,
  showNewChat,
  isLoading,
  disabled = false,
}) => {
  //const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box w="100%" maxW="container.xl" mx="auto" px={4}>
      {showNewChat && (
        <Flex justify="flex-end" mb={2}>
          <Button
            leftIcon={<AddIcon />}
            bg="blue.800"
            color="white"
            borderRadius="full"
            fontWeight="500"
            h="32px"
            fontSize="14px"
            _hover={{ bg: 'blue.300' }}
            onClick={onNewChat}
          >
            New Chat
          </Button>
        </Flex>
      )}

      <Flex justifyContent="center" alignItems="center" w="100%" mx="auto">
        <Box
          borderRadius="32px"
          border="1px solid #E8E8E8"
          bg="white"
          p={3}
          height="110px"
          maxW="900px"
          w="100%"
        >
          <VStack align="flex-start" spacing={3} w="100%">
            <Textarea
              value={value}
              onChange={onChange}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              placeholder="Ask me anything or type / to add people, files, and more"
              resize="none"
              border="none"
              px={4}
              py={3}
              bg="transparent"
              height="20px"
              w="100%"
              minW={0}
              overflow="hidden"
            />

            {/* ✅ Send or Cancel row */}
            <HStack w="100%" justify="flex-end" mt={-50}>
              {isLoading ? (
                <Button
                  onClick={onCancel}
                  borderRadius="full"
                  h="36px"
                  fontSize="14px"
                >
                  Cancel
                </Button>
              ) : (
                <IconButton
                  aria-label="Send"
                  onClick={onSend}
                  borderRadius="full"
                  bg="blue.600"
                  size="md"
                  _hover={{ bg: 'blue.200' }}
                  icon={
                    <img
                      src="/img/sendbutton.png"
                      alt="Send"
                      style={{
                        width: '22px',
                        height: '22px',
                        objectFit: 'contain',
                        color: 'white',
                      }}
                    />
                  }
                  isDisabled={disabled || !value.trim()}
                  //ml="auto"
                />
              )}
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default TextAreaInput;
