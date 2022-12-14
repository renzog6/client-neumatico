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
  Spacer,
  ButtonGroup,
  Flex,
  StackDivider,
  VStack,
  Input,
  TableContainer,
  Button,
  Select,
  Tfoot,
} from '@chakra-ui/react'

import { Estado as tipoEstado } from 'interfaces/TiposEnum'

export default function StockNeumaticos() {
  const [searchTerm, setSearchTerm] = useState('')
  const [neumaticos, setNeumaticos] = useState([])

  const changeEstado = async (e) => {
    console.log(e.target.value)
    const res = await neumaticoService.getStock(e.target.value)
    setNeumaticos(res)
  }

  useEffect(() => {
    const getStock = async () => {
      const res = await neumaticoService.getStock('Nuevo')
      setNeumaticos(res)
    }
    getStock()
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
              <Heading size="md">Stock de Neumaticos</Heading>
            </Box>
            <Spacer />
            <ButtonGroup gap="2">
              <NextLink href="/neumatico/create" passHref>
                <Button as="a" colorScheme="green">
                  Agregar
                </Button>
              </NextLink>
            </ButtonGroup>
          </Flex>
        </Box>

        <Box w="80%" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            display="flex"
          >
            <Input
              placeholder="Buscar..."
              size="md"
              onChange={(event) => {
                setSearchTerm(event.target.value)
              }}
            />

            <Select
              w="180px"
              id="estado"
              defaultValue={tipoEstado.Nuevo}
              onChange={changeEstado}
              required
            >
              <option value={tipoEstado.Nuevo} disabled>
                {tipoEstado.Nuevo}
              </option>
              <option value="Todo">Todos</option>
              {Object.values(tipoEstado).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Select>
          </Box>
          <TableContainer>
            {neumaticos.length === 0 && <p>Cargando....</p>}
            <Table size="md" variant="striped" colorScheme="yellow">
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Para</Th>
                  <Th>Medida</Th>
                  <Th>Uso</Th>
                  <Th>Stock</Th>
                  <Th>X</Th>
                </Tr>
              </Thead>
              <Tbody>
                {neumaticos
                  // eslint-disable-next-line array-callback-return
                  .filter((val) => {
                    if (searchTerm === '') {
                      return val
                    } else if (
                      val.medida
                        .toLowerCase()
                        .includes(searchTerm.toLocaleLowerCase())
                    ) {
                      return val
                    }
                  })
                  .map((n) => (
                    <Tr key={n.id + n.uso}>
                      <Td>{n.id}</Td>
                      <Td>{n.info}</Td>
                      <Td>{n.medida}</Td>
                      <Td>{n.uso}</Td>
                      <Td>{n.stock}</Td>
                      <Td>{'-'}</Td>
                    </Tr>
                  ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th>Total:</Th>
                  <Th>
                    {neumaticos
                      .map((item) => item.stock)
                      .reduce((prev, curr) => prev + curr, 0)}
                  </Th>
                  <Th></Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </>
  )
}
