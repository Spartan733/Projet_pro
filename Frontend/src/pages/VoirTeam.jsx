import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Users, UserRound, ArrowLeft } from "lucide-react";
import NavBarUser from "../components/NavBarUser";
import FooterUser from "../components/FooterUser";
import "../styles/VoirTeams.scss";

export default function VoirEquipe() {
  const { id } = useParams();

  const pseudo = sessionStorage.getItem("pseudo");

  const equipes = [
    { id: 1, nom: "Team Naruto" },
    { id: 2, nom: "Team One Piece" },
    { id: 3, nom: "Team Demon Slayer" },
  ];

  const equipe = equipes.find((e) => e.id === Number(id));

  const [membres, setMembres] = useState(() => {
    const sauvegarde = localStorage.getItem(`equipe_${id}`);
    return sauvegarde ? JSON.parse(sauvegarde) : [];
  });

  // Rejoindre l'équipe
  function rejoindreEquipe() {
    if (!pseudo || membres.includes(pseudo)) return;

    const nouveauxMembres = [...membres, pseudo];

    setMembres(nouveauxMembres);

    localStorage.setItem(
      `equipe_${id}`,
      JSON.stringify(nouveauxMembres)
    );
  }

  return (
    <>
      <NavBarUser />

      <main className="voir_equipe_main">
        <Link to="/Equipe" className="retour_equipes">
          <ArrowLeft size={20} />
          Retour aux équipes
        </Link>

        {equipe ? (
          <>
            <section className="equipe_presentation">
              <div className="equipe_icone">
                <Users size={45} />
              </div>

              <h1>{equipe.nom}</h1>

              <p>{membres.length} membre(s)</p>

              {pseudo && !membres.includes(pseudo) && (
                <button
                  className="btn_rejoindre"
                  onClick={rejoindreEquipe}
                >
                  Rejoindre l'équipe
                </button>
              )}
            </section>

            <h2>Les membres de l'équipe</h2>

            <div className="liste_membres">
              {membres.length > 0 ? (
                membres.map((membre) => (
                  <article className="membre_card" key={membre}>
                    <div className="membre_avatar">
                      <UserRound size={28} />
                    </div>

                    <div>
                      <h3>{membre}</h3>
                      <p>Membre de l'équipe</p>
                    </div>
                  </article>
                ))
              ) : (
                <p>Aucun membre pour le moment.</p>
              )}
            </div>
          </>
        ) : (
          <p>Cette équipe n'existe pas.</p>
        )}
      </main>

      <FooterUser />
    </>
  );
}