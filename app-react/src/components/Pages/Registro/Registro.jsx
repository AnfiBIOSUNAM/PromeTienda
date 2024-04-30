import gato from "../../../Images/cat.png";
import perro from "../../../Images/dog.png";
import arbol from "../../../Images/tree.png";
import '../CSS/Registro.css';
import '../CSS/Form.css'
import { useNavigate } from "react-router-dom";

export default function Registro() {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const nombre = e.target.nombre.value;
        const apPat = e.target.apPat.value;
        const apMat = e.target.apMat.value;
        const correo = e.target.correo.value;
        const telefono = e.target.telefono.value;
        const contraseña = e.target.contraseña.value;
        let imagen = e.target.imagen.value;
        let tipoCuenta = e.target.tipoCuenta.value;

        if(imagen === '1'){
            imagen = gato;
        } else if(imagen === '2'){
            imagen = perro;
        } else {
            imagen = arbol;
        }

        if(tipoCuenta === 'option1'){
            tipoCuenta = 0;
        } else {
            tipoCuenta = 1;
        }
        
        console.log(nombre, apPat, apMat, correo, telefono, contraseña, imagen, tipoCuenta);

        registro(nombre, apPat, apMat, correo, telefono, contraseña, imagen, tipoCuenta);

    }

    const registro = async (nombre, apPat, apMat, correo, telefono, contraseña, imagen, tipoCuenta) => {
        const formdata = new FormData();
        formdata.append('nombre', nombre);
        formdata.append('apPat', apPat);
        formdata.append('apMat', apMat);
        formdata.append('correo', correo);
        formdata.append('telefono', telefono);
        formdata.append('contraseña', contraseña);
        formdata.append('imagen', imagen);
        formdata.append('tipoCuenta', tipoCuenta);

        try{
            const response = await fetch(`http://localhost:5000/usuario/create`, {
                method: 'POST',
                body: formdata
            }).then((response) => response.json()).then((data) => {
                console.log(data);
                try{
                    if(data['error'] === "No se pudo crear el usuario"){
                        alert("No se pudo crear el usuario");
                    }else if(data['error'] === 'Faltan datos'){
                          alert("Faltan datos");
                    }else{
                        alert('Usuario creado correctamente')
                        console.log(data);
                        navigate('/')
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
    
    return(
        < >
        <h1>Registro de usuario</h1>
        <form class='m-5' onSubmit={handleSubmit}>
            <fieldset className="container">
            
            <div className="row">
                <div className="col-6">
                    <label for='nombre' class='form-label'>Nombre</label>
                    <input type='text' class='form-control' id='nombre' placeholder='Tu nombre aquí' required/>
                </div>
                <div className="col-6">
                    <label for='apPat' class='form-label'>Apellido paterno</label>
                    <input type='text' class='form-control' id='apPat' placeholder='Tu apellido aquí' required/>
                </div>
                <div className="col-6">
                    <label for='apMat' class='form-label'>Apellido materno</label>
                    <input type='text' class='form-control' id='apMat' placeholder='Tu apellido aquí' required/>
                </div>
                <div className="col-6">
                    <label for="correo" class="form-label">Correo electrónico</label>
                    <input type="email" class="form-control" id="correo" aria-describedby="emailHelp" placeholder="correo@ejemplo.com" required/>
                </div>
                <div className="col-6">
                    <label for="telefono" class="form-label">Teléfono</label>
                    <input type="tel" class="form-control" id="telefono" placeholder="Teléfono" required/>
                </div>
                <div className="col-6">
                    <label for="contraseña" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="contraseña" placeholder="Contraseña" autocomplete="off" required/>
                </div>
            </div>
                    <label for="imagen" class="form-label mt-4">Imagen de perfil</label>
                    <div className="radio">
                    <div>
                        <input class="form-check-input" type='radio' name='imagen' id='imagen1' value='1' checked/>
                        <img src={gato} alt='Gato' class='img-thumbnail' className="imagen-perfil"/>
                    </div>
                    <div>
                        <input class="form-check-input" type='radio' name='imagen' id='imagen2' value='2'/>
                        <img src={perro} alt='Perro' class='img-thumbnail' className="imagen-perfil"/>
                    </div>
                    <div>
                        <input class="form-check-input" type='radio' name='imagen' id='imagen3' value='3'/>
                        <img src={arbol} alt='Arbol' class='img-thumbnail' className="imagen-perfil"/>
                    </div>
                </div>
                <fieldset>
                <legend class="mt-4">Tipo de cuenta</legend>
                <div class="form-check">
                    <div>
                    <input class="form-check-input" type="radio" name="tipoCuenta" id="tipoCuenta1" value="option1" checked/>
                    <label class="form-check-label" for="tipoCuenta1">
                        Cliente
                    </label>
                    </div>
                    <div>
                    <input class="form-check-input" type="radio" name="tipoCuenta" id="tipoCuenta2" value="option2"/>
                    <label class="form-check-label" for="tipoCuenta2">
                        Vendedor
                    </label>
                    </div>
                </div>
                </fieldset>
                <div class='text-center'>
                <button type="submit" class="btn btn-primary black">Registrarse</button>
                </div>
            </fieldset>
        </form>
        </>
    )
}