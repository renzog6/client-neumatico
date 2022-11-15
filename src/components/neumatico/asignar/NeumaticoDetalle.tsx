import {
  Box,
  Button,
  Flex,
  StackDivider,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React from 'react'

import { useAsignarContext } from './asignar.context'
import AsignarNeumaticoModal from './AsignarNeumaticoModal'

const NeumaticoDetalle = () => {
  const { equipoSelect, posicion } = useAsignarContext()

  const {
    isOpen: isOpenAsignar,
    onOpen: onOpenAsignar,
    onClose: onCloseAsignar,
  } = useDisclosure()

  const handleClickAsignar = () => {
    // Open Modal AsignarNeumaticoModal
    onOpenAsignar()
  }

  if (posicion === '') {
    return <></>
  }

  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <Box h="40px" bg="gray.400">
          Equipo: {equipoSelect.patente}
        </Box>
        <Box h="40px" bg="tomato">
          Neumatico: {posicion} - Id:
        </Box>
        <Box>
          <Flex alignItems="center" gap="2">
            <Button
              w="110px"
              bg="blue.400"
              onClick={() => handleClickAsignar()}
            >
              Asignar
            </Button>
            <Button w="110px" bg="green.600">
              Remplazar
            </Button>
            <Button w="110px" bg="red.500">
              Mover
            </Button>
          </Flex>
          <AsignarNeumaticoModal
            isOpen={isOpenAsignar}
            onClose={onCloseAsignar}
            posicion={posicion}
          />
        </Box>
      </VStack>
    </>
  )
}

export default NeumaticoDetalle
