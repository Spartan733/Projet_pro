
import { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import "../styles/Connexion.scss";

function Connexion() {
  const navigate = useNavigate();
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErreur("");
    setChargement(true);

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    try {
      const data = await apiRequest("/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // Enregistrer la session
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("pseudo", data.user.name);

      // Redirection après connexion réussie
      navigate("/Connected");

    } catch (error) {
      setErreur(error.message);
    } finally {
      setChargement(false);
    }
  };

  return (
    <>
      <NavBar />

      <main>
        <section className="connexion">
          <h1>Connectez vous</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Entrer votre email"
              required
            />

            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Entrer votre mot de passe"
              required
            />

            {erreur && <p role="alert">{erreur}</p>}

            <button type="submit" disabled={chargement}>
              {chargement ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <p>Vous avez oublié votre mot de passe ?</p>
          <Link to="/MdpOublier">Changer de mot de passe</Link>

          <p>Vous n'avez pas encore de compte ?</p>
          <Link to="/Inscription">S'inscrire</Link>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Connexion;
