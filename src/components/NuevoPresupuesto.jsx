import { useState } from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
  const [ mensaje, setMensaje ] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    
    if(!presupuesto || presupuesto < 0) {
      setMensaje('Presupuesto no válido')
      return
    }

    setMensaje('')
    setIsValidPresupuesto(true)
  }
  
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      
      <form 
        className='formulario'
        onSubmit={handleSubmit}
      >
        <div className='campo'>
          <label htmlFor='presupuest'>Definir presupuesto</label>

          <input 
            type='number'
            placeholder='Añade tu presupuesto'
            className='nuevo-presupuesto'
            value={presupuesto}
            onChange={e => setPresupuesto(Number(e.target.value))}
          />
        </div>

        <input 
          type='submit' 
          value='Añadir'  
        />

        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
      </form>
    </div>
  )
}

export default NuevoPresupuesto
