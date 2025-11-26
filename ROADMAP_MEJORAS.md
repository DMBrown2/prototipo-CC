# 🎯 Mejoras Futuras - Roadmap para tu App

## Fase 1: Fundamentos (Ya está hecho ✅)
- [x] Estructura básica de rutas
- [x] Navegación entre secciones
- [x] Componentes visuales para cada sección
- [x] NavBar con indicación de sección activa

---

## Fase 2: Gestión de Estado (PRÓXIMA 🔜)

### 2.1 - Context API para Juntadas
Crea un archivo `src/context/JuntadaContext.jsx`:

```jsx
import { createContext, useState } from 'react';

export const JuntadaContext = createContext();

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

  const agregarJuntada = (juntada) => {
    const nuevaJuntada = {
      ...juntada,
      id: Math.max(...juntadas.map(j => j.id), 0) + 1,
      gastos: [],
      fechaCreacion: new Date().toLocaleDateString()
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

  const obtenerJuntada = (id) => {
    return juntadas.find(j => j.id === parseInt(id));
  };

  return (
    <JuntadaContext.Provider value={{ 
      juntadas, 
      agregarJuntada, 
      agregarGasto, 
      obtenerJuntada 
    }}>
      {children}
    </JuntadaContext.Provider>
  );
}
```

Luego en `App.jsx`:
```jsx
import { JuntadaProvider } from './context/JuntadaContext';

function App() {
  return (
    <JuntadaProvider>
      <Routes>
        {/* rutas aquí */}
      </Routes>
    </JuntadaProvider>
  );
}
```

### 2.2 - Hook Personalizado para usar el Context
Crea `src/hooks/useJuntada.js`:

```jsx
import { useContext } from 'react';
import { JuntadaContext } from '../context/JuntadaContext';

export function useJuntada() {
  const context = useContext(JuntadaContext);
  if (!context) {
    throw new Error('useJuntada debe usarse dentro de JuntadaProvider');
  }
  return context;
}
```

Úsalo en los componentes:
```jsx
import { useJuntada } from '../hooks/useJuntada';

export default function GastosList() {
  const { obtenerJuntada } = useJuntada();
  const { id } = useParams();
  const juntada = obtenerJuntada(id);
  
  return (
    <div>
      {juntada?.gastos.map(gasto => (
        <p key={gasto.id}>{gasto.usuario} gastó ${gasto.monto}</p>
      ))}
    </div>
  );
}
```

---

## Fase 3: Formularios Controlados 📝

### 3.1 - Mejorar GastoForm.jsx
```jsx
import { useState } from 'react';
import { useJuntada } from '../hooks/useJuntada';
import { useParams } from 'react-router-dom';

export default function GastoForm({ onClose }) {
  const { agregarGasto } = useJuntada();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    usuario: '',
    descripcion: '',
    monto: ''
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const nuevoErrores = {};
    
    if (!formData.usuario.trim()) {
      nuevoErrores.usuario = 'El usuario es requerido';
    }
    
    if (!formData.descripcion.trim()) {
      nuevoErrores.descripcion = 'La descripción es requerida';
    }
    
    if (!formData.monto || parseFloat(formData.monto) <= 0) {
      nuevoErrores.monto = 'El monto debe ser mayor a 0';
    }
    
    return nuevoErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nuevoErrores = validarFormulario();
    
    if (Object.keys(nuevoErrores).length > 0) {
      setErrores(nuevoErrores);
      return;
    }
    
    agregarGasto(parseInt(id), {
      ...formData,
      monto: parseFloat(formData.monto),
      fecha: new Date().toLocaleDateString()
    });
    
    // Limpiar formulario y cerrar
    setFormData({ usuario: '', descripcion: '', monto: '' });
    onClose();
  };

  return (
    <div className='modal-overlay'>
      <form className='gasto-form' onSubmit={handleSubmit}>
        <h2>Agregar nuevo gasto</h2>
        
        <div className='form-group'>
          <label htmlFor='usuario'>Usuario:</label>
          <input
            type='text'
            id='usuario'
            name='usuario'
            value={formData.usuario}
            onChange={handleChange}
            className={errores.usuario ? 'error' : ''}
          />
          {errores.usuario && <span className='error-msg'>{errores.usuario}</span>}
        </div>

        <div className='form-group'>
          <label htmlFor='descripcion'>Descripción:</label>
          <input
            type='text'
            id='descripcion'
            name='descripcion'
            value={formData.descripcion}
            onChange={handleChange}
            className={errores.descripcion ? 'error' : ''}
          />
          {errores.descripcion && <span className='error-msg'>{errores.descripcion}</span>}
        </div>

        <div className='form-group'>
          <label htmlFor='monto'>Monto:</label>
          <input
            type='number'
            id='monto'
            name='monto'
            value={formData.monto}
            onChange={handleChange}
            step='0.01'
            className={errores.monto ? 'error' : ''}
          />
          {errores.monto && <span className='error-msg'>{errores.monto}</span>}
        </div>

        <div className='form-buttons'>
          <button type='submit' className='btn-guardar'>Guardar gasto</button>
          <button type='button' className='btn-cancelar' onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
```

---

## Fase 4: Cálculo de Divisiones 💰

### 4.1 - Crear función de cálculo
```jsx
// src/utils/calcularDivisiones.js

export function calcularDivisiones(gastos) {
  if (gastos.length === 0) return [];

  // Calcular total gastado por cada persona
  const totalPorPersona = {};
  gastos.forEach(gasto => {
    totalPorPersona[gasto.usuario] = (totalPorPersona[gasto.usuario] || 0) + gasto.monto;
  });

  // Calcular el promedio
  const participantes = Object.keys(totalPorPersona);
  const totalGastos = Object.values(totalPorPersona).reduce((a, b) => a + b, 0);
  const promedio = totalGastos / participantes.length;

  // Calcular cuánto debe cada uno
  const divisiones = [];
  participantes.forEach(persona => {
    const balance = totalPorPersona[persona] - promedio;
    if (Math.abs(balance) > 0.01) { // Evitar errores de redondeo
      divisiones.push({
        persona,
        gasto: totalPorPersona[persona],
        balance,
        debe: balance < 0 ? Math.abs(balance) : 0,
        acreedor: balance > 0 ? Math.abs(balance) : 0
      });
    }
  });

  return divisiones;
}

// Función para mostrar "quién le debe a quién"
export function generarDeudas(divisiones) {
  const deudores = divisiones.filter(d => d.debe > 0);
  const acreedores = divisiones.filter(d => d.acreedor > 0);
  
  const deudas = [];
  
  for (let d of deudores) {
    for (let a of acreedores) {
      if (d.debe > 0 && a.acreedor > 0) {
        const monto = Math.min(d.debe, a.acreedor);
        deudas.push({
          deudor: d.persona,
          acreedor: a.persona,
          monto
        });
        d.debe -= monto;
        a.acreedor -= monto;
      }
    }
  }
  
  return deudas;
}
```

### 4.2 - Usar en DivisionesList.jsx
```jsx
import { useParams } from 'react-router-dom';
import { useJuntada } from '../hooks/useJuntada';
import { calcularDivisiones, generarDeudas } from '../utils/calcularDivisiones';

export default function DivisionesList() {
  const { id } = useParams();
  const { obtenerJuntada } = useJuntada();
  const juntada = obtenerJuntada(id);
  
  if (!juntada) return <div>Juntada no encontrada</div>;
  
  const deudas = generarDeudas(calcularDivisiones(juntada.gastos));

  return (
    <div className='seccion-divisiones'>
      <h2>Quién le debe a quién</h2>
      {deudas.length === 0 ? (
        <p>Las cuentas están claras 🎉</p>
      ) : (
        <ul>
          {deudas.map((deuda, index) => (
            <li key={index}>
              <strong>{deuda.deudor}</strong> le debe <strong>${deuda.monto.toFixed(2)}</strong> a <strong>{deuda.acreedor}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## Fase 5: Almacenamiento Local 💾

### 5.1 - Guardar y cargar datos
```jsx
// En JuntadaContext.jsx

useEffect(() => {
  // Cargar datos al iniciar
  const juntadasGuardadas = localStorage.getItem('juntadas');
  if (juntadasGuardadas) {
    setJuntadas(JSON.parse(juntadasGuardadas));
  }
}, []);

useEffect(() => {
  // Guardar datos cuando cambien
  localStorage.setItem('juntadas', JSON.stringify(juntadas));
}, [juntadas]);
```

---

## Fase 6: Mejoras de UX 🎨

### 6.1 - Validaciones mejoradas
- Mensaje de error en tiempo real
- Estilos visuales para campos inválidos
- Botón guardar deshabilitado si hay errores

### 6.2 - Modales y notificaciones
- Modal para confirmar eliminar
- Toast notifications para feedback
- Transiciones suaves

### 6.3 - Responsive Design
- Mobile-first approach
- Media queries para tablet/desktop
- Menú hamburguesa en móvil

---

## Prioridad de Implementación

1. **CRÍTICA** (Implementa primero):
   - Context API para Juntadas
   - Formularios controlados
   - Validaciones

2. **IMPORTANTE** (Implementa después):
   - Cálculo automático de divisiones
   - localStorage para persistencia

3. **NICE TO HAVE** (Implementa último):
   - Mejoras de UX
   - Responsive design
   - Animaciones

---

¡Cada fase te ayudará a entender mejor React y buenas prácticas! 🚀
