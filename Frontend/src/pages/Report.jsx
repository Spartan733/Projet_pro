import { useState } from "react";
import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Report() {
    const [formData, setFormData] = useState({
        email: "",
        categorie: "",
        sujet: "",
        description: ""
    });

    const [message, setMessage] = useState("")

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...FormData,
            [name]: value,
        });
    };

    const handleSubmit = (event) =>{
        event.preventDefault();

        setMessage("Ton signalement a été préparé. Il reste à connecter le formulaire au serveur pour l'envoyer.")
    };
};

return(
    <>
        <NavBar />

        <main>
            <section className="section1">
                <h1>Signaler un problème</h1>
                <p>Tu rencontre un bug ou un problème ?
                    <br /> Dit le moi pour m'aider à améliorer le site.
                </p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Entrer votre adresse mail" value={formData.email} onChange={handleChange} required/>

                    <label htmlFor="categorie">Quel est le type du problème ?</label>
                    <select name="categorie" id="categorie" value={formData.categorie} onChange={handleChange} required>
                        <option value="">Choisir une catégorie</option>
                        <option value="bug">Bug technique</option>
                        <option value="connexion">Connexion ou inscription</option>
                        <option value="compte">Problème de compte</option>
                        <option value="contenue">Contenue innaproprié</option>
                        <option value="securite">Sécurité</option>
                        <option value="autre">Autre problème</option>
                    </select>

                    
                </form>
            </section>
        </main>

        <Footer />
    
    </>
)