//Página gastos cuando selecciono GASTOS en NavBar:
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import Button from '../Layout/BotonAccion'
import GastoForm from '../pages/NuevoGasto/GastoForm';
import { useJuntada } from '../hooks/useJuntada'
import '../pages/NuevoGasto/GastoForm.css'
import './GastosList.css'

Modal.setAppElement('#root');

//LISTA DE PARTICIPANTES CON SUS GASTOS
//MIS GASTOS $  | GASTOS TOTALES $
//- pili en comida $   (lo que se subio al GastosForm.jsx)

export default function GastosList() {
  const { id: juntadaId } = useParams();
  const { obtenerJuntada, eliminarGasto } = useJuntada();
  const juntada = obtenerJuntada(juntadaId);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [gastoEditar, setGastoEditar] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [gastoAEliminar, setGastoAEliminar] = useState(null);

  const agregarGasto = () => setMostrarForm(true);
  const cerrarForm = () => {
    setMostrarForm(false);
    setGastoEditar(null);
  };

  const handleEliminarGasto = (gasto) => {
    setGastoAEliminar(gasto);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (gastoAEliminar) {
      eliminarGasto(parseInt(juntadaId), gastoAEliminar.id);
      setShowDeleteConfirm(false);
      setGastoAEliminar(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setGastoAEliminar(null);
  };

  const handleEditarGasto = (gasto) => {
    setGastoEditar(gasto);
    setMostrarForm(true);
  };

  if (!juntada) {
    return <div className="seccion-gastos">Juntada no encontrada</div>;
  }

  const gastos = juntada.gastos || [];
  const totalGastos = gastos.reduce((sum, gasto) => sum + gasto.monto, 0);
  const fechaCreacion = juntada.fechaCreacion || 'No especificada';

  // Agrupar gastos por usuario
  const gastosPorUsuario = gastos.reduce((acc, gasto) => {
    if (!acc[gasto.usuario]) {
      acc[gasto.usuario] = 0;
    }
    acc[gasto.usuario] += gasto.monto;
    return acc;
  }, {});

  return (
    <div className='seccion-gastos'>
      <div className="gastos-summary">
        <span>📊 Gastos totales: ${totalGastos.toFixed(2)}</span>
        <span>📅 Fecha: {fechaCreacion}</span>
      </div>

      <div className="gastos-por-usuario">
        {Object.keys(gastosPorUsuario).length > 0 ? (
          <>
            <h3>Gastos por persona:</h3>
            {Object.entries(gastosPorUsuario).map(([usuario, monto]) => (
              <p key={usuario} className="gasto-item">
                💰 {usuario} gastó <strong>${monto.toFixed(2)}</strong>
              </p>
            ))}
          </>
        ) : (
          <p className="sin-gastos">No hay gastos registrados aún</p>
        )}
      </div>

      <div className="gastos-detalle">
        {gastos.length > 0 && (
          <>
            <h3>Detalle de gastos:</h3>
            <ul className="gastos-list">
              {gastos.map(gasto => (
                <li key={gasto.id} className="gasto-detail-item">
                  <div className="gasto-info">
                    <span className="gasto-usuario">👤 {gasto.usuario}</span>
                    <span className="gasto-descripcion">{gasto.descripcion}</span>
                    <span className="gasto-fecha">{gasto.fecha}</span>
                  </div>
                  <span className="gasto-monto">${gasto.monto.toFixed(2)}</span>
                  {gasto.foto && (
                    <span className="gasto-foto" title={gasto.foto}>📸</span>
                  )}
                  <div className="gasto-actions">
                    <button
                      className="btn-action btn-edit"
                      onClick={() => handleEditarGasto(gasto)}
                      title="Editar gasto"
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button
                      className="btn-action btn-delete"
                      onClick={() => handleEliminarGasto(gasto)}
                      title="Eliminar gasto"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <Button texto="Agregar gasto" onClick={agregarGasto} />

      {/* Diálogo de confirmación de eliminación */}
      {showDeleteConfirm && gastoAEliminar && (
        <div className="confirmation-dialog-overlay">
          <div className="confirmation-dialog">
            <h2>⚠️ Eliminar gasto</h2>
            <p>
              ¿Estás seguro de que queres eliminar el gasto de <strong>${gastoAEliminar.monto.toFixed(2)}</strong> por <strong>{gastoAEliminar.descripcion}</strong> pagado por <strong>{gastoAEliminar.usuario}</strong>?
            </p>
            <p className="confirmation-question">Esta acción no se puede deshacer.</p>
            <div className="confirmation-buttons">
              <button
                className="btn btn-yes"
                onClick={handleConfirmDelete}
              >
                SÍ, ELIMINAR
              </button>
              <button
                className="btn btn-no"
                onClick={handleCancelDelete}
              >
                NO, CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal 
        isOpen={mostrarForm} 
        onRequestClose={cerrarForm}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <GastoForm onClose={cerrarForm} gastoEditar={gastoEditar} />
      </Modal>
    </div>
  )
}

