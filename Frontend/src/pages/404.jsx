import { Link, useNavigate } from 'react-router-dom';

import NavBarUser from '../components/NavBarUser';
import FooterUser from '../components/FooterUser';

import '../styles/404.scss';

export default function Page404() {
  const navigate = useNavigate();

  function retour() {
    navigate(-1);
  }

  return (
    <>
      <NavBarUser />

      <section className="section_page404">
        <div className="page404_container">

          <article className="page404_error">
            <span>4</span>
            <span className="page404_zero">0</span>
            <span>4</span>
          </article>

          <h1>Oups ! Page introuvable</h1>

          <h2>
            Cette page a disparu dans un autre univers !
          </h2>

          <p>
            Même les plus grands héros de manga
            ne pourraient pas retrouver cette page.
          </p>

          <p>
            Elle a peut-être été déplacée,
            supprimée ou son adresse est incorrecte.
          </p>

          <article className="page404_buttons">

            <Link to="/" className="page404_btn_home"> Retour à l'accueil </Link>

            <button type="button" className="page404_btn_back" onClick={retour} >
              Page précédente
            </button>

          </article>

          <article className="page404_message">
            <p>⚔️ Ta prochaine aventure t'attend sur TsunaCrew !</p>
          </article>

        </div>
      </section>

      <FooterUser />
    </>
  );
}

