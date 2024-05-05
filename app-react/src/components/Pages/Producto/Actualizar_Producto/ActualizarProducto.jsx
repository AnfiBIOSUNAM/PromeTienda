import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


function ActualizarProducto() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [idProducto, setIdProducto] = useState('');
    const [nombreProducto, setNombreProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenes, setImagenes] = useState([]);
    const [imagen, setImagen] = useState([]);
    const [precio, setPrecio] = useState('');
    const [contacto, setContacto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);

    const handleCategoriaChange = (e) => {
        const categoriaSeleccionada = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            // Si la categoría está marcada, la agregamos al array de categorías seleccionadas
            setCategoriasSeleccionadas([...categoriasSeleccionadas, categoriaSeleccionada]);
        } else {
            // Si la categoría está desmarcada, la eliminamos del array de categorías seleccionadas
            const nuevasCategorias = categoriasSeleccionadas.filter(cat => cat !== categoriaSeleccionada);
            setCategoriasSeleccionadas(nuevasCategorias);
        }
    };

    const registrar_categorias = async (idProducto, categorias) => {
        categorias.forEach(async (categoria) => {
            const formdata = new FormData();
            formdata.append('idProducto', idProducto);
            formdata.append('categoria', categoria);

            try {
                const response = await fetch(`http://localhost:5000/categoria/create`, {
                    method: 'POST',
                    body: formdata
                }).then((response) => response.json()).then((data) => {
                    console.log(data);
                    try {
                        if (data['error'] === "No se pudo crear la categoria") {
                            alert("No se pudo crear la categoria");
                        } else if (data['error'] === 'Faltan datos') {
                            alert("Faltan datos");
                        } else {
                            console.log(data);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        });
    }

    const actualizar_categorias = async (categorias) => {

        const formdata = new FormData();
        formdata.append('idProducto', idProducto);


        try {
            const response = await fetch(`http://localhost:5000/categoria/delete`, {
                method: 'POST',
                body: formdata
            }).then((response) => response.json()).then((data) => {
                console.log(data);
                try {
                    if (data['error'] === "No se pudieron borrar las categorias") {
                        alert("No se pudieron borrar las categorias");
                    } else {
                        console.log(data);
                    }
                } catch (error) {
                    console.log(error);
                }
            });

        } catch (error) {
            console.log(error);
        }
        registrar_categorias(idProducto, categorias);
    }

    const handleImagenChange = (e) => {
        const files = e.target.files;
        const arrayFiles = Array.from(files);
        setImagenes(arrayFiles);
    }

    const guardar_imagenes = async() => {
        const formdata = new FormData();
        Array.from(imagenes).forEach((imagen, index) => {
            formdata.append(`imagen${index}`, imagen);
        });
        
        try{
            const response = await fetch(`http://localhost:5000/imagenes/guardar`, {
                method: 'POST',
                body: formdata
            }).then((response) => response.json()).then((data) => {
                console.log(data);
                const arr = data['rutas_imagenes'];
                console.log("El resultado es: ",arr[0]);
               

                return arr[0]
               
                
            });
        } catch(error){
            console.log('Error al subir las imagenes: ',error);
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const idUsuario = cookies.user.idUsuario;
        console.log(idProducto, idUsuario, nombreProducto, descripcion, imagen, precio, contacto, cantidad);
        alert(idUsuario);
        
        actualizarProducto(idProducto, idUsuario, nombreProducto, descripcion, imagen, precio, contacto, cantidad);
    };

    const actualizarProductoAux = async (idProducto, idUsuario, nombreProducto, descripcion, imagen, precio, contacto, cantidad) => {
        const formdata = new FormData();
        formdata.append('idProducto', idProducto);
        formdata.append('idUsuario', idUsuario);
        formdata.append('nombreProducto', nombreProducto);
        formdata.append('descripcion', descripcion);
        formdata.append('imagen', imagen);
        formdata.append('precio', precio);
        formdata.append('contacto', contacto);
        formdata.append('cantidad', cantidad);

        try {

            const response = await fetch(`http://localhost:5000/producto/update`, {
                method: 'POST',
                body: formdata

            }).then((response) => response.json()).then((data) => {
                console.log(data);

                try {
                    if (data['error'] === "No se pudo actualizar producto") {
                        alert("No se pudo actualizar el producto");
                    } else if (data['error'] === "No autorizado para actualizar producto") {
                        alert("No tienes autorización para actualizar dicho producto");
                    } else {
                       
                        navigate('/productos'); // Navegar a la página de productos después de actualizar el producto
                    }
                } catch (error) {
                    console.log(error);
                }
            });

        } catch (error) {
            console.log('Error en la petición');
            console.log(error);
            alert('Ocurrió un error inesperado, inténtalo más tarde');
        }
    }


    const actualizarProducto = async (idProducto, idUsuario, nombreProducto, descripcion, imagen, precio, contacto, cantidad) => {
        const formdata = new FormData();
        formdata.append('idProducto', idProducto);
        formdata.append('idUsuario', idUsuario);
        formdata.append('nombreProducto', nombreProducto);
        formdata.append('descripcion', descripcion);
        formdata.append('imagen', imagen);
        formdata.append('precio', precio);
        formdata.append('contacto', contacto);
        formdata.append('cantidad', cantidad);

        try {

            const response = await fetch(`http://localhost:5000/producto/update`, {
                method: 'POST',
                body: formdata

            }).then((response) => response.json()).then((data) => {
                console.log(data);

                try {
                    if (data['error'] === "No se pudo actualizar producto") {
                        alert("No se pudo actualizar el producto");
                    } else if (data['error'] === "No autorizado para actualizar producto") {
                        alert("No tienes autorización para actualizar dicho producto");
                    } else {
                        alert('Producto actualizado correctamente');
                        console.log(data);
                        if (categoriasSeleccionadas.length > 0) {
                            actualizar_categorias(categoriasSeleccionadas);
                        }
                        if (imagenes.length > 0) {
                            const imagenNueva = guardar_imagenes(); // Llama a la función para guardar las imágenes
                            actualizarProductoAux(idProducto, idUsuario, nombreProducto, descripcion, imagenNueva, precio, contacto, cantidad);
                        }
                        navigate('/productos'); // Navegar a la página de productos después de actualizar el producto
                    }
                } catch (error) {
                    console.log(error);
                }
            });

        } catch (error) {
            console.log('Error en la petición');
            console.log(error);
            alert('Ocurrió un error inesperado, inténtalo más tarde');
        }
    }


    return (
        <>
            <div className="form-container">
                <h1>Actualizar Producto</h1>
                <form className='m-5' onSubmit={handleSubmit}>
                    <fieldset>
                        <div>
                            <label htmlFor="idProducto" className="form-label mt-4">ID del Producto (obligatorio)</label>
                            <input type="text" className="form-control" id="idProducto" placeholder="Ingrese el ID del producto" value={idProducto} onChange={(e) => setIdProducto(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="nombreProducto" className="form-label mt-4">Nombre del Producto</label>
                            <input type="text" className="form-control" id="nombreProducto" placeholder="Ingrese el nombre del producto" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="descripcion" className="form-label mt-4">Descripción</label>
                            <textarea className="form-control" id="descripcion" placeholder="Ingrese la descripción del producto" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="imagen" className="form-label">Imagen</label>
                            <input type="file" className="form-control" id="imagen" aria-describedby="imagenHelp" onChange={handleImagenChange} multiple />
                            <div id="imagenHelp" className="form-text">Selecciona una o varias imagenes del producto</div>
                        </div>
                        <div>
                            <label htmlFor="precio" className="form-label mt-4">Precio</label>
                            <input type="number" className="form-control" id="precio" placeholder="Ingrese el precio del producto" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="contacto" className="form-label mt-4">Contacto</label>
                            <input type="text" className="form-control" id="contacto" placeholder="Ingrese el contacto del producto" value={contacto} onChange={(e) => setContacto(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="cantidad" className="form-label mt-4">Cantidad</label>
                            <input type="number" className="form-control" id="cantidad" placeholder="Ingrese la cantidad del producto" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="categoria" className="form-label">Categoría</label>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="alimentos" id="categoriaAlimentos" onChange={handleCategoriaChange} />
                                <label className="form-check-label" htmlFor="categoriaAlimentos">Alimentos</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="electronica" id="categoriaElectronica" onChange={handleCategoriaChange} />
                                <label className="form-check-label" htmlFor="categoriaElectronica">Electrónica</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="ropa" id="categoriaRopa" onChange={handleCategoriaChange} />
                                <label className="form-check-label" htmlFor="categoriaRopa">Ropa</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="flores" id="categoriaFlores" onChange={handleCategoriaChange} />
                                <label className="form-check-label" htmlFor="categoriaFlores">Flores</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="accesorios" id="categoriaAccesorios" onChange={handleCategoriaChange} />
                                <label className="form-check-label" htmlFor="categoriaAccesorios">Accesorios</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="papeleria" id="categoriaPapeleria" onChange={handleCategoriaChange} />
                                <label className="form-check-label" htmlFor="categoriaPapeleria">Papeleria</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="regalos" id="categoriaRegalos" onChange={handleCategoriaChange} />
                                <label className="form-check-label" htmlFor="categoriaRegalos">Regalos</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="otra" id="categoriaOtra" onChange={handleCategoriaChange} />
                                <label className="form-check-label" htmlFor="categoriaOtra">Otra</label>
                            </div>

                        </div>
                        <div className='text-center'>
                            <button type="submit" className="btn btn-primary mt-4">Actualizar</button>
                            <NavLink to="/productos"><button type="button" className="btn btn-primary mt-4 ms-2">Regresar</button></NavLink>
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    );
}

export default ActualizarProducto;
