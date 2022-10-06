import React from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'

import { useForm } from 'react-hook-form'

import { Marca } from '../../interfaces/Marca'
import { Neumatico } from '../../interfaces/Neumatico'
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
} from '@chakra-ui/react'

export default function Create({ marcas }) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Neumatico>()

  const saveFormData = async (data: Neumatico) => {
    const m: Marca = {
      id: +data.marca,
      name: '',
      info: '',
    }
    data.marca = m
    data.stock = 0

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
      <Box w="100%" height="40px">
        <Heading as="h3" size="md" p={5}>
          Agregar Neumatico
        </Heading>
      </Box>
      <Spacer />
      <Box w="100%" p={5}>
        <form onSubmit={handleSubmit(saveFormData)}>
          <Wrap spacing="50px" justify="center" p={5}>
            <WrapItem>
              {' '}
              <label htmlFor="equipo">
                Equipo
                <Input
                  type="text"
                  id="equipo"
                  name="equipo"
                  placeholder="Equipo"
                  {...register('equipo')}
                  required
                />
              </label>
            </WrapItem>
            <WrapItem>
              {' '}
              <label htmlFor="medida">
                Medida
                <Input
                  type="text"
                  id="medida"
                  name="medida"
                  placeholder="Medida"
                  {...register('medida')}
                  required
                />
              </label>
            </WrapItem>
            <WrapItem>
              {' '}
              <label htmlFor="marca">
                Marca
                <Select
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
              <label htmlFor="posicion">
                Posicion
                <Input
                  type="text"
                  id="posicion"
                  name="posicion"
                  placeholder="Posicion"
                  {...register('posicion')}
                  required
                />
              </label>
            </WrapItem>
            <WrapItem>
              <label htmlFor="info">
                Comentarios
                <Input
                  variant="filled"
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
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  )
}
