import React from 'react'
import Head from 'next/head'

import ListEquipos from 'components/neumatico/asignar/ListEquipos'
import NeumaticoEjes from 'components/neumatico/asignar/NeumaticoEjes'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import { AsignarProvider } from '../../../components/neumatico/asignar/asignar.context'
import NeumaticoDetalle from 'components/neumatico/asignar/NeumaticoDetalle'

export default function AsignacionNeumatico() {
  return (
    <>
      <Head>
        <title>SAE - Asignar Neumaticos</title>
      </Head>
      <AsignarProvider>
        <Box>
          <Grid
            h="90vh"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={5}
            alignContent="center"
          >
            <GridItem w="350px" rowSpan={2} colSpan={1} p={2} bg="gray.700">
              <ListEquipos />
            </GridItem>
            <GridItem w="350px" h="550px" colSpan={2} bg="gray.500">
              <NeumaticoEjes />
            </GridItem>
            <GridItem w="100%" minW="350px" colSpan={2} bg="gray.700">
              <NeumaticoDetalle />
            </GridItem>
            {/* <GridItem w="100%" colSpan={4} p={1}>
              <ListNeumaticosToAsignar />
            </GridItem> */}
          </Grid>
        </Box>
      </AsignarProvider>
    </>
  )
}
