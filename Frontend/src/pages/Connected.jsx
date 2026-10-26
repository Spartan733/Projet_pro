import NavBarUser from "../components/NavBarUser";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";


function Connected() {
    const navigate = useNavigate();
    const pseudo = sessionStorage.getItem("pseudo");

    if(!pseudo) {
        return <Navigate to="/Connexion" replace />
    }

    function deconnexion() {
        sessionStorage.removeItem("pseudo");
        navigate("/Connexion");
    }

    return(
        <>
            <NavBarUser />

            <section className="connected_main">
                <h1>Bienvenue sur Tsunacrew {pseudo}</h1>

                <p>Tu es maintenant connecté a ton espace personnel.</p>

            </section>

            <Footer />
        </>
    )
}



export default Connected;