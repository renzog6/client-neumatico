import React from 'react'
import NextLink from 'next/link'
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Spacer,
  Stack,
  useColorMode,
} from '@chakra-ui/react'

export default function Header() {
  const { toggleColorMode } = useColorMode()

  return (
    <>
      <Flex>
        <Box p="4">
          <Heading as="h3" size="md">
            Neumaticos
          </Heading>
        </Box>
        <Spacer />
        <Box p="4">
          <Stack direction="row" spacing={4}>
            <NextLink href="/" passHref>
              <Link>Home</Link>
            </NextLink>

            <NextLink href="/neumatico" passHref>
              <Link>Listado</Link>
            </NextLink>

            <NextLink href="/neumatico/stock" passHref>
              <Link>Stock</Link>
            </NextLink>

            <NextLink href="/neumatico/movimiento" passHref>
              <Link>Movimientos</Link>
            </NextLink>

            <NextLink href="/neumatico/seguimiento" passHref>
              <Link>Seguimiento</Link>
            </NextLink>

            <Button size="sm" colorScheme="blue" onClick={toggleColorMode}>
              Color
            </Button>
          </Stack>
        </Box>
      </Flex>
    </>
  )
}
