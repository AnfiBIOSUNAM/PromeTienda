import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { agregarAlCarrito } from '../../Carrito/Carrito';
import './Ver_Producto.css'

function VerProducto() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'http://localhost:5000/producto/read';
        if (category) {
          url = `http://localhost:5000/producto/read/categoria/${category}`;
        }
        const response = await axios.get(url);
        const updatedProducts = response.data.map(product => ({
          ...product,
          fotourl: `http://localhost:5000/imagenes/${product.foto}`
        }));
        setProducts(updatedProducts);
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

  return (
    <div>
      <div className="fullscreen-shape"></div>
      <h1>Productos</h1>
      <div className="products-container">
        <label>Selecciona una categoría:</label>
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


      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-4 row-cols-xl-5 justify-content-center">
            {products.map(product => (
              <div key={product.idProducto} className="product-item m-2">
                <img src={product.fotourl} alt={product.fotourl} className="product-image" onClick={irADetalle(product)} />
                <div className="product-info" onClick={irADetalle(product)}>
                  <h3>{product.nombreProducto}</h3>
                  <p>${product.precio}</p>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  {cookies.user && cookies.user['vendedor'] === 0 && (
                    <div className="text-center">
                      <button className="btn btn-outline-dark mt-auto" onClick={() => agregar(product.idProducto)}>
                        <i className="bi bi-cart4" /> Agregar al carrito
                      </button>
                    </div>
                  )}
                  {cookies.user && cookies.user['vendedor'] === 1 && (
                    <div className="text-center">
                      <button className="btn btn-outline-dark mt-auto">
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
