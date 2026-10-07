import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Inscription() {
    const handleSubmit = (event) => {
    event.preventDefault();

    // Ici tu pourras ajouter l'inscription
    // avec ton backend ou ton API.
    console.log("Formulaire envoyé");
  };

    return (
        <>
            <NavBar />
            
            <main>
                <section className="inscription">
                    <h1>Inscriprion</h1>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Nom</label>
                        <input type="text" id="name" placeholder="Entrer votre nom/pseudo" required/>

                        <label htmlFor="name">Email</label>
                        <input type="text" id="email" placeholder="Entrer votre email" required/>

                        <label htmlFor="name">Mot de passe</label>
                        <input type="password" id="password" placeholder="Entrer votre mot de passe" required/>

                        <label htmlFor="name">Mot de passe</label>
                        <input type="password" id="confirmPassword" placeholder="Confirmer votre mot de passe" required/>

                        <button type="submit">
                            S'inscrire
                        </button>
                    </form>

                    <p>Vous avez deja un compte ? {" "}
                        <a href="/Connexion">Se connecter</a>

                    </p>

                </section>
            </main>

            <Footer />
        </>
    )
}

export default Inscription;