import "./BotonAccion.css";

function BotonAccion({ texto = "Acción", onClick }) {
  return (
    <div className="boton-accion">
      <button className="circulo" onClick={onClick}>
        +
      </button>
      <span className="texto">{texto}</span>
    </div>
  );
}

export default BotonAccion;
