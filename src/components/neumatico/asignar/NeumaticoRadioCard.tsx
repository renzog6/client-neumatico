import { Box, useRadio } from '@chakra-ui/react'

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        minW="35px"
        maxW="35px"
        minH="90px"
        maxH="90px"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'teal.400',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        _hover={{
          bg: 'teal.400',
          color: 'white',
          borderColor: 'teal.600',
        }}
        px={3}
        py={3}
        m={2}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default RadioCard
