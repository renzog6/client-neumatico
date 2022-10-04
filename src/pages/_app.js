import Head from 'next/head'
import Layout from 'components/layout/Layout'

import 'styles/globals.css'
import 'styles/Home.module.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer position="bottom-center" />
    </>
  )
}

export default MyApp
