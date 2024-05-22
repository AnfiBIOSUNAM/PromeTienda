import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from 'axios'
import "./Compras.css"

export default function Compras(){

    const [compras, setCompras] = useState([]);
    const [cookies, setCookies] = useCookies(['userToken']);

    useEffect(() => {
        const fetchCompras = async () => {
            try {
                const response = axios.get(`http://localhost:5000/compra/getConProductos/${cookies.user['idComprador']}`).then(
                    response => {
                        console.log(response.data);
                        if(response.data["error"]){
                            console.log("No se pudo hacer update")
                            
                        }else{
                            const updated = response.data.map(
                                compra => ({
                                        ...compra,
                                        productos: compra.productos.map(
                                            producto => ({
                                                ...producto,
                                                fotourl: `http://localhost:5000/imagenes/${producto.foto}`
                                            })
                                        )
                                    }
                                )
                            )
                            Promise.all(updated).then(
                                updated => {
                                    console.log(updated)
                                    setCompras(updated)
                                }
                            )
                        } 
                    }
                )
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCompras();
    }, []);

    return (
        <>
            <div className="fullscreen-shape"></div>
            <h1 className="text-white">Mis compras</h1>
            <div className="container">
                <div className="row">
                <table className="tabla">
                    <thead >
                        <tr>
                            <th className="th1">Fecha</th>
                            <th className="th1">Productos</th>
                            <th className="th1">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {compras.map(
                            compra => (
                                <tr className="tr1" key={compra.idCompra}>
                                    <td className="td1">{compra.fecha.substring(0,16)}</td>
                                    <td className="td1">
                                        <table className="tabla2">
                                            
                                            <tbody>
                                            {compra.productos.map(
                                                producto => (
                                                   
                                                <tr  key={producto.idProducto} >
                                                    <td>

                                                        <img src={`http://localhost:5000/imagenes/${producto.foto}`} alt={producto.nombre} className="img-compras"/>
                                                    </td>
                                                    <td>
                                                        <span className="ms-2">{producto.nombreProducto}</span>
                                                    </td>
                                                    <td>
                                                        <span className="ms-2">Cantidad: {producto.cantidad}</span>
                                                    </td>
                                                    <td>
                                                    <span>Importe: $ {producto.importe}</span>
                                                    </td>
                                                </tr>
                                                        
                                                    
                                                )
                                            )}
                                            </tbody>
                                        </table>
                                    </td>
                                    <td className="td1">$ {compra.total}</td>
                                </tr>)
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </>
    )
}