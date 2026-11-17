import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Users,
  CalendarDays,
  Pencil,
  MapPin,
  FileText,
  Camera
} from "lucide-react";

import NavBarUser from "../components/NavBarUser";
import FooterUser from "../components/FooterUser";
import { apiRequest } from "../services/api";
import "../styles/Profil.scss";

export default function Profil() {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [modification, setModification] = useState(false);
  const [chargement, setChargement] = useState(true);
  const [enregistrement, setEnregistrement] = useState(false);
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState("");

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setChargement(false);
      return;
    }

    let actif = true;

    async function chargerProfil() {
      try {
        const data = await apiRequest("/users/profil");

        if (!actif) return;

        setUser(data);
        setName(data.name || "");
        setEmail(data.email || "");
        setCity(data.city || "");
        setDescription(data.description || "");
      } catch (error) {
        if (actif) setErreur(error.message);
      } finally {
        if (actif) setChargement(false);
      }
    }

    chargerProfil();

    return () => {
      actif = false;
    };
  }, [token]);

  const choisirPhoto = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const types = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!types.includes(file.type)) {
      setErreur("Choisis une image JPG, PNG ou WebP");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErreur("La photo ne doit pas dépasser 2 Mo");
      event.target.value = "";
      return;
    }

    setErreur("");
    console.log("NOUVELLE PHOTO :", file.name)
    
    setAvatar(file);
  };

  const modifierProfil = async (event) => {
    event.preventDefault();

    setErreur("");
    setSucces("");
    setEnregistrement(true);

    try {
      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("city", city.trim());
      formData.append("description", description.trim());

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const data = await apiRequest("/users/modifie", {
        method: "PUT",
        body: formData
      });

      setUser(data.user);
      setName(data.user.name);
      setEmail(data.user.email);
      setCity(data.user.city || "");
      setDescription(data.user.description || "");
      setAvatar(null);

      sessionStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      sessionStorage.setItem("pseudo", data.user.name);

      setModification(false);
      setSucces("Profil modifié avec succès !");
    } catch (error) {
      setErreur(error.message);
    } finally {
      setEnregistrement(false);
    }
  };

  const annulerModification = () => {
    setName(user.name);
    setEmail(user.email);
    setCity(user.city || "");
    setDescription(user.description || "");
    setAvatar(null);
    setModification(false);
    setErreur("");
  };

  if (!token) {
    return <Navigate to="/Connexion" replace />;
  }

  if (chargement) {
    return (
      <>
        <NavBarUser />
        <main className="profil_main">
          <p>Chargement du profil...</p>
        </main>
        <FooterUser />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <NavBarUser />
        <main className="profil_main">
          <p role="alert">
            {erreur || "Profil introuvable"}
          </p>
        </main>
        <FooterUser />
      </>
    );
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
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt="Photo de profil"
                className="profil_avatar"
              />
            ) : (
              <UserRound size={55} />
            )}
          </div>

          <h2>{user.name}</h2>

          <span className="profil_badge">
            Membre TsunaCrew
          </span>

          {erreur && (
            <p className="profil_erreur" role="alert">
              {erreur}
            </p>
          )}

          {succes && (
            <p className="profil_succes" role="status">
              {succes}
            </p>
          )}

          {modification ? (
            <form
              className="profil_form"
              onSubmit={modifierProfil}
            >
              <label htmlFor="profil-name">Pseudo</label>
              <input
                id="profil-name"
                type="text"
                value={name}
                maxLength={100}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label htmlFor="profil-email">
                Adresse email
              </label>
              <input
                id="profil-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="profil-city">
                Ville
              </label>
              <input
                id="profil-city"
                type="text"
                value={city}
                maxLength={100}
                placeholder="Ex : Paris"
                onChange={(e) => setCity(e.target.value)}
              />

              <label htmlFor="profil-description">
                Description
              </label>
              <textarea
                id="profil-description"
                value={description}
                maxLength={1000}
                rows={5}
                placeholder="Parle-nous un peu de toi..."
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />

              <label htmlFor="profil-avatar">
                Photo de profil
              </label>

              <div className="profil_upload">
                <Camera size={20} />

                <input
                  id="profil-avatar"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={choisirPhoto}
                />
              </div>

              {avatar && (
                <p className="profil_photo_nom">
                  Photo sélectionnée : {avatar.name}
                </p>
              )}

              <button
                className="profil_modifier"
                type="submit"
                disabled={enregistrement}
              >
                {enregistrement
                  ? "Enregistrement..."
                  : "Enregistrer les modifications"}
              </button>

              <button
                className="profil_annuler"
                type="button"
                onClick={annulerModification}
                disabled={enregistrement}
              >
                Annuler
              </button>
            </form>
          ) : (
            <>
              <div className="profil_detail">
                <article className="pseudo">
                  <UserRound />
                  <div>
                    <strong>Pseudo</strong>
                    <p>{user.name}</p>
                  </div>
                </article>

                <article className="mail">
                  <Mail />
                  <div>
                    <strong>Email</strong>
                    <p>{user.email}</p>
                  </div>
                </article>

                <article className="ville">
                  <MapPin />
                  <div>
                    <strong>Ville</strong>
                    <p>{user.city || "Non renseignée"}</p>
                  </div>
                </article>

                <article className="description">
                  <FileText />
                  <div>
                    <strong>À propos de moi</strong>
                    <p>
                      {user.description ||
                        "Aucune description"}
                    </p>
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

              <button
                className="profil_modifier"
                type="button"
                onClick={() => {
                  setErreur("");
                  setSucces("");
                  setModification(true);
                }}
              >
                <Pencil size={18} />
                Modifier mon profil
              </button>
            </>
          )}
        </section>
      </main>

      <FooterUser />
    </>
  );
}
