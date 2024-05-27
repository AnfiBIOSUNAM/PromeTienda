import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { agregarAlCarrito, cambiarCantidad } from "../Carrito/Carrito";
import { useCookies } from "react-cookie";
import { Success, Error } from '../../Swal/Swal';
import axios from "axios";
import './Detalle.css';

export default function Detalle() {
    const navigate = useNavigate();
    const { carrito, product } = useParams();
    const producto = decodeURIComponent(product);
    const jsonDataObject = JSON.parse(producto);
    const [cookies] = useCookies(['user']);
    const [contacto, setContacto] = useState("");
    const [numero, setNumero] = useState(1);
    const [cant, setCant] = useState(jsonDataObject.cantidad_carrito ? jsonDataObject.cantidad_carrito : 1);
    const [cantidadProducto, setCantidadProducto] = useState(jsonDataObject.cantidad);
    const [errorReactivar, setErrorReactivar] = useState(false);
    const [productoReactivado, setProductoReactivado] = useState(false);
    const [mensajeReactivacion, setMensajeReactivacion] = useState('');

    const vendedor = cookies.user && cookies.user['vendedor'] === 1;

    useEffect(() => {
        axios.get(`http://localhost:5000/usuario/read/${jsonDataObject.idUsuario}`).then(response => {
            var d = response.data;
            var cont = d['nombre'] + " " + d['apPat'] + " " + d['apMat'];
            setContacto(cont);
        });
    }, []);

    function aumentar(limite) {
        if (numero + 1 <= limite) {
            setNumero(numero + 1);
        }
    }

    function disminuir() {
        if (numero - 1 > 0) {
            setNumero(numero - 1);
        }
    }

    function agregar() {
        let res = agregarAlCarrito(jsonDataObject.idProducto, cookies.user['idCarrito'], numero).then(response => {
            console.log(res);
        });
    }

    function poner() {
        if (cant < jsonDataObject.cantidad) {
            let res = cambiarCantidad(jsonDataObject.idProducto, cookies.user['idCarrito'], cant + 1);
            console.log(res);
            setCant(cant + 1);
        }
    }

    function quitar() {
        if (cant - 1 > 0) {
            let res = cambiarCantidad(jsonDataObject.idProducto, cookies.user['idCarrito'], cant - 1);
            console.log(res);
            setCant(cant - 1);
        }
    }

    const reactivarProducto = () => {
        axios.get(`http://localhost:5000/producto/reactivar/${jsonDataObject.idProducto}`)
            .then(response => {
                setProductoReactivado(true);
                Success('El producto se ha reactivado exitosamente.');
                navigate('/');
            })
            .catch(error => {
                console.error('Error al reactivar el producto:', error);
                setErrorReactivar(true);
            });
    };

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (jsonDataObject.cantidad === 0) {
            setCantidadProducto(0);
        }
    }, [jsonDataObject.cantidad]);

    return (
        <>
            <div className="fullscreen-shape"></div>
            <button type="button" className="btn-regresar" onClick={goBack}><i className="bi bi-arrow-left" /></button>
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
                            <p>Publicación de: <NavLink to={`/galeria/${jsonDataObject.idUsuario}`} className="link">{contacto}</NavLink></p>

                            {cookies.user && !vendedor &&
                                <div className="d-flex">
                                    {carrito === "true" &&
                                        <>
                                            <button className="btn btn-azul" onClick={() => quitar()}>-</button>
                                            <p className="m-3">{cant}</p>
                                            <button className="btn btn-azul" onClick={() => poner()}>+</button>
                                        </>
                                    }
                                    {carrito === "false" &&
                                        <>
                                            <button className="btn btn-azul" onClick={() => disminuir()}>-</button>
                                            <p className="m-4">{numero}</p>
                                            <button className="btn btn-azul" onClick={() => aumentar(jsonDataObject.cantidad)}>+</button>
                                        </>
                                    }
                                    {carrito === "false" &&
                                        <button className="btn btn-outline-dark flex-shrink-0 m-3" onClick={() => agregar()}>
                                            <i className="bi-cart-fill me-1"></i>
                                            Agregar al carrito
                                        </button>
                                    }
                                </div>
                            }

                            {cantidadProducto === 0 && !productoReactivado && (
                                <button className="btn btn-outline-dark flex-shrink-0 m-3" onClick={reactivarProducto}>
                                    Reactivar
                                </button>
                            )}

                            {errorReactivar && (
                                <p className="text-danger">Error al reactivar el producto. Inténtalo de nuevo más tarde.</p>
                            )}

                            {vendedor && cantidadProducto > 0 && !productoReactivado && (
                                <div>
                                    <NavLink to={`/productos/actualizar/${jsonDataObject.idProducto}`} className={'editar m-2'}><i className="bi bi-pencil-square" /> Editar</NavLink>
                                    <NavLink to={`/productos/eliminar/${jsonDataObject.idProducto}`} className={'eliminar'}><i className="bi bi-trash3" /> Desactivar</NavLink>
                                </div>
                            )}

                            {!cookies.user && (
                                <p><NavLink to="/login" className='link'>Inicia sesión </NavLink>para comprar este producto</p>
                            )}

                            {mensajeReactivacion && (
                                <p className="text-success">{mensajeReactivacion}</p>
                            )}

                        </div>

                    </div>

                </div>
            </section>

            <section className="py-5 bg-gris">
                <div className="container px-4 px-lg-5 mt-5">
                    <h2 className="fw-bolder mb-4 text-white">Comentarios</h2>
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
