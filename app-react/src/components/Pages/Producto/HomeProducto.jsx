import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Importar NavLink desde react-router-dom

export default function HomeProducto(){

  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <div className="fullscreen-shape"></div>
      <button type="button" className="btn-regresar" onClick={goBack}><i class="bi bi-arrow-left"/></button>
      <h1 className='text-white'>Productos</h1>
      <NavLink to="/productos/registrar"><button>Agregar</button></NavLink>
      <NavLink to="/productos/ver"><button>Ver</button></NavLink>
      <NavLink to="/productos/eliminar"><button>Eliminar</button></NavLink>
      <NavLink to="/productos/actualizar"><button>Actualizar</button></NavLink>
    </div>
  );
}



