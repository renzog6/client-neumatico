import { Equipo } from './Equipo'
import { Neumatico } from './Neumatico'

export interface Instalado {
  id: number
  fecha: Date
  equipo: Equipo
  neumatico: Neumatico
  posicion: string
  info: string
}
