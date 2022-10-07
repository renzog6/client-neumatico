import React from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'

import { useForm } from 'react-hook-form'

import { Deposito } from 'interfaces/Deposito'
import { Medida } from 'interfaces/Medida'
import { Marca } from 'interfaces/Marca'
import { Neumatico } from 'interfaces/Neumatico'
import { Uso as tipoUso } from 'interfaces/TiposEnum'

import { neumaticoService } from '../../services/neumatico.service'
import {
  Stack,
  Button,
  Heading,
  Box,
  Spacer,
  Wrap,
  WrapItem,
  Input,
  Select,
  Center,
} from '@chakra-ui/react'

export default function Create({ depositos, medidas, marcas }) {
  const router = useRouter()

  console.log(Object.values(tipoUso))
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Neumatico>()

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

    const response = await neumaticoService.create(data)
    if (response.status === 400) {
      console.log('ERROR')
    } else if (response.ok) {
      toast.success('Gurdado con Exito!!!')
      router.push('/neumatico')
    } else {
      toast.error('An unexpected error occurred while saving, please try again')
    }
  }

  return (
    <>
      <Box w="100%" height="50px" alignItems="center">
        <Center>
          <Heading as="h3" size="md" p={2}>
            Agregar Neumatico
          </Heading>
        </Center>
      </Box>
      <Spacer />
      <Box bg="gray.700" w="100%" p={5}>
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
                    Seleccionar Deposito
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
                    Seleccionar Medida
                  </option>
                  {medidas.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} - {m.info}
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
                    Seleccionar Marca
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
                    Seleccionar Tipo Uso
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

          <Stack w="100" direction="row" spacing={4}>
            <Center>
              <Button
                colorScheme="green"
                variant="solid"
                isLoading={isSubmitting}
                type="submit"
              >
                {isSubmitting ? 'Guardando...' : 'Guardar'}
              </Button>
            </Center>
          </Stack>
        </form>
      </Box>
    </>
  )
}
