/**
 * Calcula quién le debe a quién basado en los gastos
 * @param {array} gastos - Array de gastos de la juntada
 * @returns {array} Array de deudas simplificado
 */
export const calcularDivisiones = (gastos) => {
  if (!gastos || gastos.length === 0) {
    return [];
  }

  // Objeto para guardar el balance de cada persona (positivo = acreedor, negativo = deudor)
  const balances = {};

  // Procesar cada gasto
  gastos.forEach(gasto => {
    const { usuario, monto, paraQuienes } = gasto;

    // Inicializar el usuario si no existe
    if (!balances[usuario]) {
      balances[usuario] = 0;
    }

    // El usuario que pagó es acreedor del monto total
    balances[usuario] += monto;

    // Si no hay participantes especificados, dividir entre todos
    const participantes = paraQuienes && paraQuienes.length > 0 ? paraQuienes : [];

    if (participantes.length === 0) {
      // Sin participantes especificados, asumimos que es gasto personal
      return;
    }

    // Dividir el monto entre los participantes
    const montoPorPersona = monto / participantes.length;

    // Cada participante debe esta cantidad
    participantes.forEach(participante => {
      if (!balances[participante]) {
        balances[participante] = 0;
      }
      balances[participante] -= montoPorPersona;
    });
  });

  // Convertir balances a deudas
  const deudas = [];

  // Encontrar deudores y acreedores
  const deudores = Object.entries(balances)
    .filter(([, balance]) => balance < 0)
    .map(([nombre, balance]) => ({ nombre, monto: Math.abs(balance) }));

  const acreedores = Object.entries(balances)
    .filter(([, balance]) => balance > 0)
    .map(([nombre, balance]) => ({ nombre, monto: balance }));

  // Simplificar deudas: emparejar deudores con acreedores
  let deudoresRestantes = [...deudores];
  let acreeedoresRestantes = [...acreedores];

  for (let i = 0; i < deudoresRestantes.length; i++) {
    for (let j = 0; j < acreeedoresRestantes.length; j++) {
      if (deudoresRestantes[i] && acreeedoresRestantes[j]) {
        const cantidadATransferir = Math.min(
          deudoresRestantes[i].monto,
          acreeedoresRestantes[j].monto
        );

        if (cantidadATransferir > 0.01) {
          // Mínimo 0.01 para evitar errores de redondeo
          deudas.push({
            deudor: deudoresRestantes[i].nombre,
            acreedor: acreeedoresRestantes[j].nombre,
            monto: parseFloat(cantidadATransferir.toFixed(2))
          });

          deudoresRestantes[i].monto -= cantidadATransferir;
          acreeedoresRestantes[j].monto -= cantidadATransferir;
        }

        if (deudoresRestantes[i].monto < 0.01) {
          deudoresRestantes[i] = null;
        }
        if (acreeedoresRestantes[j].monto < 0.01) {
          acreeedoresRestantes[j] = null;
        }
      }
    }
  }

  // Filtrar nulls y ordenar
  return deudas
    .filter(d => d !== null)
    .sort((a, b) => b.monto - a.monto);
};

/**
 * Obtiene el balance total de cada persona
 * @param {array} gastos - Array de gastos de la juntada
 * @returns {object} Objeto con el balance de cada persona
 */
export const obtenerBalances = (gastos) => {
  if (!gastos || gastos.length === 0) {
    return {};
  }

  const balances = {};

  gastos.forEach(gasto => {
    const { usuario, monto, paraQuienes } = gasto;

    if (!balances[usuario]) {
      balances[usuario] = 0;
    }

    balances[usuario] += monto;

    const participantes = paraQuienes && paraQuienes.length > 0 ? paraQuienes : [];

    if (participantes.length === 0) {
      return;
    }

    const montoPorPersona = monto / participantes.length;

    participantes.forEach(participante => {
      if (!balances[participante]) {
        balances[participante] = 0;
      }
      balances[participante] -= montoPorPersona;
    });
  });

  // Redondear a 2 decimales
  const balancesRedondeados = {};
  Object.entries(balances).forEach(([nombre, balance]) => {
    balancesRedondeados[nombre] = parseFloat(balance.toFixed(2));
  });

  return balancesRedondeados;
};
