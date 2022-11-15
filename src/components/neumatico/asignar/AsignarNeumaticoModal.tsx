import React from 'react'

import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import ListNeumaticosToAsignar from './ListNeumaticosToAsignar'
import { useAsignarContext } from './asignar.context'
import { Instalado } from 'interfaces/Instalado'
import { instaladoService } from 'services/instalado.service'

export default function AsignarNeumaticoModal({ isOpen, onClose, posicion }) {
  const { equipoSelect, neumatico, setNeumatico } = useAsignarContext()

  const handleModalClose = async () => {
    try {
      const instalado: Instalado = {
        id: 0,
        fecha: new Date(),
        equipo: equipoSelect,
        neumatico,
        posicion,
        info: '',
      }

      const response = await instaladoService.create(instalado)
      if (response.status === 400) {
        console.log(response.error)
      } else {
        onCloseHandler()
      }
    } catch (error) {
      console.log(error)
    }
    setTimeout(() => {
      onCloseHandler()
    }, 1000)
  }

  const onCloseHandler = () => {
    setNeumatico('')
    onClose()
  }
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Asignar Neumatico a la posicion: {posicion}</ModalHeader>
        <ModalBody>
          <Box w="full" h="full">
            <Flex w="full" h="300px" position="relative">
              <ListNeumaticosToAsignar />
            </Flex>

            <Box pt="3">
              <Box mt="3" fontWeight="semibold" as="h4" lineHeight="tight">
                uso
              </Box>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            w="100px"
            isDisabled={neumatico === ''}
            onClick={handleModalClose}
            bg="green.400"
            mr={3}
          >
            Asignar
          </Button>
          <Button w="100px" onClick={onCloseHandler} bg="red.400" mr={3}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
