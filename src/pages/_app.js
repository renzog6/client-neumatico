import Layout from 'components/layout/Layout'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ChakraProvider } from '@chakra-ui/react'
import theme from 'styles/themeChakra'

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer position="bottom-center" />
      </ChakraProvider>
    </>
  )
}

export default MyApp
