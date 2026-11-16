import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiRequest } from "../services/api";
import '../styles/Inscription.scss'


function Inscription() {
  const navigate = useNavigate();
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErreur("");
    setChargement(true);

    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    try {
      const data = await apiRequest("/users/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password
        }),
      });

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("pseudo", data.user.name);

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
        <section className="inscription">
          <h1>Inscription</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
            />

            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              required
            />

            {erreur && <p role="alert">{erreur}</p>}

            <button type="submit" disabled={chargement}>
              {chargement ? "Inscription..." : "S'inscrire"}
            </button>
          </form>

          <p>
            Vous avez déjà un compte ?{" "}
            <Link to="/Connexion">Se connecter</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Inscription;