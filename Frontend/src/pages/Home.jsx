import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Home() {
    return (
        <>
            <NavBar />

            <main>
                <section className='find'>
                    <h1>Trouve ta team, vis tes conventions ensemble</h1>
                    <p>Rencontre des passionnées de manga, anime et cosplays, découvre les conventions prés de chez toi et crée ta propre team</p>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Home;