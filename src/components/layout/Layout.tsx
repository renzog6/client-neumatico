import React from 'react'
import Header from './Header'

import { Container, VStack } from '@chakra-ui/react'

export default function Layout({ children }) {
  return (
    <VStack>
      <Container maxW="95%" bg="green.100" color="#262626">
        <Header />
      </Container>
      <Container h="95vh" maxW="95%" bg="gray.800">
        {children}
      </Container>
    </VStack>
  )
}
