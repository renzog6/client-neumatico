import React from 'react'
import Header from './Header'

import { Box, Container, VStack } from '@chakra-ui/react'

export default function Layout({ children }) {
  return (
    <VStack w={'full'} h={'100vh'}>
      <Container maxW="95%" bg="green.300">
        <Header />
      </Container>
      <Box w="95%" h="95vh" bg="red.800" overflowY="scroll">
        {children}
      </Box>
    </VStack>
  )
}
