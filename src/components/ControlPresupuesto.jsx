
import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({ presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto }) => {
  const [ porcentaje, setPorcentaje ] = useState(0)
  const [ disponible, setDisponible ] = useState(0)
  const [ gastado, setGastado ] = useState(0)

  useEffect(() => {
    const gastoTotal = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
    const totalDisponible = presupuesto - gastoTotal

    const nuevoPorcentaje = ((gastoTotal * 100) / presupuesto).toFixed(2)

    setDisponible(totalDisponible)
    setGastado(gastoTotal)

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1000)
  }, [gastos])

  const formatearPresupesto = cantidad => {
    return cantidad.toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD'
    })
  }

  const handleResetearApp = () => {
    const respuesta = confirm('¿Desear resetear el presupuesto y gastos?')

    if(respuesta) {
      setPresupuesto(0)
      setGastos([])
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar 
          value={porcentaje}
          styles={buildStyles({
            pathColor : porcentaje > 100 ? '#DC2626' : '#3B82F6',
            trailColor : '#eceaea',
            textColor : porcentaje > 100 ? '#DC2626' : '#3B82F6'
          })}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className='contenido-presupuesto'>
        <button
          className='reset-app'
          type='button'
          onClick={handleResetearApp}
        >Resetear app</button>
        <p><span>Presupuesto: </span>{formatearPresupesto(presupuesto)}</p>
        <p className={disponible < 0 ? 'negativo' : ''}><span>Disponible: </span>{formatearPresupesto(disponible)}</p>
        <p><span>Gastado: </span>{formatearPresupesto(gastado)}</p>
      </div>
    </div>
  )
}

export default ControlPresupuesto
