import './App.css';
import Root from '../components/Root/Root.jsx'
import { Home } from '../components/Pages/Home/Home.jsx';
import HomeUser from '../components/Pages/HomeUser/HomeUser.jsx';
import Login from '../components/Pages/Login/Login.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from '../components/Error.jsx';
import Registro from '../components/Pages/Registro/Registro.jsx';
import HomeProducto from '../components/Pages/Producto/HomeProducto.jsx';
import ActualizarProducto from '../components/Pages/Producto/Actualizar_Producto/ActualizarProducto.jsx';
import EliminarProducto from '../components/Pages/Producto/Eliminar_Producto/EliminarProducto.jsx';
import { useCookies } from 'react-cookie';
import RegistroP from '../components/Pages/RegistroProducto/RegistroP.jsx';
import VerProducto from '../components/Pages/Producto/Ver_Producto/Ver_Producto.jsx';
import Carrito from '../components/Pages/Carrito/Carrito.jsx'
import Detalle from '../components/Pages/DetalleProducto/Detalle.jsx';
import GaleriaVendedor from '../components/Pages/GaleriaVendedor/GaleriaVendedor.jsx';
import Perfil from '../components/Pages/Perfil/Perfil.jsx';
import Compras from '../components/Pages/Compras/Compras.jsx';
import Resenia from '../components/Pages/Resenias/ReseniaForm.jsx';

function NoPermissions({mensaje}){
  return(
    <>
      <div className="fullscreen-shape"></div>
      <h1 className='text-white m-5'>{mensaje}</h1>
    </>
  )
}


export default function App() {

  const [cookies, setCookie] = useCookies(['userToken']);

  function isLogged(){
    if (!cookies.user){
      return false;
    }
    return true;
  }

  function ProtectedRoute({ element, mensaje, condicion}) {
    const isAuthenticated = isLogged(cookies);

    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    if (!isAuthenticated || !condicion) {
      return <NoPermissions mensaje={mensaje}/>;
    }

    // Si el usuario está autenticado, renderiza el elemento de la ruta protegida
    return element;
  }

  function NoAuthentication({ element, mensaje}) {
    const isAuthenticated = isLogged(cookies);

    // Si el usuario está autenticado
    if (isAuthenticated) {
      return <NoPermissions mensaje={mensaje}/>;
    }

    // Si el usuario no está autenticado, renderiza el elemento de la ruta protegida
    return element;

  }


const router = createBrowserRouter(
  [
    { 
      path: '/', 
      element: <Root />, 
      errorElement: <Error/>,
      children: [
        {path: '/', element: <Home/>},
        {path: '/registro', element: <NoAuthentication element={<Registro/>} mensaje="Cierra sesión para acceder a esta página"/>},
        {path: '/login', element: <NoAuthentication element={<Login/>} mensaje="Cierra sesión para acceder a esta página"/>},
        {path: '/home', element: <ProtectedRoute element={<HomeUser/>} mensaje="Inicia sesión para acceder a esta página" condicion={true}/>},
        {path: '/productos', element:<HomeProducto/>},
        {path: '/productos/actualizar/:idProducto', element: <ProtectedRoute element={<ActualizarProducto/>} mensaje="Inicia sesión como vendedor para acceder a esta página" condicion={isLogged() && cookies.user['vendedor']===1}/>},
        {path: '/productos/eliminar/:idProducto', element: <ProtectedRoute element={<EliminarProducto/>} mensaje="Inicia sesión como vendedor para acceder a esta página" condicion={isLogged() && cookies.user['vendedor']===1}/>},
        {path: '/productos/registrar', element: <ProtectedRoute element={<RegistroP/>} mensaje="Inicia sesión como vendedor para acceder a esta página" condicion={isLogged() && cookies.user['vendedor']===1}/>},
        {path: '/productos/ver', element:<VerProducto/>},
        {path: '/resenia/:idCompra/:idProducto', element:<Resenia/>},
        {path: '/carrito', element:<ProtectedRoute element={<Carrito/>} mensaje="Inicia sesión para acceder a esta página" condicion={isLogged() && cookies.user['vendedor']===0}/>},
        {path: '/detalle/:product/:carrito', element:<Detalle/>},
        {path: '/galeria/:idVendedor', element: <GaleriaVendedor/>},
        {path: '/perfil', element: <ProtectedRoute element={<Perfil/>} mensaje="Inicia sesión para acceder a esta ruta" condicion={isLogged()}/>},
        {path: '/misCompras', element: <ProtectedRoute element={<Compras/>} mensaje={"Inicia sesión como cliente para accededr a esta ruta"} condicion={isLogged() && cookies.user['vendedor']===0}/>}

      ]
    },
    
  ]
)

  return <RouterProvider router={router}/>
}
