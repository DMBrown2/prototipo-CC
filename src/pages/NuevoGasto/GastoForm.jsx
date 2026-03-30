import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Title from '../../components/Title'
import '../../components/Form.css'
import './GastoForm.css'
import React, { useState, useEffect } from 'react'
import BotonAccion from '../../Layout/BotonAccion'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useJuntada } from '../../hooks/useJuntada'
import { useNavigate, useParams } from 'react-router-dom'
import { validarFormularioGasto } from '../../utils/validators'

export default function GastoForm({ onClose, gastoEditar = null }) {
  const navigate = useNavigate();
  const { id: juntadaId } = useParams();
  const { agregarGasto, actualizarGasto, obtenerJuntada } = useJuntada();
  const juntada = juntadaId ? obtenerJuntada(juntadaId) : null;

  const [formData, setFormData] = useState({
    monto: gastoEditar?.monto || '',
    usuario: gastoEditar?.usuario || '',
    descripcion: gastoEditar?.descripcion || '',
    fecha: gastoEditar?.fecha || new Date().toISOString().split('T')[0],
    paraQuienes: gastoEditar?.paraQuienes || [],
    foto: gastoEditar?.foto || null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastAddedGasto, setLastAddedGasto] = useState(null);
  const [hadChanges, setHadChanges] = useState(false);

  // Cargar datos del gasto a editar
  useEffect(() => {
    if (gastoEditar) {
      setFormData({
        monto: gastoEditar.monto || '',
        usuario: gastoEditar.usuario || '',
        descripcion: gastoEditar.descripcion || '',
        fecha: gastoEditar.fecha || new Date().toISOString().split('T')[0],
        paraQuienes: gastoEditar.paraQuienes || [],
        foto: gastoEditar.foto || null
      });
    }
  }, [gastoEditar]);

  // Detectar si hay cambios en los datos
  const hasChanges = () => {
    if (!gastoEditar) return false; // No es edición, así que no hay cambios previos
    
    return (
      parseFloat(formData.monto) !== gastoEditar.monto ||
      formData.usuario !== gastoEditar.usuario ||
      formData.descripcion !== gastoEditar.descripcion ||
      formData.fecha !== gastoEditar.fecha ||
      JSON.stringify(formData.paraQuienes.sort()) !== JSON.stringify((gastoEditar.paraQuienes || []).sort()) ||
      formData.foto !== gastoEditar.foto
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleParticipantChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      paraQuienes: checked
        ? [...prev.paraQuienes, value]
        : prev.paraQuienes.filter(p => p !== value)
    }));
    if (errors.paraQuienes) {
      setErrors(prev => ({
        ...prev,
        paraQuienes: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      foto: file
    }));
    if (errors.foto) {
      setErrors(prev => ({
        ...prev,
        foto: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validar formulario
    const validacion = validarFormularioGasto(formData);
    if (!validacion.isValid) {
      setErrors(validacion.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Crear objeto gasto para agregar/actualizar al contexto
      const nuevoGasto = {
        usuario: formData.usuario,
        descripcion: formData.descripcion,
        monto: parseFloat(formData.monto),
        fecha: formData.fecha,
        paraQuienes: formData.paraQuienes,
        foto: formData.foto ? formData.foto.name : null
      };

      // Verificar si estamos editando o agregando
      if (gastoEditar) {
        // Detectar cambios
        const cambios = hasChanges();
        
        if (cambios) {
          // Actualizar gasto existente
          actualizarGasto(parseInt(juntadaId), gastoEditar.id, nuevoGasto);
          setHadChanges(true);
          setLastAddedGasto(nuevoGasto);
          setShowConfirmation(true);
        } else {
          // No hay cambios, cerrar directamente
          if (onClose) {
            onClose();
          } else {
            navigate(`/juntada/${juntadaId}`);
          }
        }
      } else {
        // Agregar nuevo gasto
        if (juntadaId) {
          agregarGasto(parseInt(juntadaId), nuevoGasto);
          setHadChanges(false);
          setLastAddedGasto(nuevoGasto);
          setShowConfirmation(true);
        } else {
          console.error('No se especificó una juntada');
        }
      }
    } catch (error) {
      console.error('Error al procesar gasto:', error);
      setErrors({ general: 'Error al procesar el gasto. Intenta de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      monto: '',
      usuario: '',
      descripcion: '',
      fecha: new Date().toISOString().split('T')[0],
      paraQuienes: [],
      foto: null
    });
    setErrors({});
    setShowConfirmation(false);
    setLastAddedGasto(null);
  };

  const handleConfirmationYes = () => {
    if (hadChanges || gastoEditar) {
      // Si fue edición, cerrar el modal
      if (onClose) {
        onClose();
      } else {
        navigate(`/juntada/${juntadaId}`);
      }
    } else {
      // Si fue nuevo gasto, limpiar formulario para agregar otro
      resetForm();
    }
  };

  const handleConfirmationNo = () => {
    setShowConfirmation(false);
    setLastAddedGasto(null);
    setHadChanges(false);
    if (onClose) {
      onClose();
    } else if (juntadaId) {
      navigate(`/juntada/${juntadaId}`);
    } else {
      navigate('/');
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else if (juntadaId) {
      navigate(`/juntada/${juntadaId}`);
    } else {
      navigate('/');
    }
  };

  // Participantes de la juntada (o lista por defecto si no hay juntada)
  const participantes = juntada?.participantes || ['Pili', 'Dani', 'Cami', 'Sole'];

  return (
    <>
      <main>
        <Title title={gastoEditar ? "Editar gasto" : "Agregar nuevo gasto"} />

        {showConfirmation && lastAddedGasto && (
          <div className="confirmation-dialog-overlay">
            <div className="confirmation-dialog">
              {gastoEditar ? (
                <>
                  <h2>✅ ¡Gasto editado!</h2>
                  <p>
                    Actualizaste gasto de <strong>${lastAddedGasto.monto.toFixed(2)}</strong> por <strong>{lastAddedGasto.descripcion}</strong> pagado por <strong>{lastAddedGasto.usuario}</strong>.
                  </p>
                  <div className="confirmation-buttons">
                    <button
                      className="btn btn-yes"
                      onClick={handleConfirmationYes}
                      style={{ width: '100%' }}
                    >
                      ENTENDIDO
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2>✅ ¡Gasto agregado!</h2>
                  <p>
                    Agregaste gasto de <strong>${lastAddedGasto.monto.toFixed(2)}</strong> por <strong>{lastAddedGasto.descripcion}</strong> pagado por <strong>{lastAddedGasto.usuario}</strong>.
                  </p>
                  <p className="confirmation-question">¿Queres agregar un gasto más?</p>
                  <div className="confirmation-buttons">
                    <button
                      className="btn btn-yes"
                      onClick={handleConfirmationYes}
                    >
                      SÍ
                    </button>
                    <button
                      className="btn btn-no"
                      onClick={handleConfirmationNo}
                    >
                      NO
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="form-container">
          {errors.general && <div className="error-message">{errors.general}</div>}
          
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              {/* Monto */}
              <div className="input-monto">
                <label htmlFor="monto">Monto: </label>
                <input
                  type="number"
                  name="monto"
                  id="monto"
                  placeholder="Monto gastado"
                  min="1"
                  max="1000000"
                  step="0.01"
                  value={formData.monto}
                  onChange={handleInputChange}
                />
                {errors.monto && <span className="error-text">{errors.monto}</span>}
              </div>

              {/* Quién pagó */}
              <div className="input-nombre">
                <label htmlFor="usuario">Quién pagó? </label>
                <select
                  name="usuario"
                  id="usuario"
                  value={formData.usuario}
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona un participante</option>
                  {participantes.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {errors.usuario && <span className="error-text">{errors.usuario}</span>}
              </div>

              {/* Qué compraste */}
              <div className="input-item">
                <label htmlFor="descripcion">Qué compraste? </label>
                <input
                  type="text"
                  name="descripcion"
                  id="descripcion"
                  placeholder="Item comprado"
                  minLength="2"
                  maxLength="120"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                />
                {errors.descripcion && <span className="error-text">{errors.descripcion}</span>}
              </div>

              {/* Fecha (opcional) */}
              <div className="input-fecha">
                <label htmlFor="fecha">Fecha (opcional):</label>
                <input
                  type="date"
                  name="fecha"
                  id="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                />
                {errors.fecha && <span className="error-text">{errors.fecha}</span>}
              </div>

              {/* Para quiénes */}
              <div className="input-para-quienes">
                <label>Para quiénes?</label>
                {participantes.map(participante => (
                  <div key={participante} className="checkbox-group">
                    <input
                      type="checkbox"
                      id={`para-quienes-${participante}`}
                      name="paraQuienes"
                      value={participante}
                      checked={formData.paraQuienes.includes(participante)}
                      onChange={handleParticipantChange}
                    />
                    <label htmlFor={`para-quienes-${participante}`}>{participante}</label>
                  </div>
                ))}
                {errors.paraQuienes && <span className="error-text">{errors.paraQuienes}</span>}
              </div>

              {/* Foto (opcional) */}
              <div className="input-imagen">
                <label htmlFor="foto">Subí foto del ticket (opcional):</label>
                <input
                  type="file"
                  id="foto"
                  name="foto"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {errors.foto && <span className="error-text">{errors.foto}</span>}
              </div>
            </div>

            <div className="btn-registro">
              <BotonAccion
                texto={isSubmitting ? (gastoEditar ? 'Actualizando...' : 'Agregando...') : (gastoEditar ? 'Actualizar gasto' : 'Sumar gasto')}
                type="submit"
                disabled={isSubmitting || showConfirmation}
              />
            </div>

            <div className="btn-cancelar">
              <button
                className="btn btn-cancel"
                onClick={handleCancel}
                type="button"
                disabled={isSubmitting || showConfirmation}
                title="Cerrar formulario"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
