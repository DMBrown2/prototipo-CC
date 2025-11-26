//- Cami debe a Dani $1000
//- Pili debe a Cami $500

//Formula para calcular el saldo de cada participante:

import React from 'react'

export default function DivisionesList() {
  // Datos de ejemplo para entender la estructura
  const divisiones = [
    { deudor: 'Cami', acreedor: 'Dani', monto: 1000 },
    { deudor: 'Pili', acreedor: 'Cami', monto: 500 },
  ];

  return (
    <div className='seccion-divisiones'>
      <h2>Quién le debe a quién</h2>
      {divisiones.map((div, index) => (
        <div key={index} className='division-item'>
          <p><strong>{div.deudor}</strong> debe a <strong>{div.acreedor}</strong>: <span className='monto'>${div.monto}</span></p>
        </div>
      ))}
    </div>
  )
}
