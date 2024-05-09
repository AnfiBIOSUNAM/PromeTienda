import { NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './Carrito.css'
import { Success } from '../../Swal/Swal';



export async function agregarAlCarrito(idProducto, idCarrito){
    console.log(idProducto, idCarrito);
    const formdata = new FormData();
    formdata.append("idProducto", idProducto);
    formdata.append("idCarrito", idCarrito);
    console.log(formdata.get("idProducto"))
    console.log(formdata.get('idCarrito'))
    try{
        const res = await fetch('http://localhost:5000/carrito/agregar',{
            method: 'POST',
            body: formdata
        }).then((response) => response.json()).then((data) => {
            console.log(data);
            return data;
            /*try{
                if(data['error']){
                    Error('No se pudo agregar el producto al carrito');
                }else{
                    Success('Producto agregado al carrito')
                }
            }catch(error){
                console.log(error);
            }*/
        })
    }catch(error){
        console.log(error)
        return error;
    }
}

export default function Carrito() {

    const [products, setProducts] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

    useEffect(() => {
        axios.get(`http://localhost:5000/carrito/productosInfo/${cookies.user['idCarrito']}`)
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
        <>
            <div className="fullscreen-shape"></div>

            <h1 className='text-center mt-3'>Carrito</h1>
            <section className="py-5">
                {products.length==0 && (
                    <p className='text-center'>No hay productos en tu carrito</p>
                )}
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        
                        {products.map(product => (
                            <div className="col mb-5">

                                <div key={product.idProducto} className="card h-100">
                                    
                                    <img className="card-img-top img-fluid img-card" src={product.fotourl} alt={product.nombreProducto} />
                                    
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            
                                            <h5 className="fw-bolder">{product.nombreProducto}</h5>
                                            <p>{product.descripcion}</p>
                                            <p>$ {product.precio}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">

                                        
                                            <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Opciones</a></div>
                                       
                                    </div>
                                    
                                </div>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </section>

        <footer className="py-5 bg-dark">
            <div className="container"><p className="m-0 text-center text-white">Copyright &copy; Prometienda 2024</p></div>
        </footer>


        </>
    )
}

