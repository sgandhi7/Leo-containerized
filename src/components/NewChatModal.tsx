import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { v4 as uuid } from 'uuid';

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const NewChatModal: React.FC<NewChatModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = () => {
    sessionStorage.setItem('session_id', uuid());
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="20px" p={2} w="80%" maxW="530px">
        <ModalHeader fontWeight="600" fontSize="22px" pb={3} pt={4}>
          New chat session?
        </ModalHeader>
        <ModalBody pb={2} pt={1}>
          <Text
            fontSize="17px"
            fontWeight="400"
            color="#000000"
            lineHeight="26px"
          >
            Are you sure you want to start a new chat? This will clear the
            previous chats.
          </Text>
        </ModalBody>
        <ModalFooter pt={2} pb={4}>
          <Flex w="100%" justify="flex-end" gap={4}>
            <Button
              variant="link"
              fontSize="18px"
              fontWeight="600"
              color="#4C5EEB"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              bg="#44F8B4"
              color="#000000"
              borderRadius="full"
              px={6}
              ml={4}
              h="49px"
              fontWeight="600"
              fontSize="18px"
              _hover={{ bg: '#00defa' }}
              onClick={handleConfirm}
            >
              New chat
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewChatModal;
