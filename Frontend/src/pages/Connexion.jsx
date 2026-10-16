import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import '../styles/Connexion.scss';

function Connexion() {
    const handleSubmit = (event) => {
    event.preventDefault();

    // console.log("Connexion envoyée");
  };

  return (
    <>
        <NavBar />

        <main>
          <section className="connexion">
            <h1>Connectez vous</h1>

            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Entrer votre email" required/>

              <label htmlFor="password">Mot de passe</label>
              <input type="password" id="password" name="password" placeholder="Entrer votre mot de passe" required />

              <button type="submit">Se connecter</button>
            </form>

            <p>Vous avez oublier votre mot de passe ?</p>
            <Link to="/MdpOublier">Changer de mot de passe </Link>
          
            <p>Vous n'avez pas encore de compte ?</p>
            <Link to="/Inscription">S'inscrire</Link>
          </section>
        </main>

        <Footer />
    </>
  )
}

export default Connexion