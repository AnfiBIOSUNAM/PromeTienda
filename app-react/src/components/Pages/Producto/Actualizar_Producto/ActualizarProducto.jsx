import React from 'react';

function ActualizarProducto() {
    return (
        <>
            <div className="form-container">
                <h1>Agregar Nuevo Producto</h1>
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
                            <button type="button" className="btn btn-secondary mt-4 ms-2" onClick={() => window.history.back()}>Regresar</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    );
}

export default ActualizarProducto;
