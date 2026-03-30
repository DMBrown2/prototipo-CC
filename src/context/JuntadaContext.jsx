import { createContext, useState, useEffect } from 'react';

export const JuntadaContext = createContext();

const STORAGE_KEY = 'juntadas_data';

export function JuntadaProvider({ children }) {
  const [juntadas, setJuntadas] = useState([
    { 
      id: 1, 
      emoji: "✈️", 
      nombre: "Viaje Europa 2025",
      fechaCreacion: "2025-11-26",
      participantes: ["Pili", "Dani", "Cami", "Sole"],
      gastos: [
        { id: 1, usuario: "Pili", descripcion: "Comida", monto: 1500, fecha: "2025-11-26" },
        { id: 2, usuario: "Sole", descripcion: "Bebida", monto: 3000, fecha: "2025-11-26" }
      ]
    }
  ]);

  // Cargar datos del localStorage al montar el componente
  useEffect(() => {
    const datosGuardados = localStorage.getItem(STORAGE_KEY);
    if (datosGuardados) {
      try {
        setJuntadas(JSON.parse(datosGuardados));
      } catch (error) {
        console.error('Error al cargar datos del localStorage:', error);
      }
    }
  }, []);

  // Guardar datos en localStorage cada vez que juntadas cambia
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(juntadas));
  }, [juntadas]);

  const agregarJuntada = (juntada) => {
    const nuevaJuntada = {
      ...juntada,
      id: Math.max(...juntadas.map(j => j.id), 0) + 1,
      gastos: [],
      fechaCreacion: new Date().toLocaleDateString('es-AR'),
      participantes: juntada.participantes || []
    };
    setJuntadas([...juntadas, nuevaJuntada]);
  };

  const agregarGasto = (juntadaId, gasto) => {
    setJuntadas(juntadas.map(j => 
      j.id === juntadaId 
        ? { ...j, gastos: [...j.gastos, { ...gasto, id: Date.now() }] }
        : j
    ));
  };

  const eliminarGasto = (juntadaId, gastoId) => {
    setJuntadas(juntadas.map(j =>
      j.id === juntadaId
        ? { ...j, gastos: j.gastos.filter(g => g.id !== gastoId) }
        : j
    ));
  };

  const actualizarGasto = (juntadaId, gastoId, gastoActualizado) => {
    setJuntadas(juntadas.map(j =>
      j.id === juntadaId
        ? { 
            ...j, 
            gastos: j.gastos.map(g =>
              g.id === gastoId ? { ...g, ...gastoActualizado } : g
            )
          }
        : j
    ));
  };

  const obtenerJuntada = (id) => {
    return juntadas.find(j => j.id === parseInt(id));
  };

  const eliminarJuntada = (juntadaId) => {
    setJuntadas(juntadas.filter(j => j.id !== juntadaId));
  };

  const actualizarJuntada = (juntadaId, juntadaActualizada) => {
    setJuntadas(juntadas.map(j =>
      j.id === juntadaId
        ? { ...j, ...juntadaActualizada }
        : j
    ));
  };

  return (
    <JuntadaContext.Provider value={{ 
      juntadas, 
      agregarJuntada, 
      agregarGasto,
      eliminarGasto,
      actualizarGasto,
      obtenerJuntada,
      eliminarJuntada,
      actualizarJuntada 
    }}>
      {children}
    </JuntadaContext.Provider>
  );
}