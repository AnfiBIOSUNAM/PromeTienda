import { Outlet } from "react-router-dom";
import Navigation from './Navigation/Navigation.jsx'
import Footer from "./Footer.jsx/Footer.jsx";

export default function Root(){
    return(
        <>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navigation/>
                <main>
                    <Outlet/>
                </main>
            </div>
            <Footer/>
        </>
    )
}