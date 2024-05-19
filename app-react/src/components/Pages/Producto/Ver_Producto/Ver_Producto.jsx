import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { agregarAlCarrito } from '../../Carrito/Carrito';
import './Ver_Producto.css'

function VerProducto() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

  const vendedor = cookies.user && cookies.user['vendedor']===1;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'http://localhost:5000/producto/read';
        if (category) {
          url = `http://localhost:5000/producto/read/categoria/${category}`;
        }
        const response = await axios.get(url);
        var updatedProducts = response.data.map(product => ({
          ...product,
          fotourl: `http://localhost:5000/imagenes/${product.foto}`
        }));
        if(vendedor){
          filtrar(updatedProducts)
        }else{
          quitarSinExistencias(updatedProducts)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, [category]);

  const agregar = (idProducto) => {
    agregarAlCarrito(idProducto, cookies.user['idCarrito'], 1)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
      });
  }

  const irADetalle = (product) => {
    return () => {
      const jsonStr = JSON.stringify(product)
      navigate(`/detalle/${encodeURIComponent(jsonStr)}/false`);
    }
  }

  const filtrar = (productos) => {
    let productosFiltrados = productos.filter(producto => producto.idUsuario === cookies.user['idUsuario'])
    setProducts(productosFiltrados)
  }

  const quitarSinExistencias = (productos) => {
    let productosFiltrados = productos.filter(producto => producto.cantidad > 0)
    setProducts(productosFiltrados)
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <div className="fullscreen-shape"></div>
      <button type="button" className="btn-regresar" onClick={goBack}><i class="bi bi-arrow-left"/></button>
      <h1 className='text-white'>Productos</h1>
      <div className="products-container">
        <label className='text-white'>Selecciona una categoría:</label>
        <select className="btn-azul" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Todo</option>
          <option value="alimentos">Alimentos</option>
          <option value="electronica">Electrónica</option>
          <option value="ropa">Ropa</option>
          <option value="flores">Flores</option>
          <option value="accesorios">Accesorios</option>
          <option value="papeleria">Papelería</option>
          <option value="regalos">Regalos</option>
          <option value="otra">Otra</option>
        </select>
      </div>

      {vendedor && (
        <div className='agregar'>
          <NavLink to='/productos/registrar' className={'btn btn-azul p-3'}><i class="bi bi-plus-lg"/> Nuevo producto</NavLink>
        </div>
      )}
      
      {!cookies.user && (
        <p className='text-center mt-5 mb-0 text-white'><NavLink to='/login' className='link'>Inicia sesión </NavLink>para comenzar a comprar</p>
      )}

      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-4 row-cols-xl-5 justify-content-center">
            {products.length === 0 && (
              <p className='text-center'>
                {vendedor ? 'No tienes productos registrados' : 'No hay productos disponibles'}
              </p>
            )}
            {products.map(product => (
              <div key={product.idProducto} className={`product-item m-2 ${product.cantidad<=0 ? 'card-borrosa ' : ''}`}>
                <div className='imagen' onClick={irADetalle(product)}>
                  <img src={product.fotourl} alt={product.descripcion} className="product-image"/>
                </div>
                <div className="product-info" onClick={irADetalle(product)}>
                  <h3>{product.nombreProducto}</h3>
                  <p>${product.precio}</p>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  {cookies.user && !vendedor && (
                    <div className="text-center">
                      <button className="btn btn-outline-light mt-auto" onClick={() => agregar(product.idProducto)}>
                        <i className="bi bi-cart4" /> Agregar al carrito
                      </button>
                    </div>
                  )}
                  {vendedor && (
                    <div className="text-center">
                      <button className="btn btn-outline-light mt-auto">
                        <i className="bi bi-gear" /> Opciones
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            </div>
        </div>
      </section>
    </div>
  );
}

export default VerProducto;
