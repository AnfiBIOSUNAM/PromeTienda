import './Navigation.css'
import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Navigation(){
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    return(
        <>
        <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Prometienda</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor01">
              <ul class="navbar-nav me-auto">
                <li class="nav-item">
                  <a class="nav-link active" href="#">Home
                    <span class="visually-hidden">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Features</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">About</a>
                </li>
                
                {!cookies.user && (
                  <>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Registrarse</a>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Cliente</a>
                      <a class="dropdown-item" href="#">Vendedor</a>
                    </div>
                  </li><li class="nav-item">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                    </li>
                  </>
                )}
                
              </ul>
              <form class="d-flex">
                <input class="form-control me-sm-2" type="search" placeholder="Search"></input>
                <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </>
    )
}