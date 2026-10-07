import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Connexion() {
    const handleSubmit = (event) => {
    event.preventDefault();

    // Ici tu pourras connecter ton formulaire
    // à ton backend ou ton API.
    console.log("Connexion envoyée");
  };

  return (
    <>
        <NavBar />

        <main>
            
        </main>

        <Footer />
    </>
  )
}