import { useState } from "react"
import Main from "../../Layout/Main"
import Button from "../../Layout/BotonAccion"
import Footer from "../../Layout/Footer"
import Title from "../../components/Title"
import JuntadasList from "../../components/JuntadasList"
import JuntadaForm from "../NuevaJuntada/JuntadaForm"
import { useNavigate } from "react-router-dom"
import { useJuntada } from "../../hooks/useJuntada"
import './Index.css'
import '../../styles/styles.css'




//HEADER
//MAIN (LISTA DE JUNTADAS  - JuntadaList.jsx)

//BOTON NUEVA JUNTADA (JUntadaForm.jsx)

//FOOTER

export default function Home() {
    const navigate = useNavigate();
    const { juntadas, agregarJuntada } = useJuntada();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const abrirModal = () => setIsModalOpen(true);
    const cerrarModal = () => setIsModalOpen(false);

    const handleAgregarJuntada = (nuevaJuntada) => {
      agregarJuntada(nuevaJuntada);
      cerrarModal();
    };

    const compartir = (nombre) => alert(`Compartir juntada ${nombre}`);
    const irAJuntada = (id) => navigate(`/juntada/${id}`);


    return (
        <div className="home">
            {/* titulo */}
            <Title 
            title="Bienvenid@ a Cuentas claras mantienen la amistad"
            subtitle="La aplicación que te ayuda a organizar los gastos con tus amigos." />

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
            <Button texto="Agregar nueva juntada" onClick={abrirModal}/>

 {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close" onClick={cerrarModal}>X</button>
            <JuntadaForm onSubmit={handleAgregarJuntada} />
          </div>
        </div>
      )}


            {/* Footer */}
            <Footer />
        </div>
    )
}