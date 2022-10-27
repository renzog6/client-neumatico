import { Wrap, WrapItem, Center } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>SAE - Neumaticos</title>
      </Head>
      <Wrap p={5} spacing={10} justify="center">
        <WrapItem>
          <Center w="200px" h="80px" bg="blue.200">
            <Link href="/neumatico">Listado</Link>
          </Center>
        </WrapItem>
        <WrapItem>
          <Center w="200px" h="80px" bg="red.200">
            <Link href="/neumatico/stock">Stock</Link>
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
          <Center w="200px" h="80px" bg="yellow.500">
            <Link href="/neumatico/asignar">Asignar Neumatico</Link>
          </Center>
        </WrapItem>
      </Wrap>
    </>
  )
}
