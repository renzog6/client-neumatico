import { Button, Wrap, WrapItem, Center } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>SAE - Neumaticos</title>
      </Head>
      <Wrap spacing="30px" justify="center">
        <WrapItem>
          <Center w="200px" h="80px" bg="red.200">
            <Link href="/neumatico">Stock</Link>
          </Center>
        </WrapItem>
        <WrapItem>
          <Center w="200px" h="80px" bg="green.200">
            <Link href="/deposito">Depositos</Link>
          </Center>
        </WrapItem>
        <WrapItem>
          <Center w="200px" h="80px" bg="tomato">
            <Link href="/medida">Medidas</Link>
          </Center>
        </WrapItem>
        <WrapItem>
          <Center w="200px" h="80px" bg="blue.200">
            Box 4
          </Center>
        </WrapItem>
        <WrapItem>
          <Center w="200px" h="80px" bg="blackAlpha.500">
            Box 5
          </Center>
        </WrapItem>
      </Wrap>
    </>
  )
}
