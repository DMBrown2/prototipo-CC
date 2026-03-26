//- Cami debe a Dani $1000
//- Pili debe a Cami $500

//Formula para calcular el saldo de cada participante:

import React from 'react'
import { useParams } from 'react-router-dom'
import { useJuntada } from '../hooks/useJuntada'
import { calcularDivisiones, obtenerBalances } from '../utils/calcularDivisiones'
import './DivisionesList.css'

export default function DivisionesList() {
  const { id: juntadaId } = useParams();
  const { obtenerJuntada } = useJuntada();
  const juntada = obtenerJuntada(juntadaId);

  if (!juntada) {
    return <div className='seccion-divisiones'>Juntada no encontrada</div>;
  }

  const gastos = juntada.gastos || [];
  const divisiones = calcularDivisiones(gastos);
  const balances = obtenerBalances(gastos);

  return (
    <div className='seccion-divisiones'>
      {/* Resumen de saldos */}
      {Object.keys(balances).length > 0 && (
        <div className="balances-summary">
          <h3>Resumen de saldos:</h3>
          <div className="balances-grid">
            {Object.entries(balances).map(([persona, balance]) => (
              <div key={persona} className={`balance-card ${balance > 0 ? 'acreedor' : balance < 0 ? 'deudor' : 'cero'}`}>
                <span className="persona-nombre">{persona}</span>
                <span className={`balance-monto ${balance > 0 ? 'positivo' : balance < 0 ? 'negativo' : ''}`}>
                  {balance > 0 ? '+' : ''} ${balance.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deudas detalladas */}
      <div className="divisiones-detalle">
        <h3>Quién le debe a quién:</h3>
        {divisiones.length > 0 ? (
          <div className="divisiones-list">
            {divisiones.map((div, index) => (
              <div key={index} className='division-item'>
                <div className="division-texto">
                  <span className="deudor">{div.deudor}</span>
                  <span className="flecha">→</span>
                  <span className="acreedor">{div.acreedor}</span>
                </div>
                <span className='monto'>${div.monto.toFixed(2)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="sin-divisiones">✅ ¡Todo en orden! No hay deudas pendientes.</p>
        )}
      </div>
    </div>
  )
}
