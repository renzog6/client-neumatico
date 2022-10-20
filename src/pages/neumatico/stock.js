import React from 'react'
import Head from 'next/head'
import StockNeumaticos from 'components/neumatico/StockNeumaticos'

export default function HomeNeumatico() {
  return (
    <>
      <Head>
        <title>SAE - Stock Neumaticos</title>
      </Head>
      <StockNeumaticos />
    </>
  )
}
