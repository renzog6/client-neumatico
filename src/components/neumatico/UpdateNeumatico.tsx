import { useState } from 'react'
import { useRouter } from 'next/router'

import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  Spacer,
  Stack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useForm } from 'react-hook-form'

import { Neumatico } from 'interfaces/Neumatico'
import { neumaticoService } from '../../services/neumatico.service'
import { Uso as tipoUso, Estado as tipoEstado } from 'interfaces/TiposEnum'
import FechaCustom from 'components/FechaCustom'

export default function Update({ neumatico, depositos, medidas, marcas }) {
  const [fecha, setFecha] = useState(new Date())

  const router = useRouter()
  if (neumatico === null) router.push('/neumatico')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Neumatico>({
    defaultValues: {
      id: neumatico.id,
      name: neumatico.name,
      modelo: neumatico.modelo,
      posicion: neumatico.posicion,
      uso: neumatico.uso,
      estado: neumatico.estado,
      info: neumatico.info,
    },
  })

  const saveFormData = async (data: Neumatico) => {
    data.updateAt = fecha
    // Set Deposito
    neumatico.deposito.id = +data.deposito
    data.deposito = neumatico.deposito

    // Set Medida
    neumatico.medida.id = +data.medida
    data.medida = neumatico.medida

    // Set Marca
    neumatico.marca.id = +data.marca
    data.marca = neumatico.marca

    const response = await neumaticoService.update(neumatico.id, data)

    if (response.status === 400 || response.status === 500) {
      toast.error('An error occurred while saving, please try again')
    } else if (response.ok) {
      toast.success('Actualizado con Exito!!!')
      router.push('/neumatico')
    } else {
      toast.error('An unexpected error occurred while saving, please try again')
    }
  }

  const deleteItem = async () => {
    const response = await neumaticoService.delete(neumatico.id)
    if (response.status === 400) {
      toast.error('An 400 error occurred while saving, please try again')
    } else if (response.ok) {
      toast.success('BORRADO con Exito!!!')
      router.push('/neumatico')
    } else {
      toast.error('An unexpected error occurred while saving, please try again')
    }
  }

  return (
    <>
      <Box bg="gray.700">
        <Box w="100%" height="40px">
          <Heading as="h3" size="md" p={5}>
            Actualizar Neumatico
          </Heading>
        </Box>
        <Spacer />
        <Box w="100%" p={5}>
          <form onSubmit={handleSubmit(saveFormData)}>
            <Wrap spacing="50px" justify="center" p={5}>
              <WrapItem>
                <label htmlFor="Fecha">
                  Fecha
                  <FechaCustom getFecha={setFecha} />
                </label>
              </WrapItem>
              <WrapItem>
                <label htmlFor="deposito">
                  Deposito
                  <Select
                    w="280px"
                    id="deposito"
                    defaultValue={neumatico.deposito.id}
                    {...register('deposito')}
                    required
                  >
                    <option value={neumatico.deposito.id} disabled>
                      {neumatico.deposito.name}
                    </option>
                    {depositos.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </Select>
                </label>
              </WrapItem>
              <WrapItem>
                <label htmlFor="name">
                  Nombre
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nombre"
                    {...register('name')}
                    required
                  />
                </label>
              </WrapItem>
              <WrapItem>
                <label htmlFor="medida">
                  Medida
                  <Select
                    w="280px"
                    id="medida"
                    defaultValue={neumatico.medida.id}
                    {...register('medida')}
                    required
                  >
                    <option value={neumatico.medida.id} disabled>
                      {neumatico.medida.name}
                    </option>
                    {medidas.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </Select>
                </label>
              </WrapItem>
              <WrapItem>
                <label htmlFor="marca">
                  Marca
                  <Select
                    w="280px"
                    id="marca"
                    defaultValue={neumatico.marca.id}
                    {...register('marca')}
                    required
                  >
                    <option value={neumatico.marca.id} disabled>
                      {neumatico.marca.name}
                    </option>
                    {marcas.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </Select>
                </label>
              </WrapItem>
              <WrapItem>
                <label htmlFor="modelo">
                  Modelo
                  <Input
                    type="text"
                    id="modelo"
                    name="modelo"
                    placeholder="Modelo"
                    {...register('modelo')}
                    required
                  />
                </label>
              </WrapItem>
              <WrapItem>
                <label htmlFor="tipoUso">
                  Tipo de Uso
                  <Select
                    w="280px"
                    id="tipoUso"
                    defaultValue={'DEFAULT'}
                    {...register('uso')}
                    required
                  >
                    <option value="DEFAULT" disabled>
                      {neumatico.uso}
                    </option>
                    {Object.values(tipoUso).map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </Select>
                </label>
              </WrapItem>
              <WrapItem>
                <label htmlFor="estado">
                  Estado Neumatico
                  <Select
                    w="280px"
                    id="estado"
                    defaultValue={tipoEstado.Nuevo}
                    {...register('estado')}
                    required
                  >
                    <option value={tipoEstado.Nuevo} disabled>
                      {tipoEstado.Nuevo}
                    </option>
                    {Object.values(tipoEstado).map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </Select>
                </label>
              </WrapItem>
              <WrapItem>
                <label htmlFor="info">
                  Comentarios
                  <Input
                    type="text"
                    id="info"
                    name="info"
                    placeholder="Comentarios..."
                    {...register('info')}
                  />
                </label>
              </WrapItem>
            </Wrap>

            <Stack direction="row" spacing={4}>
              <Button
                colorScheme="green"
                variant="solid"
                isLoading={isSubmitting}
                type="submit"
              >
                {isSubmitting ? 'Actualizando...' : 'Actualizar'}
              </Button>
              <Button
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  if (window.confirm('Seguro que desea BORRAR este item?')) {
                    deleteItem()
                  }
                }}
              >
                Borrar
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  )
}
