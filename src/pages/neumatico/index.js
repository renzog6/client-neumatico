import React from 'react'
import Head from 'next/head'
import ListAllNeumaticos from 'components/neumatico/ListAllNeumaticos'

export default function HomeNeumatico() {
  return (
    <>
      <Head>
        <title>SAE - Listado Neumaticos</title>
      </Head>
      <ListAllNeumaticos />
    </>
  )
}
