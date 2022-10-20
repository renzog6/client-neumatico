import React, { useEffect, useState } from 'react'

import { medidaService } from 'services/medida.service'

import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Heading,
  Spacer,
  StackDivider,
  VStack,
  Button,
  ButtonGroup,
  Flex,
} from '@chakra-ui/react'
import { FaEdit } from 'react-icons/fa'

export default function ListMedidas() {
  const [neumaticos, setNeumaticos] = useState([])

  useEffect(() => {
    const getAllNeumaticos = async () => {
      const res = await medidaService.getAll()

      setNeumaticos(res)
    }
    getAllNeumaticos()
  }, [])

  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={3}
        align="center"
      >
        <Box w="80%" h="40px" p={2}>
          <Flex minWidth="max-content" alignItems="center" gap="2">
            <Box p="2">
              <Heading size="md">Medidas de Neumaticos</Heading>
            </Box>
            <Spacer />
            <ButtonGroup gap="2">
              <Button colorScheme="teal">Agregar</Button>
            </ButtonGroup>
          </Flex>
        </Box>
        <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden">
          {neumaticos.length === 0 && <p>Cargando....</p>}
          <Table size="md" variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Medida</Th>
                <Th>Alt</Th>
                <Th>Info</Th>
                <Th>X</Th>
              </Tr>
            </Thead>
            <Tbody>
              {neumaticos.length > 0 &&
                neumaticos.map((n) => (
                  <Tr key={n.id}>
                    <Td>{n.id}</Td>
                    <Td>{n.name}</Td>
                    <Td>{n.alt}</Td>
                    <Td>{n.info}</Td>
                    <Td>
                      <FaEdit />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </>
  )
}
