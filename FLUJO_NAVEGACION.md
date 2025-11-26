# 🗺️ Explicación Didáctica: Cómo Funciona la Navegación en tu App

## El Flujo de Navegación Paso a Paso

### 1️⃣ **El Usuario Entra a la App**
```
URL: http://localhost:5173/
↓
App.jsx detecta la ruta "/" 
↓
Se renderiza el componente Main (que contiene Index.jsx)
```

---

### 2️⃣ **El Usuario ve la página de Inicio**
```jsx
// Index.jsx muestra:
- Título "Bienvenid@..."
- Lista de Juntadas (ej: "✈️ Viaje Europa 2025")
- Botón "Agregar nueva juntada"
```

---

### 3️⃣ **El Usuario Hace Clic en una Juntada**
```jsx
// En Index.jsx
const irAJuntada = (id) => {
  navigate(`/juntada/${id}`);  // ← Navega a /juntada/1
}

<JuntadasList 
  onClick={() => irAJuntada(j.id)}  // ← Cuando haces clic
  {...}
/>
```

**URL cambia a:** `http://localhost:5173/juntada/1`

---

### 4️⃣ **Se Renderiza la Página Juntada.jsx**
```jsx
// App.jsx:
<Route path="/juntada/:id/*" element={<Juntada />} />
//                      ↑
//        El * permite sub-rutas dentro de /juntada/:id
```

**En Juntada.jsx:**
```jsx
const { id } = useParams();  // ← Obtiene el id (en este caso: 1)
```

---

### 5️⃣ **Aparece el NavBar con Gastos Seleccionado**

**¿Cómo funciona?**

```jsx
// En NavBar.jsx:
const location = useLocation();  // ← Obtiene la URL actual
const { id } = useParams();      // ← Obtiene el id de la juntada

const isGastos = location.pathname.includes('/gastos') || 
                 location.pathname === `/juntada/${id}`;
//                                      ↑
//        Si estamos en /juntada/1 (sin subsección), 
//        isGastos es TRUE y se marca como activo

<li className={`nav-item${isGastos ? ' active' : ''}`}>
  Gastos
</li>
```

**¿Por qué funciona?**
- Cuando entras a `/juntada/1`, la condición `location.pathname === /juntada/1` es VERDADERA
- Entonces `isGastos = true`
- La clase `.active` se agrega al elemento
- El CSS `.nav-item.active` le da estilos especiales

---

### 6️⃣ **Se Muestra el Componente de Gastos**

**En Juntada.jsx:**
```jsx
const getSection = () => {
  const pathname = window.location.pathname;
  if (pathname.includes('/divisiones')) return 'divisiones';
  if (pathname.includes('/fotos')) return 'fotos';
  return 'gastos';  // ← Devuelve 'gastos' por defecto
};

const currentSection = getSection();  // currentSection = 'gastos'

const renderSection = () => {
  switch(currentSection) {
    case 'divisiones':
      return <DivisionesList />;
    case 'fotos':
      return <FotosList />;
    case 'gastos':
    default:
      return <GastosList />;  // ← Se renderiza GastosList
  }
};
```

---

### 7️⃣ **El Usuario Hace Clic en "Divisiones"**

```jsx
// En NavBar.jsx:
const irADivisiones = () => {
  navigate(`/juntada/${id}/divisiones`);  // ← Navega a /juntada/1/divisiones
}

<li onClick={irADivisiones}>
  Divisiones
</li>
```

**URL cambia a:** `http://localhost:5173/juntada/1/divisiones`

---

### 8️⃣ **Se Actualiza Todo Automáticamente**

```jsx
// NavBar.jsx detecta el cambio de URL:
const isDivisiones = location.pathname.includes('/divisiones');  // ← TRUE ahora
// La clase .active se aplica a "Divisiones"

// Juntada.jsx detecta el cambio de URL:
const getSection = () => {
  if (pathname.includes('/divisiones')) return 'divisiones';  // ← Ahora devuelve 'divisiones'
  ...
}

const renderSection = () => {
  switch(currentSection) {
    case 'divisiones':
      return <DivisionesList />;  // ← Se renderiza DivisionesList
    ...
  }
}
```

---

## 📊 Diagrama Visual del Flujo

```
┌─────────────────┐
│  Usuario abre   │
│   la app en /   │
└────────┬────────┘
         ↓
┌─────────────────────────────┐
│ Se muestra Index.jsx        │
│ (Lista de juntadas)         │
└────────┬────────────────────┘
         │ (Usuario hace clic en una juntada)
         ↓
┌─────────────────────────────────────┐
│ URL: /juntada/1                     │
│ Se renderiza Juntada.jsx            │
│ → NavBar (Gastos marcado)           │
│ → GastosList (componente por defecto)
└────────┬─────────────────────────────┘
         │ (Usuario hace clic en "Divisiones")
         ↓
┌───────────────────────────────────────┐
│ URL: /juntada/1/divisiones            │
│ Se renderiza Juntada.jsx (mismo)      │
│ → NavBar (Divisiones marcado)         │
│ → DivisionesList (componente cambiado)│
└───────────────────────────────────────┘
```

---

## 🔑 Conceptos Clave

### `useParams()`
Extrae parámetros de la URL:
```jsx
const { id } = useParams();  // Si estás en /juntada/1, id = "1"
```

### `useLocation()`
Te dice en qué URL estás actualmente:
```jsx
const location = useLocation();
console.log(location.pathname);  // "/juntada/1/divisiones"
```

### `useNavigate()`
Te permite cambiar la URL programáticamente:
```jsx
const navigate = useNavigate();
navigate(`/juntada/${id}/gastos`);  // Cambia la URL
```

---

## ✅ Resumen de lo que Implementamos

| Acción | Código | Resultado |
|--------|--------|-----------|
| Usuario entra a juntada | `/juntada/1` | Se muestra Gastos por defecto |
| Usuario hace clic en NavBar | `irAGastos()` | URL: `/juntada/1/gastos` |
| Usuario hace clic en Divisiones | `irADivisiones()` | URL: `/juntada/1/divisiones` |
| NavBar detecta URL | `isGastos = location.pathname...` | Aplica clase `.active` |
| Juntada.jsx detecta URL | `getSection()` | Renderiza el componente correcto |

---

## 🎓 Ejercicio para Practicar

Intenta lo siguiente:

1. **Modifica el título dinámico** en Juntada.jsx para que muestre el nombre de la juntada:
   ```jsx
   // Actualmente es hardcodeado:
   <Title title="✈️ Viaje Europa 2025" />
   
   // Debería obtenerlo de los datos o parámetros
   ```

2. **Agrega más opciones al NavBar** (ej: "Resumen de Saldos")

3. **Intenta agregar estilos CSS** para que el item activo se destaque más

---

¡Espero que esto te ayude a entender mejor cómo funciona todo! 🚀
