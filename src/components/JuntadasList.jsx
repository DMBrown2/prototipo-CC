import "./JuntadasList.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShare, faPencil, faTrash} from '@fortawesome/free-solid-svg-icons'

export default function JuntadasList({emoji = "🎉", nombre, onShare, onClick, onEdit, onDelete}) {

  return (
    <>
    <div className="juntada-container">
    <div className="juntada-item" onClick={onClick}>
      <span className="emoji">{emoji}</span>
      <span className="nombre">{nombre}</span>
    </div>

    <div className="juntada-actions">
      {onEdit && (
        <button 
          className="btn-action btn-edit-juntada" 
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          title="Editar juntada"
        >
          <FontAwesomeIcon icon={faPencil} />
        </button>
      )}

      {onDelete && (
        <button 
          className="btn-action btn-delete-juntada" 
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          title="Eliminar juntada"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}

      <button 
        className="btn-action btn-compartir" 
        onClick={(e) => {
          e.stopPropagation();
          onShare();
        }}
      >
        <FontAwesomeIcon icon={faShare} />
      </button>
    </div>

    </div>
    </>
  )
}
