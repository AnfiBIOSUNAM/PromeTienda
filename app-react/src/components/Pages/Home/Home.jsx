import './Home.css';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export function Home() {

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.user){
      navigate('/home')
    }
  },[])


  return (
    <>
    <div className='fullscreen-shape'></div>
      <h1>Página de inicio</h1>
    
    </>
  );
}