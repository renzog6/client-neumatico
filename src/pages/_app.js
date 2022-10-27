import App from 'next/app'
import Layout from 'components/layout/Layout'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'styles/themeChakra'

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

MyApp.getInitialProps = async (appContext) => {
  const pageProps = await App.getInitialProps(appContext)
  // const auth = await getUser(appContext.ctx)
  // return { ...appProps, auth: auth }
  return { ...pageProps }
}

export default MyApp
