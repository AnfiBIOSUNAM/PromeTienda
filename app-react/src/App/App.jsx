import './App.css';
import Root from '../components/Root/Root.jsx'
import { Home } from '../components/Pages/Home/Home.jsx';
import HomeUser from '../components/Pages/HomeUser/HomeUser.jsx';
import Login from '../components/Pages/Login/Login.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from '../components/Error.jsx';



const router = createBrowserRouter(
  [
    { 
      path: '/', 
      element: <Root />, 
      errorElement: <Error/>,
      children: [
        {path: '/', element: <Home/>},
        {path: '/login', element: <Login/>},
        {path: '/home', element: <HomeUser/>}
      ]
    },
    
  ]
)

export default function App() {

  return <RouterProvider router={router}/>
}
