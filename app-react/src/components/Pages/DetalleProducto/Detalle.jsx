import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import './Detalle.css'

export default function Detalle(){

    const{carrito} = useParams();
    const {product} = useParams();
    const producto = decodeURIComponent(product)
    const jsonDataObject = JSON.parse(producto)

    /*const { id } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/producto/read/${id}`)
          .then(response => {
            setProduct(response.data)
            console.log(response.data)
            console.log(product)
            const updatedProduct = {
                ...product,
                fotourl: `http://localhost:5000/imagenes/${product.foto}` // Construir la URL completa aquí
              };
            setProduct(updatedProduct);
          })
          .catch(error => console.error('Error fetching data:', error));
    }, []);*/

    const [contacto, setContacto] = useState("");

    useEffect(()=>{
        axios.get(`http://localhost:5000/usuario/read/${jsonDataObject.idUsuario}`).then(response =>{
            console.log(response.data)
            var d = response.data;
            var cont = d['nombre'] + " " + d['apPat'] + " " + d['apMat']
            setContacto(cont)
        })
    },[])


    return(
       
            <>
                <div className="fullscreen-shape"></div>

                <section class="py-5">
                    <div class="container px-4 px-lg-5 my-5">
                        <div class="row gx-4 gx-lg-5 align-items-center">
                            <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0 img-product" src={jsonDataObject.fotourl} alt="..." /></div>
                            <div class="col-md-6">
                                <div class="small">ID: {jsonDataObject.idProducto}</div>
                                <h1 class="display-5 fw-bolder">{jsonDataObject.nombreProducto}</h1>
                                <div class="fs-5 mb-5">
                                    <span>${jsonDataObject.precio}</span>
                                </div>
                                <p class="lead">{jsonDataObject.descripcion}</p>
                                <p>Contacto: {jsonDataObject.contacto}</p>
                                <p>Publicación de: {contacto}</p>
                                    
                                <div class="d-flex">
                                    <button className="btn st-btn">-</button>
                                    {carrito &&
                                      <p className="m-3">{jsonDataObject.cantidad_carrito}</p>

                                    }
                                    <button className="btn st-btn">+</button>
                                    {!carrito && 
                                        <button class="btn btn-outline-dark flex-shrink-0" type="button">
                                        <i class="bi-cart-fill me-1"></i>
                                        Add to cart
                                        </button>
                                    
                                    }
                                </div>
                                <p>Existencias: {jsonDataObject.cantidad}</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section class="py-5 bg-light">
                    <div class="container px-4 px-lg-5 mt-5">
                        <h2 class="fw-bolder mb-4">Related products</h2>
                        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                            <div class="col mb-5">
                                <div class="card h-100">
                                    
                                    <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    
                                    <div class="card-body p-4">
                                        <div class="text-center">
                                            
                                            <h5 class="fw-bolder">Fancy Product</h5>
                                            
                                            $40.00 - $80.00
                                        </div>
                                    </div>
                                    
                                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col mb-5">
                                <div class="card h-100">
                                    
                                    <div class="badge bg-dark text-white position-absolute" style={{top: 0.5 + "rem", right: 0.5 + "rem"}}>Sale</div>
                                    
                                    <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    
                                    <div class="card-body p-4">
                                        <div class="text-center">
                                            
                                            <h5 class="fw-bolder">Special Item</h5>
                                            
                                            <div class="d-flex justify-content-center small text-warning mb-2">
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                            </div>
                                            
                                            <span class="text-muted text-decoration-line-through">$20.00</span>
                                            $18.00
                                        </div>
                                    </div>
                                    
                                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col mb-5">
                                <div class="card h-100">
                                    
                                    <div class="badge bg-dark text-white position-absolute" style={{top: 0.5 + "rem", right: 0.5 + "rem"}}>Sale</div>
                                    
                                    <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    
                                    <div class="card-body p-4">
                                        <div class="text-center">
                                            
                                            <h5 class="fw-bolder">Sale Item</h5>
                                            
                                            <span class="text-muted text-decoration-line-through">$50.00</span>
                                            $25.00
                                        </div>
                                    </div>
                                    
                                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col mb-5">
                                <div class="card h-100">
                                    
                                    <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    
                                    <div class="card-body p-4">
                                        <div class="text-center">
                                            
                                            <h5 class="fw-bolder">Popular Item</h5>
                                            
                                            <div class="d-flex justify-content-center small text-warning mb-2">
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                            </div>
                                            
                                            $40.00
                                        </div>
                                    </div>
                                    
                                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
                
    )
}