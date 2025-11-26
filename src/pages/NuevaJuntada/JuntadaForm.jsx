//FORMULARIO PARA CREAR UNA JUNTA
import '../../components/Form.css'

export default function JuntadaForm( ) {
  
  return (
    <form className="juntada-form">
      <input
        type="text"
        placeholder="Nombre de la juntada"
        value="nombre"
        // onChange={(e) => setNombre(e.target.value)}
      />
        <input
        type="text"
        placeholder="Participante"
        // value="participantes"
        // onChange={(e) => setParticipantes(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  )
}
