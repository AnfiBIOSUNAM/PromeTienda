import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import './Error.css';

export default function Error(){
    const error = useRouteError();
    return(
        <div id="error-page">
            <div className="fullscreen-shape"></div>

            <h1>Oops!</h1>
            <h2>Ha ocurrido un error inesperado</h2>
            <h3>
                <i>
                    {error.statusText || error.message}
                </i>
            </h3>
            <Link to='/'><button className="btn btn-secondary return">Go back home</button></Link>
        </div>
    )
}