// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import { Marca } from './Marca'
import { Deposito } from './Deposito'
import { Medida } from './Medida'
import { Uso, Estado } from './TiposEnum'

/* export type Neumatico = {
  id: number
  name: string
  deposito: Deposito
  medida: Medida
  marca: Marca
  modelo: string
  posicion: string
  stock: number
  info: string
  updateAt: Date
  uso: Uso
  estado: Estado
} */

export interface Neumatico {
  id: number
  name: string
  deposito: Deposito
  medida: Medida
  marca: Marca
  modelo: string
  posicion: string
  stock: number
  info: string
  updateAt: Date
  uso: Uso
  estado: Estado
}
