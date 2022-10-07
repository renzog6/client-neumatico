import React from 'react'
import Head from 'next/head'
import ListDepositos from 'components/deposito/ListDepositos'

export default function DepositoNeumaticos() {
  return (
    <>
      <Head>
        <title>SAE - Depositos Neumaticos</title>
      </Head>
      <ListDepositos />
    </>
  )
}
