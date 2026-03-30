import { useState } from "react"
import Main from "../../Layout/Main"
import Button from "../../Layout/BotonAccion"
import Footer from "../../Layout/Footer"
import Title from "../../components/Title"
import JuntadasList from "../../components/JuntadasList"
import JuntadaForm from "../NuevaJuntada/JuntadaForm"
import { useNavigate } from "react-router-dom"
import { useJuntada } from "../../hooks/useJuntada"
import '../../components/Form.css'
import './Index.css'
import '../../styles/styles.css'




//HEADER
//MAIN (LISTA DE JUNTADAS  - JuntadaList.jsx)

//BOTON NUEVA JUNTADA (JUntadaForm.jsx)

//FOOTER

export default function Home() {
    const navigate = useNavigate();
    const { juntadas, eliminarJuntada } = useJuntada();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [juntadaEditar, setJuntadaEditar] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [juntadaAEliminar, setJuntadaAEliminar] = useState(null);

    const abrirModal = () => setIsModalOpen(true);
    const cerrarModal = () => {
      setIsModalOpen(false);
      setJuntadaEditar(null);
    };

    const compartir = (nombre) => alert(`Compartir juntada ${nombre}`);
    const irAJuntada = (id) => navigate(`/juntada/${id}`);

    const handleEditarJuntada = (juntada) => {
      setJuntadaEditar(juntada);
      setIsModalOpen(true);
    };

    const handleEliminarJuntada = (juntada) => {
      setJuntadaAEliminar(juntada);
      setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = () => {
      if (juntadaAEliminar) {
        eliminarJuntada(juntadaAEliminar.id);
        setShowDeleteConfirm(false);
        setJuntadaAEliminar(null);
      }
    };

    const handleCancelDelete = () => {
      setShowDeleteConfirm(false);
      setJuntadaAEliminar(null);
    };


    return (
        <div className="home">
            {/* titulo */}
            <Title 
            title ="Bienvenid@ a Cuentas Claras (para mantener la amistad)"
            subtitle="La aplicación que te ayuda a organizar tus gastos."/>

            <Title 
            title="Mis juntadas"/>

                        
            {/* Lista de Juntadas */}
        <div className="juntadas-wrapper">
            <div className="juntadas-list">
            {juntadas.map((j) => (
              <JuntadasList 
                key={j.id}
                emoji={j.emoji}
                nombre={j.nombre}
                onShare={() => compartir(j.nombre)}
                onClick={() => irAJuntada(j.id)}
                onEdit={() => handleEditarJuntada(j)}
                onDelete={() => handleEliminarJuntada(j)}
              />
            ))}
            </div>
        </div>
           
            {/* Outlet */}
            <Main />
           
            {/* Boton nueva juntada */}
            <Button signo="+" texto="Sumar nueva juntada" onClick={abrirModal}
            />

            {isModalOpen && <JuntadaForm onClose={cerrarModal} juntadaEditar={juntadaEditar} />}

            {/* Diálogo de confirmación de eliminación */}
            {showDeleteConfirm && juntadaAEliminar && (
              <div className="confirmation-dialog-overlay">
                <div className="confirmation-dialog">
                  <h2>⚠️ Eliminar juntada</h2>
                  <p>
                    ¿Estás seguro de que queres eliminar la juntada <strong>{juntadaAEliminar.emoji} {juntadaAEliminar.nombre}</strong>?
                  </p>
                  <p className="confirmation-question">Esta acción no se puede deshacer.</p>
                  <div className="confirmation-buttons">
                    <button
                      className="btn btn-yes"
                      onClick={handleConfirmDelete}
                    >
                      SÍ, ELIMINAR
                    </button>
                    <button
                      className="btn btn-no"
                      onClick={handleCancelDelete}
                    >
                      NO, CANCELAR
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <Footer />
        </div>
    )
}