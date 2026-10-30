import { Navigate } from "react-router-dom";
import { UserRound, Mail, Users, CalendarDays, Pencil } from "lucide-react";
import NavBarUser from "../components/NavBarUser";
import FooterUser from "../components/FooterUser";
import "../styles/Profil.scss";

export default function Profil() {
  const pseudo = sessionStorage.getItem("pseudo");

  if (!pseudo) {
    return <Navigate to="/Connexion" replace />;
  }

  return (
    <>
      <NavBarUser />

      <main className="profil_main">
        <h1>Mon profil</h1>
        <p className="profil_sous_titre">
          Retrouve tes informations personnelles
        </p>

        <section className="profil_card">
          <div className="profil_img">
            <UserRound size={55} />
          </div>

          <h2>{pseudo}</h2>
          <span className="profil_badge">Membre TsunaCrew</span>

          <div className="profil_detail">
            <article className="pseudo">
              <UserRound />
              <div>
                <strong>Pseudo</strong>
                <p>{pseudo}</p>
              </div>
            </article>

            <article className="mail">
              <Mail />
              <div>
                <strong>Email</strong>
                <p>Non renseigné</p>
              </div>
            </article>

            <div className="team">
              <Users />
              <div>
                <strong>Mon équipe</strong>
                <p>Aucune équipe</p>
              </div>
            </div>

            <div className="convention">
              <CalendarDays />
              <div>
                <strong>Mes conventions</strong>
                <p>Aucune convention</p>
              </div>
            </div>
          </div>

          <button className="profil_modifier" type="button" disabled>
            <Pencil size={18} />
            Modifier mon profil
          </button>
          <p className="profil_a_venir">
            Modification du profil bientôt disponible
          </p>
        </section>
      </main>

      <FooterUser />
    </>
  );
}