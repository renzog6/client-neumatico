import React from 'react'
import Header from './Header'

import { Grid, GridItem } from '@chakra-ui/react'

export default function Layout({ children }) {
  return (
    <Grid>
      <GridItem w="100%" bg="orange.300">
        <Header />
      </GridItem>

      <GridItem w="100%">{children}</GridItem>
      <GridItem w="100%" bg="blue.300">
        <footer>Powered by @renzog6</footer>
      </GridItem>
    </Grid>
  )
}
