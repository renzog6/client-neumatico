import React, { useState } from 'react'
import { useRouter } from 'next/router'
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

import 'react-datepicker/dist/react-datepicker.css'

import { toast } from 'react-toastify'

import { useForm, SubmitHandler } from 'react-hook-form'

import { Neumatico } from 'interfaces/Neumatico'
import { Uso as tipoUso, Estado as tipoEstado } from 'interfaces/TiposEnum'
import { neumaticoService } from '../../services/neumatico.service'
import FechaCustom from 'components/FechaCustom'

export default function Create({ depositos, medidas, marcas }) {
  const router = useRouter()
  const [fecha, setFecha] = useState(new Date())
  const [quantity, setQuantity] = useState(1)

  const changeQuantity = (e) => {
    if (e.target.value >= 1 && e.target.value <= 50) {
      setQuantity(e.target.value)
    } else {
      toast.error('La cantidad debe estar entre 1-50')
    }
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Neumatico>()

  const saveFormData: SubmitHandler<Neumatico> = async (data) => {
    console.log({ data })
    const neumatico: Neumatico = {
      id: 0,
      modelo: data.modelo,
      posicion: data.posicion,
      stock: 0,
      info: data.info,
      uso: data.uso,
      estado: data.estado,
      updateAt: fecha,
      createAt: fecha,
    }

    neumatico.deposito = {
      id: +data.deposito,
    }
    neumatico.medida = {
      id: +data.medida,
    }
    neumatico.marca = {
      id: +data.marca,
    }

    for (let i = 0; i < quantity; i++) {
      neumatico.name = generateString(5)
      const response = await neumaticoService.create(neumatico)
      if (response.status === 400) {
        console.log('ERROR')
      } else if (response.ok) {
        toast.success('Gurdado con Exito!!!')
        router.push('/neumatico')
      } else {
        toast.error(
          'An unexpected error occurred while saving, please try again'
        )
      }
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
                  defaultValue={depositos[0].id}
                  {...register('deposito', { required: true })}
                >
                  <option value={depositos[0].id} disabled>
                    {depositos[0].name}
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
                    {marcas[0].name}
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
                  defaultValue={tipoUso.Mixto}
                  {...register('uso')}
                  required
                >
                  <option value={tipoUso.Mixto} disabled>
                    {tipoUso.Mixto}
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
              <label htmlFor="Quantity">
                Cantidad
                <Input
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="Cantidad"
                  required
                  onChange={changeQuantity}
                />
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

// declare all characters

function generateString(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ' '
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}
