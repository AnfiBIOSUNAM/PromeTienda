import { NavLink } from 'react-router-dom'
import './HomeUser.css'
import { useCookies } from 'react-cookie';

export default function HomeUser() {

    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

    return (
        <>
            <div className="fullscreen-shape"></div>
            <h1>Home</h1>
            <p>Bienvenido a Prometienda {cookies.user['nombre']}</p>
            </>
    )
}

