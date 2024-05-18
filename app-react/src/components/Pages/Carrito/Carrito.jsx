import { NavLink, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './Carrito.css'
import { Success, Error } from '../../Swal/Swal';


export async function agregarAlCarrito(idProducto, idCarrito, cantidad){
    console.log(idProducto, idCarrito);
    const formdata = new FormData();
    formdata.append("idProducto", idProducto);
    formdata.append("idCarrito", idCarrito);
    formdata.append("cantidad", cantidad)
    
    try{
        const res = await fetch('http://localhost:5000/carrito/agregar',{
            method: 'POST',
            body: formdata
        }).then((response) => response.json()).then((data) => {
            console.log(data);
            if(data['idCarrito']){
                Success('Producto agregado al carrito')
            }else{
                Error('No se pudo agregar el producto al carrito');
            }
            return data;
            
        })
    }catch(error){
        console.log(error)
        return error;
    }
}

export function cambiarCantidad(idProducto, idCarrito, cantidad){
    const formdata = new FormData();
    formdata.append('idCarrito', idCarrito)
    formdata.append('idProducto', idProducto);
    formdata.append('cantidad', cantidad);
    try{
        const res = fetch('http://localhost:5000/carrito/editarCantidad',{
            method: 'POST',
            body: formdata
        }).then((response) => response.json()).then((data) => {
            console.log(data);
        })
    }catch(error){
        console.log(error)
        return error;
    }
}

export default function Carrito() {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

    useEffect(() => {
        axios.get(`http://localhost:5000/carrito/productosInfo/${cookies.user['idCarrito']}`)
          .then(response => {
            var updatedProducts = response.data.map(product => {
              return {
                ...product,
                fotourl: `http://localhost:5000/imagenes/${product.foto}` // Construir la URL completa aquí
              };
            });
            quitarSinExistencias(updatedProducts);
          })
          .catch(error => console.error('Error fetching data:', error));
    }, []);

    const quitarSinExistencias = (productos) => {
        let productosFiltrados = productos.filter(producto => producto.cantidad > 0)
        setProducts(productosFiltrados)
    }
      

    const eliminarProducto = (idProducto) => {
        const formdata = new FormData();
        formdata.append('idCarrito', cookies.user['idCarrito'])
        formdata.append('idProducto', idProducto);
        try{
            const res = fetch('http://localhost:5000/carrito/eliminarProducto',{
                method: 'POST',
                body: formdata
            }).then((response) => response.json()).then((data) => {
                console.log(data);
                if(data['success']){
                    const updatedProducts = products.filter(product => product.idProducto !== idProducto);
                    setProducts(updatedProducts);
                    Success('Producto eliminado del carrito')
                }else{
                    Error('No se pudo eliminar del carrito');
                }
            })
        }catch(error){
            console.log(error)
            return error;
        }
    }

    const irADetalle = (product) => {
        return () => {
            if(product.cantidad_carrito>product.cantidad){
                product.cantidad_carrito=product.cantidad
            }
            const jsonStr = JSON.stringify(product)
            navigate(`/detalle/${encodeURIComponent(jsonStr)}/true`);
        }
    }

    const modificaCantidad = (idProducto, cantidad) => {
        const formdata = new FormData();
        formdata.append('idCarrito', cookies.user['idCarrito'])
        formdata.append('idProducto', idProducto);
        formdata.append('cantidad', cantidad);
        try{
            const res = fetch('http://localhost:5000/carrito/editarCantidad',{
                method: 'POST',
                body: formdata
            }).then((response) => response.json()).then((data) => {
                console.log(data);
            })
        }catch(error){
            console.log(error)
            return error;
        }
    }

    const comprar = () => {

    }


    return (
        <>
            <div className="fullscreen-shape"></div>

            <h1 className='text-center mt-3 text-white'>Carrito</h1>
            <section className="py-5">
                {products.length==0 && (
                    <p className='text-center'>No hay productos en tu carrito</p>
                )}
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        
                        {products.map(product => (
                            <div className="col mb-5">

                                <div key={product.idProducto} className="card h-100 tarjeta">
                                    <div className='imagen text-center'>
                                        <img className="card-img-top img-fluid img-card mt-1" src={product.fotourl} alt={product.nombreProducto} onClick={irADetalle(product)} />
                                    </div>
                                    <div className="card-body pt-1" onClick={irADetalle(product)}>
                                        <div className="text-center">
                                            
                                            <h5 className="fw-bolder">{product.nombreProducto}</h5>
                                            <p>$ {product.precio}</p>
                                            <p>Cantidad: {product.cantidad_carrito > product.cantidad? (<>{product.cantidad} {modificaCantidad(product.idProducto, product.cantidad)}</>) : product.cantidad_carrito}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">

                                        <div className="text-center"><a className="btn btn-outline-dark mt-auto btn-eliminar" href="#" onClick={()=>eliminarProducto(product.idProducto)}><i class="bi bi-trash3"/> Eliminar</a></div>   
                                       
                                    </div>
                                    
                                </div>
                            </div>
                        ))}
                        
                    </div>
                </div>
                <div className='text-center'>
                    <button className='p-4 btn-azul fs-5' onClick={()=>comprar()}>Comprar</button>
                </div>
            </section>


        </>
    )
}

