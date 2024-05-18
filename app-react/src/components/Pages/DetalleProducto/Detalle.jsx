import { useEffect, useState } from "react"
import { NavLink, useLocation, useParams } from "react-router-dom";
import { agregarAlCarrito, cambiarCantidad } from "../Carrito/Carrito";
import { useCookies } from "react-cookie";
import axios from "axios";
import './Detalle.css'

export default function Detalle(){

    const{carrito} = useParams();
    const {product} = useParams();
    const producto = decodeURIComponent(product)
    const jsonDataObject = JSON.parse(producto)

    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
    const [contacto, setContacto] = useState("");
    const [numero, setNumero]= useState(1);
    const [cant, setCant]=useState(jsonDataObject.cantidad_carrito?jsonDataObject.cantidad_carrito:1)

    const vendedor = cookies.user && cookies.user['vendedor']===1;

    useEffect(()=>{
        axios.get(`http://localhost:5000/usuario/read/${jsonDataObject.idUsuario}`).then(response =>{
            //console.log(response.data)
            var d = response.data;
            var cont = d['nombre'] + " " + d['apPat'] + " " + d['apMat']
            setContacto(cont)
        })
    },[])


    function aumentar(limite){
        if(numero+1 <= limite){
            setNumero(numero+1)
        }
    }

    function disminuir(){
        if(numero-1 > 0){
            setNumero(numero-1)
        }
    }

    function agregar(){
        let res = agregarAlCarrito(jsonDataObject.idProducto, cookies.user['idCarrito'], numero).then(response => {
            console.log(res)
        })
    }

    function poner(){
        if (cant < jsonDataObject.cantidad){
            let res = cambiarCantidad(jsonDataObject.idProducto, cookies.user['idCarrito'], cant+1)
            console.log(res)
            setCant(cant+1)
        }
    }

    function quitar(){
        if(cant-1>0){
            let res = cambiarCantidad(jsonDataObject.idProducto, cookies.user['idCarrito'], cant-1)
            console.log(res)
            setCant(cant-1)
        }
    }

    return(
       
            <>
                <div className="fullscreen-shape"></div>

                <section className="py-5">
                    <div className="container px-4 px-lg-5 my-5">
                        <div className="row gx-4 gx-lg-5 align-items-center">
                            <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0 img-product" src={jsonDataObject.fotourl} alt="..." /></div>
                            <div className="col-md-6">
                                <div className="small">ID: {jsonDataObject.idProducto}</div>
                                <h1 className="display-5 fw-bolder">{jsonDataObject.nombreProducto}</h1>
                                <div className="fs-5 mb-5">
                                    <span>${jsonDataObject.precio}</span>
                                </div>
                                <p className="lead">{jsonDataObject.descripcion}</p>
                                <p>Contacto: {jsonDataObject.contacto}</p>
                                <p>Publicación de: {contacto}</p>
                                    
                                {cookies.user && !vendedor && 
                                    <div className="d-flex">
                                    
                                    {carrito==="true" &&
                                        <>
                                      <button className="btn st-btn" onClick={()=>quitar()}>-</button>
                                      <p className="m-3">{cant}</p>
                                      <button className="btn st-btn" onClick={()=>poner()}>+</button>
                                      </>
                                    }
                                    {carrito==="false"&&
                                        <>
                                        <button className="btn st-btn" onClick={() => disminuir()}>-</button>
                                        <p className="m-4">{numero}</p>
                                        <button className="btn st-btn" onClick={() => aumentar(jsonDataObject.cantidad)}>+</button>
                                        </>
                                    }
                                    
                                    {carrito==="false" && 
                                        <button className="btn btn-outline-dark flex-shrink-0 m-3" type="button" onClick={()=>agregar()}>
                                        <i className="bi-cart-fill me-1"></i>
                                        Agregar al carrito
                                        </button>
                                    
                                    }
                                </div>
                                }
                                
                                <p>Existencias: {jsonDataObject.cantidad}</p>

                                {vendedor &&(
                                    <div>
                                        <NavLink className={'editar m-2'}><i class="bi bi-pencil-square"/> Editar</NavLink>
                                        <NavLink className={'eliminar'}><i class="bi bi-trash3"/> Eliminar</NavLink>
                                    </div>
                                )}

                                {!cookies.user && (
                                    <p><NavLink to="/login" className='link'>Inicia sesión </NavLink>para comprar este producto</p>
                                
                                )}
                                
                            </div>
                            
                        </div>
                        
                    </div>
                </section>
                
                <section className="py-5 bg-light">
                    <div className="container px-4 px-lg-5 mt-5">
                        <h2 className="fw-bolder mb-4">Comentarios</h2>
                        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                            <div className="col mb-5">
                                <div className="card h-100">
                                    
                                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            
                                            <h5 className="fw-bolder">Fancy Product</h5>
                                            
                                            $40.00 - $80.00
                                        </div>
                                    </div>
                                    
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </>
                
    )
}