import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useForm } from 'react-hook-form'

import { Marca } from '../../interfaces/Marca'
import { Neumatico } from '../../interfaces/Neumatico'
import { neumaticoService } from '../../services/neumatico.service'
import { marcaService } from '../../services/marca.service'
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

export default function Update({ neumatico }) {
  const router = useRouter()
  if (neumatico === null) router.push('/neumatico')

  const [marcas, setMarcas] = useState([])

  useEffect(() => {
    const getAllMarcas = async () => {
      const result = await marcaService.getAll()
      setMarcas(result)
    }
    getAllMarcas()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Neumatico>({
    defaultValues: {
      id: neumatico.id,
      equipo: neumatico.equipo,
      medida: neumatico.medida,
      modelo: neumatico.modelo,
      posicion: neumatico.posicion,
      info: neumatico.info,
    },
  })

  const saveFormData = async (data: Neumatico) => {
    const m: Marca = {
      id: +data.marca,
      name: '',
      info: '',
    }
    data.marca = m

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
              {' '}
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
              {' '}
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
              {' '}
              <label htmlFor="info">
                Info
                <Input
                  type="text"
                  id="info"
                  name="info"
                  placeholder="Comentarios...."
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
