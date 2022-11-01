import { useState } from 'react'

import { Button, forwardRef } from '@chakra-ui/react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const FechaCustom = () => {
  const [fecha, setFecha] = useState(new Date())

  const FechaCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button w="280px" onClick={onClick} ref={ref}>
      {value}
    </Button>
  ))

  return (
    <>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={fecha}
        onChange={(date) => setFecha(date)}
        customInput={<FechaCustomInput />}
      />
    </>
  )
}

export default FechaCustom
