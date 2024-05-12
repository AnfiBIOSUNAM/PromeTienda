import { NavLink, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeUser.css'
import { useCookies } from 'react-cookie';
import { agregarAlCarrito } from '../Carrito/Carrito';

export default function HomeUser() {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
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

    const agregar = (idProducto)=>{
        let res = agregarAlCarrito(idProducto, cookies.user['idCarrito'], 1).then(response => {
            console.log(response)
        })
    }

    const irADetalle = (product) => {
        return () => {
            const jsonStr = JSON.stringify(product)
            navigate(`/detalle/${encodeURIComponent(jsonStr)}/false`);
        }
    }

    return (
        <>
            <div className="fullscreen-shape"></div>
        
        
        <header className="bg-dark py-5 encabezado">
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">Bienvenido a Prometienda {cookies.user['nombre']}</h1>
                    <p className="lead fw-normal text-white-70 mb-0">Tu tienda virtual de la Facultad de Ciencias</p>
                </div>
            </div>
        </header>

        
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    
                    {products.slice(0,8).map(product => (
                        <div className="col mb-5">

                            <div key={product.idProducto} className="card h-100">
                                
                                <img className="card-img-top img-fluid img-card" src={product.fotourl} alt={product.nombreProducto} onClick={irADetalle(product)}/>
                                
                                <div className="card-body p-4" onClick={irADetalle(product)}>
                                    <div className="text-center">
                                        
                                        <h5 className="fw-bolder">{product.nombreProducto}</h5>
                                        <p>{product.descripcion}</p>
                                        <p>$ {product.precio}</p>
                                    </div>
                                </div>
                                
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    {cookies.user['vendedor']==0 &&(
                                        <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#" onClick={()=>agregar(product.idProducto)}>Agregar al carrito</a></div>
                                    )}

                                    {cookies.user['vendedor']==1 &&(
                                        <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Opciones</a></div>
                                    )}
                                </div>
                                
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        </section>

        <div className='text-center mb-5'>
            {cookies.user['vendedor'] === 0 && (
                <NavLink to='/productos/ver' className={'btn btn-azul'} >Ver más productos</NavLink>
            )}
            {cookies.user['vendedor'] === 1 && (
                <>
                <NavLink to='#' className={'btn btn-azul'}>Ver todos mis productos en venta</NavLink>
                <NavLink to='/productos/registrar' className={'btn btn-azul'}>Registrar producto</NavLink>
                </>
            )}
            
        </div>


        </>
    )
}

