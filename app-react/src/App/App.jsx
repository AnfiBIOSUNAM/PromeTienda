import './App.css';
import Root from '../components/Root/Root.jsx'
import { Home } from '../components/Pages/Home/Home.jsx';
import HomeUser from '../components/Pages/HomeUser/HomeUser.jsx';
import Login from '../components/Pages/Login/Login.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from '../components/Error.jsx';
import Registro from '../components/Pages/Registro/Registro.jsx';
import { useCookies } from 'react-cookie';

function NoPermissions({mensaje}){
  return(
    <>
    <h1>{mensaje}</h1>
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

  function ProtectedRoute({ element, mensaje }) {
    const isAuthenticated = isLogged(cookies);

    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    if (!isAuthenticated) {
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
        {path: '/home', element: <HomeUser/>}
      ]
    },
    
  ]
)

  return <RouterProvider router={router}/>
}
