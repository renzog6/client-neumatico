import Head from 'next/head'
import Create from 'components/neumatico/CreateNeumatico'
import { marcaService } from 'services/marca.service'
import { depositoService } from 'services/deposito.service'
import { medidaService } from 'services/medida.service'

export default function CreateNeumatico({ depositos, medidas, marcas }) {
  return (
    <>
      <Head>
        <title>SAE - Agregar Neumatico</title>
      </Head>
      <Create depositos={depositos} medidas={medidas} marcas={marcas} />
    </>
  )
}

export async function getServerSideProps() {
  const depositos = await depositoService.getAll()
  const medidas = await medidaService.getAll()
  const marcas = await marcaService.getAll()

  return {
    props: {
      depositos,
      medidas,
      marcas,
    },
  }
}
