import Head from 'next/head'
import ListAllMovimientos from 'components/neumatico/ListAllMovimientos'

export default function Movimiento() {
  return (
    <>
      <Head>
        <title>SAE - Movimientos Neumaticos</title>
      </Head>
      <ListAllMovimientos />
    </>
  )
}
