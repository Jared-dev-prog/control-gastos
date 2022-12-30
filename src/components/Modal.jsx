import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarModalBtn from '../img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {
  const [ mensaje, setMensaje ] = useState('')
  const [ nombre, setNombre ] = useState('')
  const [ cantidad, setCantidad ] = useState('')
  const [ categoria, setCategoria ] = useState('')
  const [ id, setId ] = useState('')
  const [ fecha, setFecha ] = useState('')

  useEffect(() => {
    if(Object.keys(gastoEditar).length !== 0) {
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, [gastoEditar])

  const handleSubmit = e => {
    e.preventDefault()

    const datos = [ nombre, cantidad, categoria]

    if(datos.includes('')) {
      setMensaje('Todos los campos son obligatorios')

      setTimeout(() => {
        setMensaje('')
      }, 2000);
      return
    }

    guardarGasto({nombre, cantidad, categoria, id, fecha})
  }

  const cerrarModal = () => {
    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)
      setGastoEditar({})
    }, 500);
  }

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img 
          src={CerrarModalBtn} 
          alt='Botón cerrar modal' 
          onClick={cerrarModal}  
        />
      </div>

      <form 
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
      >
        <legend>{gastoEditar?.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>

        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje> }
        <div className='campo'>
          <label htmlFor='nombre'>Nombre gasto</label>

          <input 
            type='text' 
            placeholder='Introduce el nombre del gasto'
            id='nombre'  
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor='cantidad'>Cantidad</label>

          <input 
            type='text' 
            placeholder='Introduce la cantidad. Ej: 300'
            id='cantidad' 
            value={cantidad}
            onChange={e => setCantidad(Number(e.target.value))} 
          />
        </div>

        <div className='campo'>
          <label htmlFor='categoria'>Categoría</label>

          <select 
            id='categoria'
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          >
            <option value="">Seleccione</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="subscripciones">Subscripciones</option>
          </select>
        </div>

        <input 
          type='submit' 
          value={gastoEditar?.nombre ? 'Guardar cambios' : 'Agregar gasto'}  
        />
      </form>
    </div>
  )
}

export default Modal
