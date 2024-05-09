import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ver_Producto.css'

function VerProducto() {
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <h1>Productos</h1>
      <div className="products-container">
        {products.map(product => (
          <div key={product.idProducto} className="product-item">
            <img src={product.fotourl} alt={product.fotourl} className="product-image" />
            <div className="product-info">
              <h3>{product.descripcion}</h3>
              <p>${product.precio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VerProducto;