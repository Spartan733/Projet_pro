import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { apiRequest } from "../services/api";

function Conventions() {
  const { id } = useParams();

  const [convention, setConvention] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    let actif = true;

    const chargerConvention = async () => {
      setChargement(true);
      setErreur("");
      setConvention(null);

      try {
        const data = await apiRequest(
          `/conventions/${id}`
        );

        if (actif) {
          setConvention(data);
        }
      } catch (error) {
        if (actif) {
          setErreur(
            error.message ||
            "Impossible de charger la convention"
          );
        }
      } finally {
        if (actif) {
          setChargement(false);
        }
      }
    };

    chargerConvention();

    return () => {
      actif = false;
    };
  }, [id]);

  return (
    <>
      <NavBar />

      <main className="conv_detail">
        <Link to="/">
          Retour aux conventions
        </Link>

        {chargement ? (
          <p>Chargement de la convention...</p>
        ) : erreur ? (
          <p>{erreur}</p>
        ) : !convention ? (
          <h1>Convention introuvable</h1>
        ) : (
          <>
            <article>
              {convention.images && (
                <img
                  src={convention.images}
                  alt={convention.name}
                />
              )}
            </article>

            <div className="conv_detail_content">
              <h1>{convention.name}</h1>

              <p>
                <strong>Dates : </strong>
                Du {convention.date_start} au{" "}
                {convention.date_end}
              </p>

              <p>
                <strong>Ville : </strong>
                {convention.city}
              </p>

              <p>
                <strong>Lieu : </strong>
                {convention.location}
              </p>

              <article>
                <h2>Description</h2>
                <p>{convention.description}</p>
              </article>

              {convention.website && (
                <a
                  href={convention.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="website-button"
                >
                  Visiter le site officiel ↗
                </a>
              )}
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Conventions;
