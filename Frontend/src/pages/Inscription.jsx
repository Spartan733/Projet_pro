import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import '../styles/Inscription.scss'

function Inscription() {
    const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Formulaire envoyé");
  };

    return (
        <>
            <NavBar />
            
            <main>
                <section className="inscription">
                    <h1>Inscription</h1>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Nom</label>
                        <input type="text" id="name" placeholder="Entrer votre nom/pseudo" required/>

                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder="Entrer votre email" required/>

                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" id="password" placeholder="Entrer votre mot de passe" required/>


                        <button type="submit"> S'inscrire </button>
                    </form>

                    <p> Vous avez deja un compte ? <a href="/Connexion">Se connecter</a></p>

                </section>
            </main>

            <Footer />
        </>
    )
}

export default Inscription;