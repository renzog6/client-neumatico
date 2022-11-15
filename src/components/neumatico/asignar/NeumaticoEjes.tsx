import React from 'react'
import {
  useRadioGroup,
  GridItem,
  SimpleGrid,
  Center,
  Text,
  Box,
  Flex,
  StackDivider,
  VStack,
} from '@chakra-ui/react'
import RadioCard from './NeumaticoRadioCard'

import { useAsignarContext } from './asignar.context'

const NeumaticoEjes = () => {
  const { instalados, ejes, setPosicion } = useAsignarContext()

  const handleClick = (data) => {
    setPosicion(data)
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: '',
    onChange: handleClick,
  })

  const group = getRootProps()

  return (
    <>
      <Flex h="550px">
        <Box>
          <SimpleGrid w="350px" columns={8} columnGap={1} rowGap={6} {...group}>
            {ejes.map((value, index) => {
              const radio = getRadioProps({ value })

              if (value === 'Y') {
                return <GridItem key={value + index} h="25px" colSpan={8} />
              }
              if (value === 'E') {
                return (
                  <GridItem key={value + index} h="20px" colSpan={1}>
                    <Center h="100px">
                      <Text>===</Text>
                    </Center>
                  </GridItem>
                )
              }
              if (value === 'X') {
                return <GridItem key={value + index} h="15px" colSpan={1} />
              } else {
                return (
                  <GridItem key={value} h="20px" colSpan={1}>
                    <RadioCard key={value} {...radio}>
                      {value}
                    </RadioCard>
                  </GridItem>
                )
              }
            })}
          </SimpleGrid>
        </Box>
        <Box flex="1" h="550px" w="150px">
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={1}
            align="stretch"
          >
            {instalados.map((n) => (
              <Box h="20px" w="150px" key={n.id}>
                {n.posicion + ' - ' + n.neumatico.name}
              </Box>
            ))}
          </VStack>
        </Box>
      </Flex>
    </>
  )
}

export default NeumaticoEjes
