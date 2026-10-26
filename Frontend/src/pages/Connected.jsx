import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link, Navigate, replace } from "react-router-dom";


function Connected() {
    const navigate = useNavigate();
    const pseudo = sessionStorage.getItem("pseudo");

    if(!pseudo) {
        return <Navigate to="/Frontend/src/pages/Connexion.jsx" replace />
    }

    function deconnexion() {
        sessionStorage.removeItem("pseudo");
        navigate("/Frontend/src/pages/Connexion.jsx");
    }

    return(
        <>
            <NavBar />

            <section className="connected_main">
                <h1>Bienvenue sur Tsunacrew {pseudo}</h1>

                <p>Tu es maintenant connect" a ton espace personnel.</p>

            </section>

            <Footer />
        </>
    )
}



export default Connected;