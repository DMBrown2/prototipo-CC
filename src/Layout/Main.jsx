import { Outlet } from 'react-router-dom';

//LISTA DE JUNTADAS (JuntadasList.jsx)
//CLICK EN UNA JUNTADA (Juntada.jsx)


export default function Main() {
    return (
        <>

        <main
        className='main-content'>
            <Outlet />
        </main>


        </>
    )
}