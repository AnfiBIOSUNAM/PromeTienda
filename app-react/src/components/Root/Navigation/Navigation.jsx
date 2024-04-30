import './Navigation.css'
import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';

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
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Prometienda</a>
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
                  <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Pricing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                
                {!cookies.user && (
                  <>
                  <li className="nav-item">
                    <NavLink to="/registro" className="nav-link">Registrarse</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                  </li>
                  </>
                )}
                
              </ul>
              {cookies.user && (
                <div className='foto'>
                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{<img src={cookies.user.imagen} alt="Imagen de perfil" className="imagen-perfil" />}</a>
                    <div className="dropdown-menu  position-dropdown">
                      <NavLink to="#" className="dropdown-item">Ver perfil</NavLink>
                      <NavLink to="/" className="dropdown-item" onClick={handleLogout}>Cerrar sesión</NavLink>
                    </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </>
    )
}