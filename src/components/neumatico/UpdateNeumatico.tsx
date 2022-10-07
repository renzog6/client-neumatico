import React from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useForm } from 'react-hook-form'

import { Deposito } from 'interfaces/Deposito'
import { Medida } from 'interfaces/Medida'
import { Marca } from 'interfaces/Marca'
import { Neumatico } from 'interfaces/Neumatico'
import { Uso as tipoUso } from 'interfaces/TiposEnum'
import { neumaticoService } from '../../services/neumatico.service'

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

export default function Update({ neumatico, depositos, medidas, marcas }) {
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
      medida: neumatico.medida,
      modelo: neumatico.modelo,
      posicion: neumatico.posicion,
      info: neumatico.info,
    },
  })

  const saveFormData = async (data: Neumatico) => {
    const deposito: Deposito = {
      id: +data.deposito,
      name: '',
      info: '',
    }
    data.deposito = deposito

    const medida: Medida = {
      id: +data.medida,
      name: '',
      alt: '',
      info: '',
    }
    data.medida = medida

    const marca: Marca = {
      id: +data.marca,
      name: '',
      info: '',
    }
    data.marca = marca

    const response = await neumaticoService.update(neumatico.id, data)
    if (response.status === 400) {
      toast.error('An 4000 error occurred while saving, please try again')
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
              <label htmlFor="deposito">
                Deposito
                <Select
                  w="280px"
                  id="deposito"
                  defaultValue={'DEFAULT'}
                  {...register('deposito')}
                  required
                >
                  <option value="DEFAULT" disabled>
                    {neumatico.deposito.name}
                  </option>
                  {depositos.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} - {m.info}
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
                  defaultValue={'DEFAULT'}
                  {...register('medida')}
                  required
                >
                  <option value="DEFAULT" disabled>
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
                  defaultValue={'DEFAULT'}
                  {...register('marca')}
                  required
                >
                  <option value="DEFAULT" disabled>
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
    </>
  )
}
