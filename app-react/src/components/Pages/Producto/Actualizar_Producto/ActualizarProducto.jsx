import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


function ActualizarProducto() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [idProducto, setIdProducto] = useState('');
    const [nombreProducto, setNombreProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [foto, setFoto] = useState('');
    const [precio, setPrecio] = useState('');
    const [contacto, setContacto] = useState('');
    const [cantidad, setCantidad] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const idUsuario = cookies.user.idUsuario;
        console.log(idProducto,idUsuario, nombreProducto, descripcion, foto, precio, contacto, cantidad);
        alert(idUsuario);
        actualizarProducto(idProducto, idUsuario,nombreProducto, descripcion, foto, precio, contacto, cantidad);
    };

    const actualizarProducto = async (idProducto, idUsuario,nombreProducto, descripcion, foto, precio, contacto, cantidad) => {
        const formdata = new FormData();
        formdata.append('idProducto', idProducto);
        formdata.append('idUsuario', idUsuario);
        formdata.append('nombreProducto', nombreProducto);
        formdata.append('descripcion', descripcion);
        formdata.append('foto', foto);
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
                if (data['error']=== "No se pudo actualizar producto") {
                    alert("No se pudo actualizar el producto");
                } else if (data['error']=== "No autorizado para actualizar producto"){
                    alert("No tienes autorización para actualizar dicho producto");
                } else {
                    alert('Producto actualizado correctamente');
                    console.log(data);
                    navigate('/productos'); // Navegar a la página de productos después de actualizar el producto
                }
        } catch (error) {
                console.log(error);
            }
        }); 
        
    }catch (error) {
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
                            <input type="text" className="form-control" id="idProducto" placeholder="Ingrese el ID del producto" value={idProducto} onChange={(e) => setIdProducto(e.target.value)} required/>
                        </div>
                        <div>
                            <label htmlFor="nombreProducto" className="form-label mt-4">Nombre del Producto</label>
                            <input type="text" className="form-control" id="nombreProducto" placeholder="Ingrese el nombre del producto" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="descripcion" className="form-label mt-4">Descripción</label>
                            <textarea className="form-control" id="descripcion" placeholder="Ingrese la descripción del producto" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="foto" className="form-label mt-4">Foto</label>
                            <input type="file" className="form-control" id="foto" accept="image/*" onChange={(e) => setFoto(e.target.files[0])} />
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
