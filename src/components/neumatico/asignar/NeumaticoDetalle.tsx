import { Box } from '@chakra-ui/react'
import React from 'react'

import { useAsignarContext } from './asignar.context'

const NeumaticoDetalle = () => {
  const { equipoSelect, posicion } = useAsignarContext()
  return (
    <>
      <Box>{posicion}</Box>
      <div>{JSON.stringify(equipoSelect)}</div>
    </>
  )
}

export default NeumaticoDetalle
