import Main from "../../Layout/Main"
import Button from "../../Layout/BotonAccion"
import Footer from "../../Layout/Footer"
import Title from "../../components/Title"
import JuntadasList from "../../components/JuntadasList"
import { useNavigate } from "react-router-dom"
import './Index.css'
import '../../styles/styles.css'




//HEADER
//MAIN (LISTA DE JUNTADAS  - JuntadaList.jsx)

//BOTON NUEVA JUNTADA (JUntadaForm.jsx)

//FOOTER

export default function Home() {
  const navigate = useNavigate();
  const agregarJuntada = () => alert("Agregar nueva juntada");

  const juntadas = [
    { id: 1, emoji: "✈️", nombre: "Viaje Europa 2025" },
  ];

  const compartir = (nombre) => {
    alert(`Compartir juntada ${nombre}`);
  };

  const irAJuntada = (id) => {
    navigate(`/juntada/${id}`);
  }

    return (
        <div className="home">
            {/* titulo */}
            <Title 
            title="Bienvenid@ a Cuentas claras mantienen la amistad"
            subtitle="La aplicación que te ayuda a organizar los gastos con tus amigos, para que no pierdas más amigos, ni plata." />

            {/* Lista de Juntadas */}
        <div className="juntadas-container">
           <h1>Mis juntadas</h1>
            <div className="juntadas-list">
            {juntadas.map((j) => (
              <JuntadasList 
                key={j.id}
                emoji={j.emoji}
                nombre={j.nombre}
                onShare={() => compartir(j.nombre)}
                onClick={() => irAJuntada(j.id)}
              />
            ))}
            </div>
        </div>
           
            {/* Outlet */}
            <Main />
           
            {/* Boton nueva juntada */}
            <Button texto="Agregar nueva juntada" onClick={agregarJuntada}/>

            {/* Footer */}
            <Footer />
        </div>
    )
}