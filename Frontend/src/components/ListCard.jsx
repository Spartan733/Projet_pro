import CardConv from "./CardConv";
import "../styles/ListCard.scss";
import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";


function ListCard({ limite = 3 }) {
  const [cartes, setCartes] = useState([]);
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    async function chargerConventions() {
      try {
        const data = await apiRequest("/conventions");
        setCartes(data);
      } catch (error) {
        setErreur(error.message);
      } finally {
        setChargement(false);
      }
    }

    chargerConventions();
  }, []);

  if (chargement) {
    return <p>Chargement des conventions...</p>;
  }

  if (erreur) {
    return <p role="alert">{erreur}</p>;
  }

  return (
    <section>
      <h2>Liste des conventions</h2>

      <div className="list_card">
        {cartes.slice(0, limite).map((carte) => (
          <CardConv
            key={carte.id}
            {...carte}
          />
        ))}
      </div>
    </section>
  );
}

export default ListCard;