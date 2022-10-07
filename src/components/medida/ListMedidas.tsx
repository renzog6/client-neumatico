import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { medidaService } from 'services/medida.service'

import { FaArrowsAltV } from 'react-icons/fa'
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
  SimpleGrid,
} from '@chakra-ui/react'

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
      <SimpleGrid columns={1} spacing={1}>
        <Box height="40px">
          <Heading as="h3" size="md" p={5}>
            Stock de Neumaticos
          </Heading>
        </Box>
        <Spacer />
        <Box>
          {neumaticos.length === 0 && <p>Cargando....</p>}
          <Table>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Medida</Th>
                <Th>Alt</Th>
                <Th>Info</Th>
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
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      </SimpleGrid>
    </>
  )
}
