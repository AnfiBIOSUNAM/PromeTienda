import './Navigation.css'
import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import logo from "../../../Images/logo2.png"

export default function Navigation(){
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

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

    return(
        <>
        <nav className="navbar navbar-expand-lg navegacion" data-bs-theme="dark">
          <div className="container-fluid">
            <a className="navbar-brand marca" ><img src={logo} className='logo'/>Prometienda</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav me-auto">
                {cookies.user && (
                <li className="nav-item">
                  <NavLink to="/home" className="nav-link">Home</NavLink>
                </li>
                )}
                
                <li className="nav-item">
                  <NavLink to="/productos/ver" className="nav-link">Productos</NavLink>
                </li>

                {!cookies.user && (
                  <div className='d-flex registro opc-reg'>
                    <li className="nav-item">
                      <NavLink to="/registro" className="nav-link">Registrarse</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">Login</NavLink>
                    </li>
                  
                  </div>
                )}
                
                
              </ul>
              {cookies.user && (
                <div className='d-flex'>
                  {cookies.user['vendedor']==0 &&
                    <li className="carrito">
                      <NavLink to="/carrito" className="nav-link"><i className="bi bi-cart4 tam"></i></NavLink>
                    </li>
                  }
                  <div className='foto'>
                      <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{<img src={cookies.user.imagen} alt="Imagen de perfil" className="imagen-perfil" />}</a>
                      <div className="dropdown-menu  position-dropdown">
                        <NavLink to="/perfil" className="dropdown-item">Ver perfil</NavLink>
                        {cookies.user['vendedor']===0 &&(<NavLink to="/misCompras" className="dropdown-item">Mis compras</NavLink>)}
                        <NavLink to="/" className="dropdown-item" onClick={handleLogout}>Cerrar sesión</NavLink>
                      </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </>
    )
}