import { useState } from "react";
import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function MdpOublier() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        setMessage("Si un compte correspond à cette adresse, tu recevras un lien de réinitialisation");
    };

    return(
        <>
            <NavBar />

            <main>
                <section className="section1">
                    <h1>Mot de passe oublié ?</h1>

                    <p> Tu as oublié ton mot de passe ?
                        <br />Entre ton adresse mail associé a ton compte.
                        <br />Tu recevras les instructions pour réinitialiser ton mot de passe.</p>

                    <form onsSubmit={handleSubmit}>
                        <label htmlFor="email"></label>
                        <input type="text" id="email" placeholder="Entrer votre adresse mail" value={email} onChange={(event) => setEmail(event.target.value)} required/>

                        <button type="submit">Valider</button>
                    </form>
                    {message && (<p>{message}</p>)}

                    <Link to="/Connexion">Retour à la Connexion</Link>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default MdpOublier