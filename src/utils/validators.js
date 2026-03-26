// Validadores para los formularios

/**
 * Valida que un monto sea un número positivo
 * @param {string|number} monto - El monto a validar
 * @returns {object} { isValid: boolean, error: string }
 */
export const validarMonto = (monto) => {
  if (!monto || monto === '') {
    return { isValid: false, error: 'El monto es requerido' };
  }
  
  const montoNum = parseFloat(monto);
  if (isNaN(montoNum)) {
    return { isValid: false, error: 'El monto debe ser un número' };
  }
  
  if (montoNum <= 0) {
    return { isValid: false, error: 'El monto debe ser mayor a 0' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Valida que un nombre contenga solo letras y espacios
 * @param {string} nombre - El nombre a validar
 * @returns {object} { isValid: boolean, error: string }
 */
export const validarNombre = (nombre) => {
  if (!nombre || nombre === '') {
    return { isValid: false, error: 'El nombre es requerido' };
  }
  
  if (nombre.length < 2) {
    return { isValid: false, error: 'El nombre debe tener al menos 2 caracteres' };
  }
  
  // Solo letras, espacios, acentos y punto de apoyo de ñ
  const regex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/;
  if (!regex.test(nombre)) {
    return { isValid: false, error: 'El nombre solo puede contener letras' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Valida que una descripción no esté vacía
 * @param {string} descripcion - La descripción a validar
 * @returns {object} { isValid: boolean, error: string }
 */
export const validarDescripcion = (descripcion) => {
  if (!descripcion || descripcion === '') {
    return { isValid: false, error: 'La descripción es requerida' };
  }
  
  if (descripcion.length < 2) {
    return { isValid: false, error: 'La descripción debe tener al menos 2 caracteres' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Valida que al menos un participante esté seleccionado
 * @param {array} participants - Array de participantes seleccionados
 * @returns {object} { isValid: boolean, error: string }
 */
export const validarParticipantes = (participants) => {
  if (!participants || participants.length === 0) {
    return { isValid: false, error: 'Selecciona al menos un participante' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Valida una fecha (es opcional, pero si se proporciona debe ser válida)
 * @param {string} fecha - La fecha a validar (formato YYYY-MM-DD)
 * @returns {object} { isValid: boolean, error: string }
 */
export const validarFecha = (fecha) => {
  if (!fecha || fecha === '') {
    // La fecha es opcional
    return { isValid: true, error: '' };
  }
  
  const fechaObj = new Date(fecha);
  if (isNaN(fechaObj.getTime())) {
    return { isValid: false, error: 'La fecha no es válida' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Valida un archivo de imagen (es opcional, pero si se proporciona debe ser una imagen)
 * @param {File} file - El archivo a validar
 * @returns {object} { isValid: boolean, error: string }
 */
export const validarFoto = (file) => {
  if (!file) {
    // La foto es opcional
    return { isValid: true, error: '' };
  }
  
  const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!tiposPermitidos.includes(file.type)) {
    return { isValid: false, error: 'Solo se permiten imágenes (JPEG, PNG, GIF, WebP)' };
  }
  
  // Máximo 5MB
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return { isValid: false, error: 'La imagen no puede ser mayor a 5MB' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Valida todo el formulario de gasto
 * @param {object} formData - Datos del formulario completo
 * @returns {object} { isValid: boolean, errors: object }
 */
export const validarFormularioGasto = (formData) => {
  const errors = {};
  
  const validacionMonto = validarMonto(formData.monto);
  if (!validacionMonto.isValid) errors.monto = validacionMonto.error;
  
  const validacionUsuario = validarNombre(formData.usuario);
  if (!validacionUsuario.isValid) errors.usuario = validacionUsuario.error;
  
  const validacionDescripcion = validarDescripcion(formData.descripcion);
  if (!validacionDescripcion.isValid) errors.descripcion = validacionDescripcion.error;
  
  const validacionParticipantes = validarParticipantes(formData.paraQuienes);
  if (!validacionParticipantes.isValid) errors.paraQuienes = validacionParticipantes.error;
  
  const validacionFecha = validarFecha(formData.fecha);
  if (!validacionFecha.isValid) errors.fecha = validacionFecha.error;
  
  const validacionFoto = validarFoto(formData.foto);
  if (!validacionFoto.isValid) errors.foto = validacionFoto.error;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
