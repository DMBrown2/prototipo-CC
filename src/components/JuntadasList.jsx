import "./JuntadasList.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShareNodes} from '@fortawesome/free-solid-svg-icons'

export default function JuntadasList({emoji = "🎉", nombre, onShare, onClick}) {

  return (
    <>
    <div className="juntada-container">
    <div className="juntada-item" onClick={onClick}>
      <span className="emoji">{emoji}</span>
      <span className="nombre">{nombre}</span>
    </div>

 

        <button className="btn-compartir" onClick={onShare}>
        <FontAwesomeIcon icon={faShareNodes} />
         {/* Compartir */}
        </button>

        

    </div>
    </>
  )
}
