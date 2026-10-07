import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Contact() {
    return (
        <>
            <NavBar />

            <main>
                <section className='contact_section'>
                    <h1>Contactez-moi</h1>
                    <div className="contact_info">
                        <h2>Mes informations</h2>
                        <p>Vous pouvez me contacter directement via les informations ci-dessous ou bien utiliser le formulaire</p>

                        <article className="article_mail">
                            <h3>Email</h3>
                            <p>gabrielbois2003@gmail.com</p>
                        </article>

                        <article className="article_tel">
                            <h3>Téléphone</h3>
                            <p>07.82.67.96.20</p>
                        </article>
                    </div>

                    <form>
                        <label htmlFor='name'>Nom</label>
                        <input type='text' id="name" placeholder="Entrer votre nom"/>
                        <label htmlFor='email'>Email</label>
                        <input type='text' id="email" placeholder="Entrer votre email"/>
                        <label htmlFor='email'>Message</label>
                        <textarea id="message" rows="6" placeholder="Votre message..."/>

                        <button type="submit">
                            Envoyer
                        </button>
                    </form>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Contact;