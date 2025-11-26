import { createContext, useState } from 'react';

export const JuntadaContext = createContext();

export function JuntadaProvider({ children }) {
  const [juntadas, setJuntadas] = useState([
    { id: 1, emoji: "✈️", nombre: "Viaje Europa 2025", gastos: [] }
  ]);

  const agregarJuntada = (juntada) => {
    setJuntadas([...juntadas, { ...juntada, id: Date.now(), gastos: [] }]);
  };

  return (
    <JuntadaContext.Provider value={{ juntadas, agregarJuntada }}>
      {children}
    </JuntadaContext.Provider>
  );
}