import React from 'react';
import { NavLink } from 'react-router-dom'; // Importar NavLink desde react-router-dom

export default function HomeProducto(){

  return (
    <div>
      <div className="fullscreen-shape"></div>
      <NavLink to="/"><button type="button" className="btn-regresar"><i class="bi bi-arrow-left"/></button></NavLink>
      <h1 className='text-white'>Productos</h1>
      <NavLink to="/productos/registrar"><button>Agregar</button></NavLink>
      <NavLink to="/productos/ver"><button>Ver</button></NavLink>
      <NavLink to="/productos/eliminar"><button>Eliminar</button></NavLink>
      <NavLink to="/productos/actualizar"><button>Actualizar</button></NavLink>
    </div>
  );
}



