import { useContext } from 'react';
import { JuntadaContext } from '../context/JuntadaContext';

export function useJuntada() {
  const context = useContext(JuntadaContext);
  if (!context) {
    throw new Error('useJuntada debe usarse dentro de JuntadaProvider');
  }
  return context;
}
