import { createContext, useContext, useState } from 'react'
import { Camion, Acoplado4Ejes } from './EjesEquipos'

export const AsignarContext = createContext()

export const AsignarProvider = ({ children }) => {
  const [asignarValue, setAsignarValue] = useState('')
  const [equipoSelect, setEquipoSelect] = useState('')
  const [ejes, setEjes] = useState([])
  const [neumatico, setNeumatico] = useState()
  const [posicion, setPosicion] = useState()

  const setEquipo = (data) => {
    const equipo = JSON.parse(data)
    setEquipoSelect(equipo)

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
