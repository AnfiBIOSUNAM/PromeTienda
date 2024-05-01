import './Navigation.css'
import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Navigation(){
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

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
                <li className="nav-item">
                  <a className="nav-link active" href="#">Home
                    <span className="visually-hidden">(current)</span>
                  </a>
                </li>
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
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">D1</a>
                      <a className="dropdown-item" href="#">D2</a>
                    </div>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/registro" className="nav-link">Registrarse</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                  </li>
                  
                  </>
                )}
                <li className="nav-item">
                    <NavLink to="/productos" className="nav-link">Productos</NavLink>
                  </li>
                
              </ul>
              <form className="d-flex">
                <input className="form-control me-sm-2" type="search" placeholder="Search"></input>
                <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </>
    )
}