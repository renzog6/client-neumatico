/* eslint-disable no-unused-vars */
export enum TipoEquipo {
  Acoplado = 'Acoplado',
  Camion = 'Camion',
  Camioneta = 'Camioneta',
  Carreton = 'Carreton',
  Semirremolque = 'Semirremolque',
}

export interface Equipo {
  id: number
  name: string
  patente: string
  tipo: TipoEquipo
  chofer: string
  info: string
  estado: boolean
}
