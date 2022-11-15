import React, { useEffect, useState } from 'react'

import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  StackDivider,
  VStack,
  Input,
  TableContainer,
  Select,
  Button,
} from '@chakra-ui/react'

import { Estado as tipoEstado } from 'interfaces/TiposEnum'
import { FaCheck } from 'react-icons/fa'
import { neumaticoService } from 'services/neumatico.service'
import { useAsignarContext } from './asignar.context'

export default function ListNeumaticosToAsignar() {
  const { neumatico, setNeumatico } = useAsignarContext()

  const [searchTerm, setSearchTerm] = useState('')
  const [neumaticos, setNeumaticos] = useState([])

  const changeEstado = async (e) => {
    console.log(e.target.value)
    const res = await neumaticoService.getByDepositoAndMedida(1, 1)
    setNeumaticos(res)
  }

  const selectedNeumatico = (data) => {
    setNeumatico(data)
  }

  useEffect(() => {
    const getNeumaticos = async () => {
      const res = await neumaticoService.getByDepositoAndMedida(1, 1)
      setNeumaticos(res)
    }
    getNeumaticos()
  }, [])

  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={3}
        align="center"
        w="full"
      >
        <Box w="full" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            display="flex"
          >
            <Input
              placeholder="Buscar..."
              size="sm"
              onChange={(event) => {
                setSearchTerm(event.target.value)
              }}
            />

            <Select
              w="180px"
              id="estado"
              size="sm"
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
          <TableContainer w="100%" maxH="220" overflowY="scroll">
            {neumaticos.length === 0 && <p>Cargando....</p>}
            <Table maxH="200" size="sm" variant="simple" colorScheme="yellow">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Medida</Th>
                  <Th>Uso</Th>
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
                      val.name
                        .toLowerCase()
                        .includes(searchTerm.toLocaleLowerCase())
                    ) {
                      return val
                    }
                  })
                  .map((n) => (
                    <Tr
                      key={n.id + n.uso}
                      _hover={{
                        bg: 'teal.400',
                        color: 'white',
                        borderColor: 'teal.600',
                      }}
                      bg={n.id === neumatico.id ? 'red.600' : ''}
                    >
                      <Td>{n.name}</Td>
                      <Td>{n.medida.name}</Td>
                      <Td>{n.uso}</Td>
                      <Td>
                        <Button size="sm" onClick={() => selectedNeumatico(n)}>
                          <FaCheck />
                        </Button>
                      </Td>
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
