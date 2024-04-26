export default function Registro() {
    
    return(
        < >
        <h1>Login</h1>
        <form class='m-5'>
            <fieldset>
            
                <div>
                    <label for='nombre' class='col-sm-2 col-form-label'>Nombre</label>
                    <input type='text' class='form-control' id='nombre' placeholder='Tu nombre aquí' required/>
                </div>
                <div>
                    <label for='apPat' class='col-sm-2 col-form-label'>Apellido paterno</label>
                    <input type='text' class='form-control' id='apPat' placeholder='Tu apellido aquí' required/>
                </div>
                <div>
                    <label for='apMat' class='col-sm-2 col-form-label'>Apellido materno</label>
                    <input type='text' class='form-control' id='apMat' placeholder='Tu apellido aquí' required/>
                </div>
                <div>
                <label for="correo" class="form-label mt-4">Correo electrónico</label>
                <input type="email" class="form-control" id="correo" aria-describedby="emailHelp" placeholder="correo@ejemplo.com" required/>
                </div>
                <div>
                <label for="telefono" class="form-label mt-4">Teléfono</label>
                <input type="tel" class="form-control" id="telefono" placeholder="Teléfono" required/>
                </div>
                <div>
                <label for="contraseña" class="form-label mt-4">Contraseña</label>
                <input type="password" class="form-control" id="contraseña" placeholder="Contraseña" autocomplete="off" required/>
                </div>
                <div>
                <label for="imagen" class="form-label mt-4">Imagen de perfil</label>
                <input class="form-check-input" type='radio' name='imagen' id='imagen1'/>
                <img src='Images/image.png' alt='Imagen de perfil' class='img-thumbnail'/>
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
                <button type="submit" class="btn btn-primary">Login</button>
                </div>
            </fieldset>
        </form>
        </>
    )
}