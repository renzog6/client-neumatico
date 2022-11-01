import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '../theme'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <meta name="description" content="App ADM Neumaticos." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
