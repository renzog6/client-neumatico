import Head from 'next/head'
import Update from 'components/neumatico/UpdateNeumatico'

import { neumaticoService } from 'services/neumatico.service'
import { marcaService } from 'services/marca.service'
import { depositoService } from 'services/deposito.service'
import { medidaService } from 'services/medida.service'

export default function UpdateNeumatico({
  neumatico,
  depositos,
  medidas,
  marcas,
}) {
  return (
    <>
      <Head>
        <title>SAE - Update Neumaticos</title>
      </Head>
      <Update
        neumatico={neumatico}
        depositos={depositos}
        medidas={medidas}
        marcas={marcas}
      />
    </>
  )
}

export async function getServerSideProps({ params }) {
  const neumatico = await neumaticoService.getById(+params.neumaticoId)
  const depositos = await depositoService.getAll()
  const medidas = await medidaService.getAll()
  const marcas = await marcaService.getAll()
  return {
    props: {
      neumatico,
      depositos,
      medidas,
      marcas,
    },
  }
}
