import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { agregarAlCarrito } from '../../Carrito/Carrito';
import './Ver_Producto.css'

function VerProducto() {
  const [products, setProducts] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['userToken']);


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
    let res = agregarAlCarrito(idProducto, cookies.user['idCarrito']).then(response => {
        console.log(res)
    })
}

  return (
    <div>
      <div className="fullscreen-shape"></div>
      <h1>Productos</h1>
      <div className="products-container">
        {products.map(product => (
          <div key={product.idProducto} className="product-item">
            <img src={product.fotourl} alt={product.fotourl} className="product-image" />
            <div className="product-info">
              <h3>{product.nombreProducto}</h3>
              <p>${product.precio}</p>
            </div>
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                {cookies.user && cookies.user['vendedor']==0 &&(
                    <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#" onClick={()=>agregar(product.idProducto)}>Agregar al carrito</a></div>
                )}

                {cookies.user && cookies.user['vendedor']==1 &&(
                    <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Opciones</a></div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VerProducto;