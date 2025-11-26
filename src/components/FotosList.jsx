//en fotos:
//- pili subio foto de comida + img 

//lo que se suba en FotoForm.jsx

import { useState } from 'react'
import Button from '../Layout/BotonAccion'
import FotoForm from '../pages/NuevaFoto/FotoForm'

export default function FotosList() {
  const [mostrarForm, setMostrarForm] = useState(false);
  
  const agregarFoto = () => setMostrarForm(true);
  const cerrarForm = () => setMostrarForm(false);

  // Datos de ejemplo
  const fotos = [
    { id: 1, usuario: 'Pili', descripcion: 'Foto de la comida', imagen: '🍕' },
    { id: 2, usuario: 'Dani', descripcion: 'Foto de la bebida', imagen: '🍻' },
  ];

  return (
    <div className='seccion-fotos'>
      <h2>Fotos de tickets</h2>
      <div className='fotos-list'>
        {fotos.map((foto) => (
          <div key={foto.id} className='foto-item'>
            <p><strong>{foto.usuario}:</strong> {foto.descripcion}</p>
            <span className='foto-emoji'>{foto.imagen}</span>
          </div>
        ))}
      </div>
      
      <Button texto="Agregar foto" onClick={agregarFoto} />
      
      {mostrarForm && <FotoForm onClose={cerrarForm} />}
    </div>
  )
}
