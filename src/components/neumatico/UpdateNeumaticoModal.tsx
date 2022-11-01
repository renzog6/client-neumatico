import React from 'react'

import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

export default function UpdateNeumaticoModal({ isOpen, onClose, modalData }) {
  const { name, uso, medida } = modalData || {}

  const handleModalClose = () => {
    setTimeout(() => {
      onClose()
    }, 1000)
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Neumatico: {modalData ? medida.name : ''}</ModalHeader>
        <ModalBody>
          <Box w="full" h="full">
            <Flex w="full" h="300px" position="relative">
              {name}
            </Flex>

            <Box pt="3">
              <Box mt="3" fontWeight="semibold" as="h4" lineHeight="tight">
                {uso}
              </Box>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleModalClose} colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose} colorScheme="red" mr={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
