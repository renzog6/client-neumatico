import { createContext, useContext, useState } from 'react'
import { Camion, Acoplado4Ejes } from './EjesEquipos'

import { instaladoService } from 'services/instalado.service'

export const AsignarContext = createContext()

export const AsignarProvider = ({ children }) => {
  const [asignarValue, setAsignarValue] = useState('')
  const [equipoSelect, setEquipoSelect] = useState('')
  const [ejes, setEjes] = useState([])
  const [neumatico, setNeumatico] = useState('')
  const [posicion, setPosicion] = useState('')
  const [instalados, setInstalados] = useState([])

  const getInstalados = (equipoId) => {
    const getInstalados = async () => {
      const res = await instaladoService.getAllInstalados(equipoId)
      console.log({ res })
      setInstalados(res)
    }
    getInstalados()
  }

  const setEquipo = (data) => {
    const equipo = JSON.parse(data)

    setEquipoSelect(equipo)
    getInstalados(equipo.id)

    switch (equipo.tipo) {
      case 'Camion':
        setEjes(Camion())
        break
      case 'Acoplado':
        setEjes(Acoplado4Ejes())
        break

      default:
        setEjes([])
        console.log('>>>>>>>> NADA')
        break
    }
  }

  const value = {
    asignarValue,
    setAsignarValue,
    equipoSelect,
    setEquipoSelect,
    setEquipo,
    ejes,
    neumatico,
    setNeumatico,
    posicion,
    setPosicion,
    instalados,
    setInstalados,
  }

  return (
    <AsignarContext.Provider value={value}>{children}</AsignarContext.Provider>
  )
}

export const useAsignarContext = () => {
  const context = useContext(AsignarContext)
  if (context === undefined) {
    throw new Error('Error en el contesto.')
  }
  return context
}
