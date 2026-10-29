import NavBarUser from "../components/NavBarUser";
// import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import ListCard from "../components/ListCard";
import FooterUser from "../components/FooterUser";
import "../styles/Connected.scss";



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

                <p>Voici les informations que tu as besoins</p>

                <h2>Conventions auxquel tu participe :</h2>
                <ListCard limite={1} />


                <h2>Tes teams : </h2>
            </section>

            <FooterUser />
        </>
    )
}



export default Connected;