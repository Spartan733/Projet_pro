import { useState } from "react";
import NavBarUser from "../components/NavBarUser";
import FooterUser from "../components/FooterUser";
import "../styles/Team.scss";

export default function Teams() {
  const [equipes, setEquipes] = useState([
    { id: 1, nom: "Team Naruto", membres: 5 },
    { id: 2, nom: "Team One Piece", membres: 8 },
    { id: 3, nom: "Team Demon Slayer", membres: 4 },
  ]);

  const [nomEquipe, setNomEquipe] = useState("");
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);

  function creerEquipe(event) {
    event.preventDefault();

    if (nomEquipe.trim() === "") return;

    const nouvelleEquipe = {
      id: Date.now(),
      nom: nomEquipe.trim(),
      membres: 1,
    };

    setEquipes([...equipes, nouvelleEquipe]);
    setNomEquipe("");
    setAfficherFormulaire(false);
  }

  return (
    <>
      <NavBarUser />

      <main className="teams_main">
        <h1>Les équipes TsunaCrew</h1>

        <p>Retrouve les équipes déjà créées !</p>

        <button
          className="btn_creer"
          onClick={() => setAfficherFormulaire(!afficherFormulaire)}
        >
          Créer mon équipe
        </button>

        {afficherFormulaire && (
          <form onSubmit={creerEquipe} className="teams_form">
            <label htmlFor="nomEquipe">Nom de ton équipe</label>

            <input
              id="nomEquipe"
              type="text"
              placeholder="Ex : Team Dragon Ball"
              value={nomEquipe}
              onChange={(event) => setNomEquipe(event.target.value)}
              required
            />

            <button type="submit">Valider</button>
          </form>
        )}

        <h2>Équipes disponibles</h2>

        <div className="teams_liste">
          {equipes.map((equipe) => (
            <article className="teams_card" key={equipe.id}>
              <h3>{equipe.nom}</h3>
              <p>{equipe.membres} membre(s)</p>

              <button type="button">Voir l'équipe</button>
            </article>
          ))}
        </div>
      </main>

      <FooterUser />
    </>
  );
}