import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { agregarAlCarrito } from '../../Carrito/Carrito';
import './Ver_Producto.css'

function VerProducto() {
  const [products, setProducts] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => {
        const updatedProducts = response.data.map(product => {
          return {
            ...product,
            fotourl: `http://localhost:5000/imagenes/${product.foto}` // Construir la URL completa aquí
          };
        });
        setProducts(updatedProducts);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const agregar = (idProducto)=>{
    let res = agregarAlCarrito(idProducto, cookies.user['idCarrito'], 1).then(response => {
        console.log(res)
    })
  }

  const irADetalle = (product) => {
    return () => {
        const jsonStr = JSON.stringify(product)
        navigate(`/detalle/${encodeURIComponent(jsonStr)}/false`);
    }
  }

  return (
    <div>
      <div className="fullscreen-shape"></div>
      <h1>Productos</h1>
      <div className="products-container">
        {products.map(product => (
          <div key={product.idProducto} className="product-item">
            <img src={product.fotourl} alt={product.fotourl} className="product-image" onClick={irADetalle(product)} />
            <div className="product-info" onClick={irADetalle(product)}>
              <h3>{product.nombreProducto}</h3>
              <p>${product.precio}</p>
            </div>
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                {cookies.user && cookies.user['vendedor']==0 &&(
                    <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#" onClick={()=>agregar(product.idProducto)}><i class="bi bi-cart4"/>  Agregar al carrito</a></div>
                )}

                {cookies.user && cookies.user['vendedor']==1 &&(
                    <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#"><i class="bi bi-gear"/>  Opciones</a></div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VerProducto;