//FORMULARIO PARA CREAR UNA JUNTA
import { useState } from 'react'
import '../../components/Form.css'

export default function JuntadaForm( { onSubmit } ) {
    const [nombre, setNombre] = useState("");
  const [participante, setParticipante] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    onSubmit({ emoji: "🥳", nombre, participantes: [participante].filter(Boolean) });
    setNombre("");
    setParticipante("");
  };
  
  return (
    <form className="juntada-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre de la juntada"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
        <input
        type="text"
        placeholder="Participante"
        value={participante}
        onChange={(e) => setParticipante(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  )
}
