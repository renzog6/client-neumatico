import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import { neumaticoService } from '../../services/neumatico.service'

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

export default function ListAllNeumaticos() {
  const [neumaticos, setNeumaticos] = useState([])

  useEffect(() => {
    const getAllNeumaticos = async () => {
      const res = await neumaticoService.getAll()

      setNeumaticos(res)
    }
    getAllNeumaticos()
  }, [])

  return (
    <>
      <Head>
        <title>SAE - Neumaticos Stock</title>
      </Head>
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
                <Th>Equipo</Th>
                <Th>Medida</Th>
                <Th>Modelo</Th>
                <Th>Marca</Th>
                <Th>Stock</Th>
                <Th>Posicion</Th>
                <Th>Info</Th>
              </Tr>
            </Thead>
            <Tbody>
              {neumaticos.length > 0 &&
                neumaticos.map((n) => (
                  <Tr key={n.id}>
                    <Td>{n.equipo}</Td>
                    <Td>
                      <Link href={'/neumatico/' + n.id + '/update'}>
                        {n.medida}
                      </Link>
                    </Td>
                    <Td>{n.modelo}</Td>
                    <Td>{n.marca.name}</Td>
                    <Td>
                      {n.stock}
                      <Link href={'/neumatico/' + n.id + '/stock'}>
                        <a>
                          <FaArrowsAltV />
                        </a>
                      </Link>
                    </Td>
                    <Td>{n.posicion}</Td>
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
