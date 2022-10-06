import Head from 'next/head'
import Create from 'components/neumatico/Create'
import { marcaService } from 'services/marca.service'

export default function CreateNeumatico({ marcas }) {
  return (
    <>
      <Head>
        <title>SAE - Agregar Neumatico</title>
      </Head>
      <Create marcas={marcas} />
    </>
  )
}

export async function getServerSideProps() {
  const marcas = await marcaService.getAll()
  return {
    props: {
      marcas,
    },
  }
}
