import React, { useEffect, useState } from 'react'
import NextLink from 'next/link'
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
  Select,
  useDisclosure,
} from '@chakra-ui/react'
import { FaEdit } from 'react-icons/fa'

import { neumaticoService } from '../../services/neumatico.service'
import { Estado as tipoEstado } from 'interfaces/TiposEnum'
import UpdateNeumaticoModal from './UpdateNeumaticoModal'

export default function ListAllNeumaticos() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchTerm, setSearchTerm] = useState('')
  const [neumaticos, setNeumaticos] = useState([])
  const [modalData, setModalData] = useState('')

  const handleClik = (data) => {
    console.log(data)
    setModalData(data)
    onOpen()
  }

  const changeEstado = async (e) => {
    console.log(e.target.value)
    const estado = e.target.value
    if (estado === 'Todos') {
      const res = await neumaticoService.getAll()
      setNeumaticos(res)
    } else {
      const res = await neumaticoService.getAll(estado)
      setNeumaticos(res)
    }
  }

  useEffect(() => {
    const getAllNeumaticos = async () => {
      const res = await neumaticoService.getAll('Nuevo')
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
        <Box w="100%" p={2} display="flex">
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

        <Box w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
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
              <option value="Todos">Todos</option>
              {Object.values(tipoEstado).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Select>
          </Box>
          <TableContainer>
            {neumaticos.length === 0 && <p>Cargando....</p>}
            <Table size="sm" variant="striped" colorScheme="orange">
              <Thead>
                <Tr>
                  <Th>Serie</Th>
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
                        <Td>
                          <Button
                            bg="facebook"
                            size="sm"
                            onClick={() => handleClik(n)}
                          >
                            <FaEdit />
                          </Button>
                        </Td>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
          </TableContainer>
          <UpdateNeumaticoModal
            isOpen={isOpen}
            onClose={onClose}
            modalData={modalData}
          />
        </Box>
      </VStack>
    </>
  )
}
