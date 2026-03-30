import "./BotonAccion.css";

function BotonAccion({ signo = "", texto = "Acción", onClick, type = "button", disabled = false }) {
  return (
    <div className="boton-accion">
      <button 
        className="circulo" 
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {signo}
      </button>
      <span className="texto">{texto}</span>
    </div>
  );
}

export default BotonAccion;
