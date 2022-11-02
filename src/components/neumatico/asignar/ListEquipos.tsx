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
  Radio,
} from '@chakra-ui/react'

import { equipoService } from 'services/equipo.service'
import { TipoEquipo as tipo } from 'interfaces/Equipo'

import { useAsignarContext } from './asignar.context'

export default function ListEquipos() {
  const [searchTerm, setSearchTerm] = useState('')
  const [neumaticos, setNeumaticos] = useState([])

  const { equipoSelect, setEquipo } = useAsignarContext()

  const changeEstado = async (e) => {
    const res = await equipoService.getAll(e.target.value)
    setNeumaticos(res)
  }

  useEffect(() => {
    const getStock = async () => {
      const res = await equipoService.getAll('Camion')
      setNeumaticos(res)
    }
    getStock()
  }, [])

  const handleClick = (data) => {
    setEquipo(data.target.value)
    console.log({ equipoSelect })
  }

  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={3}
        align="center"
      >
        <Box w="100%" borderWidth="1px" borderRadius="lg">
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
              defaultValue={tipo.Camion}
              onChange={changeEstado}
              required
            >
              <option value={tipo.Camion} disabled>
                {tipo.Camion}
              </option>
              {Object.values(tipo).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Select>
          </Box>
          <TableContainer>
            {neumaticos.length === 0 && <p>Cargando....</p>}
            <Table size="sm" variant="simple" colorScheme="yellow">
              <Thead>
                <Tr>
                  <Th>Patente</Th>
                  <Th>Nombre</Th>
                  <Th>Tipo</Th>
                </Tr>
              </Thead>
              <Tbody>
                {neumaticos
                  // eslint-disable-next-line array-callback-return
                  .filter((val) => {
                    if (searchTerm === '') {
                      return val
                    } else if (
                      val.patente
                        .toLowerCase()
                        .includes(searchTerm.toLocaleLowerCase())
                    ) {
                      return val
                    }
                  })
                  .map((n) => (
                    <Tr
                      key={n.id + n.patente}
                      _hover={{
                        bg: 'teal.400',
                        color: 'white',
                        borderColor: 'teal.600',
                      }}
                      bg={n.patente === equipoSelect.patente ? 'red.600' : ''}
                    >
                      <Td>
                        <Radio
                          onChange={handleClick}
                          // value={[n.patente, n.tipo]}
                          value={JSON.stringify(n)}
                          isChecked={n.patente === equipoSelect.patente}
                          _checked={{
                            bg: 'red.400',
                            borderColor: 'red.600',
                          }}
                        >
                          {n.patente}
                        </Radio>
                      </Td>
                      <Td>{n.name}</Td>
                      <Td>{n.tipo}</Td>
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
