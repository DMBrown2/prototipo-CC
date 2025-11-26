# 🧪 Guía de Pruebas y Debugging

## 🚀 Cómo Probar tu App Paso a Paso

### Paso 1: Inicia el servidor de desarrollo
```bash
npm run dev
```

Deberías ver algo como:
```
  VITE v7.0.4  ready in 456 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Abre tu navegador en `http://localhost:5173/`

---

### Paso 2: Prueba la Página de Inicio
✅ **Deberías ver:**
- Título: "Bienvenid@ a Cuentas claras mantienen la amistad"
- Una juntada: "✈️ Viaje Europa 2025"
- Botón: "Agregar nueva juntada"

✅ **Prueba haciendo clic en la juntada**
- La URL debería cambiar a: `http://localhost:5173/juntada/1`

---

### Paso 3: Prueba la Página de Juntada
✅ **Deberías ver:**
- Título: "✈️ Viaje Europa 2025"
- NavBar con 3 opciones: **Gastos | Divisiones | Fotos tickets**
- El item "Gastos" debe estar **resaltado** (con fondo y texto diferente)
- La sección de "Gastos" debe estar visible

✅ **Si no está resaltado:**
1. Abre las herramientas de desarrollo (F12)
2. Ve a la pestaña "Elements"
3. Busca el item "Gastos"
4. ¿Tiene la clase `active`?
   ```html
   <li class="nav-item active">Gastos</li>  ← Correcto
   <li class="nav-item">Gastos</li>         ← Incorrecto
   ```

---

### Paso 4: Prueba Navegar entre Secciones

#### Haz clic en "Divisiones"
✅ **URL debería cambiar a:** `http://localhost:5173/juntada/1/divisiones`

✅ **Deberías ver:**
- El item "Divisiones" está resaltado
- La sección muestra "Quién le debe a quién"
- Aparecen las divisiones (Cami debe a Dani, etc.)

#### Haz clic en "Fotos tickets"
✅ **URL debería cambiar a:** `http://localhost:5173/juntada/1/fotos`

✅ **Deberías ver:**
- El item "Fotos tickets" está resaltado
- La sección muestra "Fotos de tickets"
- Aparecen las fotos de ejemplo (🍕, 🍻)
- Hay un botón "Agregar foto"

#### Vuelve a hacer clic en "Gastos"
✅ **URL debería cambiar a:** `http://localhost:5173/juntada/1/gastos`

✅ **Deberías ver:**
- El item "Gastos" está nuevamente resaltado
- Aparece la sección de gastos

---

## 🐛 Troubleshooting (Solución de Problemas)

### Problema 1: El NavBar no se actualiza cuando cambio de sección

**Posible causa:** React no está detectando el cambio de URL

**Solución:**
1. Verifica que `NavBar.jsx` use `useLocation`:
   ```jsx
   const location = useLocation();
   ```

2. En la consola del navegador (F12), escribe:
   ```javascript
   // Debería mostrar la URL actual
   window.location.pathname
   ```

3. Verifica que la URL contiene lo esperado:
   ```javascript
   // Si estás en divisiones, debería incluir "divisiones"
   window.location.pathname.includes('/divisiones')  // true o false
   ```

---

### Problema 2: El NavBar no está resaltado pero la URL es correcta

**Posible causa:** El CSS no está siendo aplicado correctamente

**Solución:**
1. Abre las herramientas de desarrollo (F12)
2. Ve a la pestaña "Elements"
3. Selecciona el elemento "Gastos"
4. Mira si tiene la clase `active`:
   ```html
   <li class="nav-item active">Gastos</li>
   ```

5. En el panel derecho, mira los estilos CSS aplicados
6. Busca `.nav-item.active` y verifica que tenga:
   ```css
   .nav-item.active {
     background-color: var(--secondary-color);
     font-weight: bold;
     color: red;
   }
   ```

7. Si no aparece, asegúrate que `NavBar.css` esté importado:
   ```jsx
   import './NavBar.css'
   ```

---

### Problema 3: El componente no cambia cuando navego

**Posible causa:** `getSection()` no está detectando la URL correctamente

**Solución:**
1. Abre `Juntada.jsx`
2. Agrega esto temporalmente para debuggear:
   ```jsx
   const getSection = () => {
     const pathname = window.location.pathname;
     console.log('Ruta actual:', pathname);  // ← Mira la consola (F12)
     console.log('¿Divisiones?', pathname.includes('/divisiones'));
     console.log('¿Fotos?', pathname.includes('/fotos'));
     
     if (pathname.includes('/divisiones')) return 'divisiones';
     if (pathname.includes('/fotos')) return 'fotos';
     return 'gastos';
   };
   ```

3. Abre la consola (F12 → Console)
4. Haz clic en las secciones y observa los logs
5. Verifica que la URL se muestre correctamente

---

### Problema 4: El componente está vacío o muestra "404"

**Posible causa:** Las rutas en `App.jsx` no están correctas

**Solución:**
1. Verifica que `App.jsx` tenga:
   ```jsx
   <Route path="/juntada/:id/*" element={<Juntada />} />
   //                      ↑ El asterisco es importante
   ```

2. Recarga la página (Ctrl + F5)
3. Verifica la consola por errores

---

## 📊 Checklist de Validación

Usa esta lista para verificar que todo funciona:

- [ ] La página de inicio carga correctamente
- [ ] Puedo hacer clic en una juntada
- [ ] La URL cambia a `/juntada/1`
- [ ] Se muestra la página Juntada.jsx
- [ ] El NavBar aparece con 3 opciones
- [ ] El item "Gastos" está resaltado
- [ ] Se muestra el componente GastosList
- [ ] Puedo hacer clic en "Divisiones"
- [ ] La URL cambia a `/juntada/1/divisiones`
- [ ] El item "Divisiones" está resaltado
- [ ] Se muestra el componente DivisionesList
- [ ] Puedo hacer clic en "Fotos tickets"
- [ ] La URL cambia a `/juntada/1/fotos`
- [ ] El item "Fotos tickets" está resaltado
- [ ] Se muestra el componente FotosList
- [ ] El botón "Volver a inicio" funciona
- [ ] Puedo navegar entre secciones sin problemas

---

## 🔍 Comandos Útiles en la Consola (F12)

```javascript
// Ver la URL actual
window.location.pathname

// Ver si contiene una palabra específica
window.location.pathname.includes('/divisiones')

// Ver todos los elementos con clase "active"
document.querySelectorAll('.active')

// Ver los estilos aplicados a un elemento
const item = document.querySelector('.nav-item.active');
window.getComputedStyle(item)
```

---

## 💡 Tips para Debugging

1. **Abre las herramientas de desarrollo siempre (F12)**
   - Ve a la pestaña "Console" para ver errores
   - Ve a la pestaña "Network" para ver las solicitudes

2. **Usa `console.log()` para debuggear:**
   ```jsx
   const getSection = () => {
     const pathname = window.location.pathname;
     console.log('URL:', pathname);  // ← Verás esto en F12 → Console
     ...
   };
   ```

3. **Recarga la página si no ves cambios (Ctrl + F5)**

4. **Limpia el cache si nada funciona:**
   - Abre DevTools (F12)
   - Haz clic derecho en el botón "Recargar"
   - Selecciona "Vaciar caché y recargar"

---

¡Espero que esto te ayude! Si hay problemas, usa esta guía para identificarlos. 🚀
