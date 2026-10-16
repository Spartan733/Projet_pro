import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
// import "./APropos.scss";

function APropos() {
  return (
    <>
      <NavBar />

      <main>
        <section className="about">
          <span>À propos de moi</span>

          <h1>Bienvenue chez TsunaCrew</h1>

          <p>Une application communautaire qui permet de rassemblé les fans de japanim, pour participer a des conventions, ou bien pour créer des groupes de cosplay.</p>
        </section>

        <section className="about2">
          <article className="about-card">
            <h2>Ma mission</h2>

            <p>Créer une application communautaire où chacun peut signaler qu'il participe a une convention, créer et inviter des amis dans des groupes pour participer aux conventions ou des groupes cosplays.</p>
          </article>

          <article className="about-card">
            <h2>Notre communauté</h2>

            <p> TsunaCrew rassemble des personnes qui partagent la même passions,discuter, se cosplayer et faire vivre une communautéqui ont les mêmes passions.</p>
          </article>

          <article className="about-card">
            <h2>Mon ambition</h2>

            <p>Faire évoluer la plateforme pour que les utilisateurs puissent partager entre eux, se regrouper et participer en groupe ou seul lors de conventions ou lors d'évènement.</p>
          </article>
        </section>

        <section className="about3">
          <h2>Envie de nous rejoindre ?</h2>

          <p>Inscris-toi et découvre la communauté TsunaCrew.</p>

          <a href="/Inscription" className="about-btn"> Créer un compte </a>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default APropos;