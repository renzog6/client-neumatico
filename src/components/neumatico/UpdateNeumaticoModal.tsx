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
  const { title, price } = modalData || {}

  const handleModalClose = () => {
    setTimeout(() => {
      onClose()
    }, 1000)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Product Details</ModalHeader>
        <ModalBody>
          <Box w="full" h="full">
            <Flex w="full" h="300px" position="relative">
              IMAGEN
            </Flex>

            <Box pt="3">
              <Box mt="3" fontWeight="semibold" as="h4" lineHeight="tight">
                {title}
              </Box>
              ${price}
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="cyan.700"
            color="white"
            w="150px"
            size="lg"
            onClick={handleModalClose}
            _hover={{ bg: 'cyan.800' }}
          >
            Purchase
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
