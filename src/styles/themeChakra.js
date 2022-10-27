// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'
import { ButtonStyles as Button } from './ButtonStyles'

// 2. Add your color mode config
const customeTheme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  colors: {
    primary: '#38B2AC',
    brand: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#F7FAFC',
    },
  },

  components: {
    Button,
  },
  fonts: {},
  fontSizes: {},
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
  },
})

const theme = extendTheme({ customeTheme })

export default theme
