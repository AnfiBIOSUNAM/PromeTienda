import { NavLink } from 'react-router-dom'
import './HomeUser.css'
import { useCookies } from 'react-cookie';

export default function HomeUser() {

    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

    const handleLogout = () => {
        removeCookie('userToken');
        removeCookie('user');
        try{
            const response = fetch(`http://localhost:5000/usuario/logout`).then(
                (response) => console.log(response));
            
        }catch(error){
            console.log('Error en la petición logout');
            console.log(error);
            alert('Ocurrió un error inesperado, inténtalo más tarde')
        }
    }

    return (
        <>
            <div className="fullscreen-shape"></div>
            <h1>Home</h1>
            { cookies.user &&
            (
            <>
            <p>Bienvenido a Prometienda {cookies.user['nombre']}</p>
            <NavLink to="/" className="btn btn-primary" onClick={handleLogout}>Cerrar sesión</NavLink>
            </>
            )}
            { !cookies.user &&(
            <>
            <p>Para acceder a esta página debes iniciar sesión</p>
            </>
            )}
            </>
    )
}

