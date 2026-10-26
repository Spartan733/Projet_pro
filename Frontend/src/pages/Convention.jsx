import { useParams, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function ConventionsDetails() {
    const { id } = useParams();

    const convention = conventions.find(
        (item) => String(item.id) === id
    );

    if(!convention) {
        return (
      <main className="convention-details">
        <h1>Convention introuvable</h1>
        <Link to="/">Retour aux conventions</Link>
      </main>
    );
  }

    return(
        <>
            <NavBar />

            <main className="conv_detail">
                <Link to="/">Retour aux conventions</Link>
                <article>
                    {convention.images && (
                        <img src="{convention.images}" alt="{convention.name}" />
                    )}
                </article>
                <div className="conv_detail_content">
                    <h1>{Convention.name}</h1>

                    <p>
                        <strong>Dates :</strong>{" "}
                        Du {convention.date_start} au {convention.date_end}
                    </p>
                    <p>
                        <strong>Ville : {convention.city}</strong>
                    </p>
                    <p>
                        <strong>Lieu : {convention.location}</strong>
                    </p>

                    <article>
                        <h2>Description</h2>
                        <p>{convention.description}</p>
                    </article>

                    {convention.website && (
                        <a href={convention.website} target="_blank" rel="noopener noreferrer" className="website-button" >
                            Visiter le site officiel ↗
                        </a>
                    )}
                </div>
            </main>

            <Footer />
        </>
    )
}   