# 📋 Sugerencias de Mejora para tu App de División de Gastos

¡Excelente que estés aprendiendo! Aquí tienes algunas sugerencias que te ayudarán a mejorar tu aplicación:

---

## 🎯 1. **Gestión de Estado Global (Context API)**

**Problema actual:** Los datos de juntadas, gastos, etc., están hardcodeados.

**Solución:** Crea un Context para compartir datos entre componentes sin pasar props manualmente.

```jsx
// src/context/JuntadaContext.jsx
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
```

Luego envuelve tu App:
```jsx
// src/App.jsx
<JuntadaProvider>
  <Routes>...</Routes>
</JuntadaProvider>
```

---

## 🔄 2. **Hook Personalizado para Juntadas**

Crea un hook para acceder al Context de forma más limpia:

```jsx
// src/hooks/useJuntada.js
import { useContext } from 'react';
import { JuntadaContext } from '../context/JuntadaContext';

export function useJuntada() {
  const context = useContext(JuntadaContext);
  if (!context) {
    throw new Error('useJuntada debe ser usado dentro de JuntadaProvider');
  }
  return context;
}
```

---

## 📁 3. **Estructura de Carpetas Recomendada**

```
src/
├── components/       # Componentes reutilizables
├── pages/           # Páginas principales (rutas)
├── context/         # Context API para estado global
├── hooks/           # Hooks personalizados
├── utils/           # Funciones auxiliares
├── assets/          # Imágenes, iconos, etc.
├── Layout/          # Componentes de diseño (Header, Footer, NavBar)
├── styles/          # Estilos globales
└── App.jsx
```

---

## 📊 4. **Estructura de Datos Recomendada**

```javascript
// Una juntada debería verse así:
{
  id: 1,
  emoji: "✈️",
  nombre: "Viaje Europa 2025",
  fechaCreacion: "2025-11-26",
  participantes: ["Pili", "Dani", "Cami", "Sole"],
  gastos: [
    {
      id: 1,
      usuario: "Pili",
      descripcion: "Comida",
      monto: 1500,
      fecha: "2025-11-26",
      categoria: "comida"
    }
  ]
}

// Así calcularías las divisiones:
function calcularDivisiones(gastos) {
  const totales = {};
  
  gastos.forEach(gasto => {
    if (!totales[gasto.usuario]) {
      totales[gasto.usuario] = 0;
    }
    totales[gasto.usuario] += gasto.monto;
  });

  const promedio = Object.values(totales).reduce((a, b) => a + b, 0) / Object.keys(totales).length;
  
  return Object.entries(totales).map(([usuario, total]) => ({
    usuario,
    gasto: total,
    debe: total - promedio,
    monto: Math.abs(total - promedio)
  }));
}
```

---

## ✅ 5. **Validación de Formularios**

Crea funciones de validación reutilizables:

```jsx
// src/utils/validators.js
export function validarGasto(gasto) {
  const errores = {};
  
  if (!gasto.usuario || gasto.usuario.trim() === '') {
    errores.usuario = 'El usuario es requerido';
  }
  
  if (!gasto.monto || gasto.monto <= 0) {
    errores.monto = 'El monto debe ser mayor a 0';
  }
  
  if (!gasto.descripcion || gasto.descripcion.trim() === '') {
    errores.descripcion = 'La descripción es requerida';
  }
  
  return {
    esValido: Object.keys(errores).length === 0,
    errores
  };
}
```

---

## 🎨 6. **Estilos Globales**

Crea un archivo de variables CSS globales:

```css
/* src/styles/variables.css */
:root {
  --primary-color: #FF6B6B;
  --secondary-color: #4ECDC4;
  --terciary-color: #FFE66D;
  --text-color: #2C3E50;
  --background-color: #F8F9FA;
  --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --border-radius: 8px;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --spacing-small: 8px;
  --spacing-medium: 16px;
  --spacing-large: 24px;
}

* {
  box-sizing: border-box;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: var(--font-family);
}
```

---

## 🔐 7. **Manejo de Errores**

Crea un componente para mostrar errores:

```jsx
// src/components/ErrorBoundary.jsx
import React from 'react';

export default function ErrorBoundary({ children }) {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleError = (err) => {
    setHasError(true);
    setError(err);
  };

  if (hasError) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Algo salió mal</h2>
        <p>{error?.message}</p>
      </div>
    );
  }

  return children;
}
```

---

## 💾 8. **Almacenamiento Local (localStorage)**

Para persistir datos entre sesiones:

```jsx
// Guardar
localStorage.setItem('juntadas', JSON.stringify(juntadas));

// Cargar
const juntadasGuardadas = JSON.parse(localStorage.getItem('juntadas')) || [];
```

---

## 🚀 9. **Próximos Pasos**

1. **Implementar Context API** para manejar el estado global
2. **Crear formularios controlados** en `GastoForm.jsx` y `JuntadaForm.jsx`
3. **Agregar validaciones** antes de guardar datos
4. **Implementar localStorage** para persistencia
5. **Mejorar los estilos** con CSS modules o styled-components
6. **Agregar animaciones** para mejorar UX

---

## 📚 Recursos Útiles

- [React Context API](https://react.dev/reference/react/useContext)
- [React Router v7](https://reactrouter.com/)
- [Web Storage API](https://developer.mozilla.org/es/docs/Web/API/Web_Storage_API)
