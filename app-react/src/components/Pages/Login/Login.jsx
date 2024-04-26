import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import '../../Style/Login.css'

export default function Login() {

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['userToken']);

    const handleSubmit = (e) => {
        e.preventDefault();
        const correo = e.target.correo.value;
        const contraseña = e.target.contraseña.value;
        login(correo, contraseña);
        //console.log(correo, contraseña);
        //const correo = document.getElementById('correo').value;
        //const contraseña = document.getElementById('contraseña').value;
    }

    const login = async (correo, contraseña) => {
        const formdata = new FormData();
        formdata.append('correo', correo);
        formdata.append('contraseña', contraseña);
        try{
            const response = await fetch(`http://localhost:5000/usuario/login`, {
                method: 'POST',
                body: formdata
            }).then((response) => response.json()).then((data) => {
                console.log(data);
                try{
                    if(data['error'] === "usuario_incorrecto"){
                        alert("Usuario inexistente");
                    }else if(data['error'] === "contraseña_incorrecta"){
                          alert("Contraseña incorrecta");
                    }else{
                        setCookie('userToken', data.correo, { path: '/', maxAge: 3600 * 24 * 7 });
                        setCookie('user', data, { path: '/', maxAge: 3600 * 24 * 7 });
                        navigate('/home', data)
                    }
                }catch(error){
                    console.log(error);
                }
            });
            
        }catch(error){
            console.log('Error en la petición');
            console.log(error);
            alert('Ocurrió un error inesperado, inténtalo más tarde')
        }
    }

    return (
        <>
        <div className="form-container">
        <h1>Login</h1>
        <form class='m-5' onSubmit={handleSubmit}>
            <fieldset>
                <div>
                <label for="correo" class="form-label mt-4">Correo electrónico</label>
                <input type="email" class="form-control" id="correo" aria-describedby="emailHelp" placeholder="correo@ejemplo.com" required/>
                </div>
                <div>
                <label for="contraseña" class="form-label mt-4">Contraseña</label>
                <input type="password" class="form-control" id="contraseña" placeholder="Contraseña" autocomplete="off" required/>
                </div>
                <div class='text-center'>
                <button type="submit" class="btn btn-primary">Login</button>
                </div>
                
            </fieldset>
        </form>
        </div>
        </>
    );
}
