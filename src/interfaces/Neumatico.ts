import { Marca } from './Marca'
import { Deposito } from './Deposito'
import { Medida } from './Medida'
import { Uso, Estado } from './TiposEnum'

export interface Neumatico {
  id: number
  name?: string
  deposito?: Deposito
  medida?: Medida
  marca?: Marca
  modelo: string
  posicion: string
  stock: number
  info: string
  uso?: Uso
  estado?: Estado
  updateAt: Date
  createAt: Date
}
