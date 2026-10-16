import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Pourquoi() {
    return (
        <>
            <NavBar />

            <main>
                <section className="section1">
                    <span>L'origine de TsunaCrew</span>
                    <h1>Pourquoi ce projet ?</h1>

                    <p>TsunaCrew est né d'une simple idée: créer un espace ou tout les fans de Japon, d'animés et de mangas peuvent se réunir, echanger, créer des groupes et participer a des conventions. Etant moi même un fan de tout cela, je sais comme il est frustrant pour certain d'allez a des conventions seuls et de ne pas pouvoir discuter et débattre de certains animés, mangas ou bien projet concernant cette culture.</p>
                </section>

                <section className="section2">
                    <div className="why-card">
                        <h2>Une idée de départ</h2>
                        <p>J'ai voulu imaginer une plateforme communautaire qui rassemble les personnes autour de cette passions que sont les animés, les mangas et le cosplay, permettant ainsi a ceux qui le veulent de pouvoir participer seul ou a plusieurs a des conventions.</p>
                    </div>
                </section>

                <section className="section3">
                    <div className="why-card">
                        <h2>Créer du lien</h2>
                        <p>Internet permet de rencontrer des personnes qui partragent la même passion et les mêmes intérets. TsunaCrew a pour objectif de faciliter ces rencontres entre fans de japanimes et d'encourager les échanges entres les membres.</p>
                    </div>
                </section>

                <section className="section4">
                    <div className="why-card">
                        <h2>Apprendre et évoluer</h2>
                        <p>Ce projet est également une occasion pour moide développer mes compétences, de relever des défis techniqueset de construire une plateformequi pourra je l'espère, évoluer avec sa communauté.</p>
                    </div>
                </section>

                <section className="section5">
                    <div className="why-card">
                        <h2>Mon objectif</h2>
                        <p>Mon objectif est de faire de TsunaCrew un lieu de partage, de découverte et d'entraide, la ou la passionsrapprochent les fans et ou chacun peut contribuer a la communauté</p>
                    </div>

                    <a href="/Inscription" className="why-btn">Rejoignez des maintenant la communauté</a>
                </section>
            </main>

            <Footer />

        </>
    )
}

export default Pourquoi;