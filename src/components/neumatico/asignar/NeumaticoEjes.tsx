import React from 'react'
import {
  useRadioGroup,
  GridItem,
  SimpleGrid,
  Center,
  Text,
} from '@chakra-ui/react'
import RadioCard from './NeumaticoRadioCard'

import { useAsignarContext } from './asignar.context'

const NeumaticoEjes = () => {
  const { ejes, setPosicion } = useAsignarContext()

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: '',
    onChange: setPosicion,
  })

  const group = getRootProps()

  return (
    <>
      <SimpleGrid
        w="100%"
        maxW="350px"
        columns={8}
        columnGap={1}
        rowGap={6}
        {...group}
      >
        {ejes.map((value, index) => {
          const radio = getRadioProps({ value })

          if (value === 'Y') {
            return <GridItem key={value + index} h="20px" colSpan={8} />
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
            return (
              <GridItem key={value + index} h="20px" colSpan={1}>
                x
              </GridItem>
            )
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
    </>
  )
}

export default NeumaticoEjes
