//FORMULARIO PARA CREAR UNA JUNTADA
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useJuntada } from '../../hooks/useJuntada'
import Title from '../../components/Title'
import BotonAccion from '../../Layout/BotonAccion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import '../../components/Form.css'
import './JuntadaForm.css'

export default function JuntadaForm({ onClose, juntadaEditar = null }) {
  const navigate = useNavigate();
  const { agregarJuntada, actualizarJuntada } = useJuntada();

  const [formData, setFormData] = useState({
    nombre: juntadaEditar?.nombre || '',
    emoji: juntadaEditar?.emoji || '',
    participantes: juntadaEditar?.participantes || []
  });

  const [nuevoParticipante, setNuevoParticipante] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAgregarParticipante = () => {
    if (nuevoParticipante.trim() === '') {
      setErrors(prev => ({
        ...prev,
        participante: 'Ingresa un nombre'
      }));
      return;
    }

    if (formData.participantes.includes(nuevoParticipante)) {
      setErrors(prev => ({
        ...prev,
        participante: 'Este participante ya está agregado'
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      participantes: [...prev.participantes, nuevoParticipante]
    }));
    setNuevoParticipante('');
    setErrors(prev => ({
      ...prev,
      participante: ''
    }));
  };

  const handleQuitarParticipante = (index) => {
    setFormData(prev => ({
      ...prev,
      participantes: prev.participantes.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validar
    const nuevosErrors = {};
    if (!formData.nombre.trim()) {
      nuevosErrors.nombre = 'Ingresa un nombre para la juntada';
    }
    if (formData.participantes.length === 0) {
      nuevosErrors.participantes = 'Suma al menos un participante';
    }

    if (Object.keys(nuevosErrors).length > 0) {
      setErrors(nuevosErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      if (juntadaEditar) {
        actualizarJuntada(juntadaEditar.id, formData);
        if (onClose) onClose();
        else navigate(`/juntada/${juntadaEditar.id}`);
      } else {
        agregarJuntada(formData);
        if (onClose) onClose();
        else navigate('/');
      }
    } catch (error) {
      console.error('Error al guardar juntada:', error);
      setErrors({ general: 'Error al guardar juntada' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onClose) onClose();
    else navigate('/');
  };

  const handleOverlayClick = (e) => {
    // Solo cerrar si hace click exactamente en el overlay, no en el contenido
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  return (
    <div className="juntada-modal-overlay" onClick={handleOverlayClick}>
      <div className="juntada-modal-content">
        <button
          className="btn-cerrar-modal"
          onClick={handleCancel}
          type="button"
          title="Cerrar"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <main>
          <Title title={juntadaEditar ? "Editar juntada" : "Crear nueva juntada"} />

          <div className="form-container">
            {errors.general && <div className="error-message">{errors.general}</div>}

            <form className="form" onSubmit={handleSubmit}>
              <div className="input-group">
                {/* Nombre */}
                <div className="input-nombre">
                  <label htmlFor="nombre">Nombre de la juntada:</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Ej: Semana Santa, Viaje Bariloche, etc."
                    value={formData.nombre}
                    onChange={handleInputChange}
                    maxLength="120"
                    autoComplete="off"
                  />
                  {errors.nombre && <span className="error-text">{errors.nombre}</span>}
                </div>

                {/* Emoji */}
                <div className="input-emoji">
                  <label htmlFor="emoji">Elegí un emoji:</label>
                  <input
                    type="text"
                    id="emoji"
                    name="emoji"
                    placeholder="Elegí un emoji"
                    value={formData.emoji}
                    onChange={handleInputChange}
                    maxLength="2"
                    className="emoji-input"
                  />
                </div>

                {/* Participantes */}
                <div className="input-participantes">
                  <label>Participantes:</label>
                  <div className="participante-input-group">
                    <input
                      type="text"
                      placeholder="Agregá un participante"
                      value={nuevoParticipante}
                      onChange={(e) => setNuevoParticipante(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAgregarParticipante())}
                      maxLength="50"
                    />
                    <button
                      type="button"
                      className="btn-agregar-participante"
                      onClick={handleAgregarParticipante}
                    >
                      + Sumar
                    </button>
                  </div>
                  {errors.participante && <span className="error-text">{errors.participante}</span>}
                  {errors.participantes && <span className="error-text">{errors.participantes}</span>}

                  {/* Lista de participantes */}
                  {formData.participantes.length > 0 && (
                    <div className="participantes-list">
                      {formData.participantes.map((p, index) => (
                        <div key={index} className="participante-item">
                          <span>{p}</span>
                          <button
                            type="button"
                            className="btn-quitar"
                            onClick={() => handleQuitarParticipante(index)}
                            title="Quitar participante"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="btn-registro">
                <BotonAccion
                  signo={juntadaEditar ? '✓' : '+'}
                  texto={isSubmitting ? (juntadaEditar ? 'Actualizando...' : 'Creando...') : (juntadaEditar ? 'Actualizar' : 'Crear juntada')}
                  type="submit"
                  disabled={isSubmitting}
                />
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
