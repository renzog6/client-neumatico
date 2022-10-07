import React from 'react'
import Head from 'next/head'
import ListNeumaticos from 'components/neumatico/ListNeumaticos'

export default function HomeNeumatico() {
  return (
    <>
      <Head>
        <title>SAE - Home Neumaticos</title>
      </Head>
      <ListNeumaticos />
    </>
  )
}
