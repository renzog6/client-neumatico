import React, { useEffect, useState } from 'react'
import { movimientoService } from '../../services/movimiento.service'
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
} from '@chakra-ui/react'

export default function ListAllMovimientos() {
  const [movimientos, setNeumaticos] = useState([])

  useEffect(() => {
    const getAllNeumaticos = async () => {
      const res = await movimientoService.getAll()
      setNeumaticos(res)
    }
    getAllNeumaticos()
  }, [])

  function formatDate(data) {
    const date = new Date(data)
    const d = date.toLocaleDateString('es-AR', {
      day: '2-digit', // possible values: 'numeric', '2-digit'
      month: '2-digit', // possible values: 'numeric', '2-digit', 'long', 'short', 'narrow'
      year: '2-digit', // possible values: 'numeric', '2-digit'
    })
    return d
  }

  return (
    <Box>
      {movimientos.length === 0 && <p>Cargando....</p>}

      <TableContainer>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Fecha</Th>
              <Th>Tipo</Th>
              <Th>Nuematico</Th>
              <Th>Cantidad</Th>
              <Th>Info</Th>
            </Tr>
          </Thead>
          <Tbody>
            {movimientos.length > 0 &&
              movimientos.map((n) => (
                <Tr key={n.id}>
                  <Td>{formatDate(n.fecha)}</Td>
                  <Td>{n.tipo}</Td>
                  <Td>{n.neumatico}</Td>
                  <Td>{n.cantidad}</Td>
                  <Td>{n.info}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
