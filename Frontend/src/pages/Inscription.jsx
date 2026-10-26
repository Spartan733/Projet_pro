import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import '../styles/Inscription.scss'

function Inscription() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const pseudo = event.target.elements.name.value;

    sessionStorage.setItem("pseudo", pseudo);

    navigate("/Connected");
  };

    return (
        <>
            <NavBar />
            
            <main>
                <section className="inscription">
                    <h1>Inscription</h1>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Nom</label>
                        <input type="text" id="name" name="name" placeholder="Entrer votre nom/pseudo" required />

                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Entrer votre email" required/>

                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" id="password" placeholder="Entrer votre mot de passe" required/>


                        <button type="submit"> S'inscrire </button>
                    </form>

                    <p> Vous avez deja un compte ? <Link to="/Connexion">Se connecter</Link></p>

                </section>
            </main>

            <Footer />
        </>
    )
}

export default Inscription;