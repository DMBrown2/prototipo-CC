//Página gastos cuando selecciono GASTOS en NavBar:
import { useState} from 'react'
import Button from '../Layout/BotonAccion'
import GastoForm from '../pages/NuevoGasto/GastoForm';

//LISTA DE PARTICIPANTES CON SUS GASTOS
//- pili en comida $

//lo que se subio al GastosForm.jsx


export default function GastosList() {
  const [ mostrarForm, setMostrarForm] = useState(false);
  const agregarGasto = () => setMostrarForm(true);
  const cerrarForm = () => setMostrarForm(false);

  return (
    <div className='seccion-gastos' onClick={onclick}>
    <span>Mis Gastos: $</span>
    <span>Gastos totales: $</span>
    <p>Fecha juntada</p>

    <p>Pili gastó $`$1500` en comida</p>
    <p>Sole gastó $3000 en bebida</p>

    
   <Button texto="Agregar gasto" onClick={agregarGasto}/>

   {mostrarForm && <GastoForm onClose={cerrarForm} />}
    </div>
  )
}

