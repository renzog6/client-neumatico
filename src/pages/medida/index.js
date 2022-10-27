import React from 'react'
import Head from 'next/head'
import ListMedidas from 'components/medida/ListMedidas'
import { CreateMedida } from 'components/medida/CreateMedida'
export default function MedidasNeumaticos() {
  return (
    <>
      <Head>
        <title>SAE - Medidas Neumaticos</title>
      </Head>
      <CreateMedida />
      <ListMedidas />
    </>
  )
}
