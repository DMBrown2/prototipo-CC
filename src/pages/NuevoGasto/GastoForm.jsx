//FORM PARA AGREGAR UN GASTO

import Title from '../../components/Title'
import '../../components/Form.css'

import React from 'react'

export default function GastoForm(onClose) {
  return (
<>
<main>
  <Title title="Agregar nuevo gasto" />

  <div className="form-container">
    <form className="form">
      <div className="input-group">
        <div className="input-monto">
          <label htmlFor="monto">Monto: </label>
            <input
                type="number"
                name="monto"
                id="monto"
                placeholder="Monto gastado"
                min={1}
                max={1000000}
              />
          </div>
          
          <div className="input-nombre">
                                <label htmlFor="nombre">Quién pagó? </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    placeholder="Nombre y Apellido"
                                    
                                    minLength={4}
                                    maxLength={120}
                                    pattern="^[a-zA-Z ]+$"
                                    autoComplete=""
                                />
            </div>

            <div className="input-item">
                                <label htmlFor="item"> Qué compraste? </label>
                                <input
                                    type="text"
                                    name="item"
                                    id="item"
                                    placeholder="Item comprado"
                                    
                                    minLength={4}
                                    maxLength={120}
                                    pattern="^[a-zA-Z ]+$"
                                    autoComplete=""
                                />
              </div>
                            
                            
          <div className="input-fecha">
                                <label htmlFor="">Fecha:</label>
                                <input type="date" name="fecha-gasto" />
          </div>
          
          <div className="input-para-quienes">
                                <label htmlFor="clasif">Para quienes?</label>
                                <input
                                    className="input-inline"
                                    id="para-quienes"
                                    type="checkbox"
                                    name="para-quienes"
                                    defaultValue="Sole"
                                />{" "}
                                Sole
                                <input
                                    className="input-inline"
                                    id="para-quienes"
                                    type="checkbox"
                                    name="para-quienes"
                                    defaultValue="Cande"
                                />{" "}
                                Cande
                                
          </div>
                            
        <div className="input-imagen">
                                <label htmlFor="image">Subí foto del ticket:</label>
                                <input type="file" id="image" name="image" accept="image/*" />
                            </div>
                        </div>
        
        <div className="btn-registro">
                            <button className="btn" type="submit">
                                Añadir gasto 
                            </button>
          </div>

          <div className="btn-cancelar">
                            <button className="btn btn-cancel" onClick={onClose}>
                                Cancelar
                            </button>
          </div>



                  </form>
                </div>
            </main>
</>
  )
}
