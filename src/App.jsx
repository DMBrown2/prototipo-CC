import {Routes, Route} from 'react-router-dom'
import Main from './Layout/Main'
import Index from './pages/Inicio/Index'
import Juntada from './pages/Juntada/Juntada'
import JuntadaForm from './pages/NuevaJuntada/JuntadaForm'
import GastoForm from './pages/NuevoGasto/GastoForm'
import FotoForm from './pages/NuevaFoto/FotoForm'
import ResumenSaldo from './pages/ResumenSaldo/ResumenSaldos'
import { JuntadaProvider } from './context/JuntadaContext'



function App() {

  return (
    <JuntadaProvider>

    <Routes>
    <Route path="/" element={<Main />} />
    <Route index element={<Index />} />
    {/* Juntada y sus sub-rutas para las diferentes secciones */}
    <Route path="/juntada/:id/*" element={<Juntada />} />
    <Route path="/nueva-juntada" element={<JuntadaForm />} />
    <Route path="/nuevo-gasto" element={<GastoForm />} />
    <Route path="/nueva-foto" element={<FotoForm />} />
    <Route path="/resumen-saldo" element={<ResumenSaldo />} />
    <Route path="*" element={<h1>404 Not Found</h1>} />
  </Routes>
  
  </JuntadaProvider>
  
  )
}

export default App
