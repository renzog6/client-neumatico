import React, { useEffect, useState } from 'react'
import NextLink from 'next/link'

import { neumaticoService } from '../../services/neumatico.service'

import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Heading,
  Link,
  Spacer,
  TableContainer,
  Input,
  Button,
  ButtonGroup,
  StackDivider,
  VStack,
} from '@chakra-ui/react'

export default function ListAllNeumaticos() {
  const [searchTerm, setSearchTerm] = useState('')
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
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={3}
        align="center"
      >
        <Box w="80%" p={2} display="flex">
          <Box p="2">
            <Heading size="md">Listado de Neumaticos</Heading>
          </Box>
          <Spacer />
          <ButtonGroup gap="2">
            <NextLink href="/neumatico/create" passHref>
              <Button as="a" colorScheme="green">
                Agregar
              </Button>
            </NextLink>
          </ButtonGroup>
        </Box>

        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Input
              placeholder="Buscar..."
              size="md"
              onChange={(event) => {
                setSearchTerm(event.target.value)
              }}
            />
          </Box>
          <TableContainer>
            {neumaticos.length === 0 && <p>Cargando....</p>}
            <Table size="md" variant="striped" colorScheme="orange">
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Medida</Th>
                  <Th>Modelo</Th>
                  <Th>Marca</Th>
                  <Th>Uso</Th>
                  <Th>Estado</Th>
                  <Th>Deposito</Th>
                  <Th>Info</Th>
                  <Th>#</Th>
                </Tr>
              </Thead>
              <Tbody>
                {neumaticos.length > 0 &&
                  neumaticos
                    // eslint-disable-next-line array-callback-return
                    .filter((val) => {
                      if (searchTerm === '') {
                        return val
                      } else if (
                        val.medida.name
                          .toLowerCase()
                          .includes(searchTerm.toLocaleLowerCase())
                      ) {
                        return val
                      }
                    })
                    .map((n) => (
                      <Tr key={n.id}>
                        <Td>{n.name}</Td>
                        <Td>
                          <Link href={'/neumatico/' + n.id + '/update'}>
                            {n.medida.name}
                          </Link>
                        </Td>
                        <Td>{n.modelo}</Td>
                        <Td>{n.marca.name}</Td>
                        <Td>{n.uso}</Td>
                        <Td>{n.estado}</Td>
                        <Td>{n.deposito.name}</Td>
                        <Td>{n.info}</Td>
                        <Td>{'-'}</Td>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </>
  )
}
