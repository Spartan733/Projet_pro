import { useState } from "react";
import NavBarAdmin from "../components/NavBarAdmin";
import Footer from "../components/Footer";

export default function AdminReport(){
    const [report, setReport] = useState([
        {
            id: 1,
            pseudo: "Jiro",
            subject: "Problème de connexion",
            date: "28/10/2026",
            statut: "En attente",
        },
        {
            id: 2,
            pseudo: "Alex",
            subject: "Je n'arrive pas à me connecter a mon compte",
            date: "28/10/2026",
            statut: "En attente",
        },
    ]);

    return(
        <>
            <NavBarAdmin />

            <section className="main_report">
                <h1>Gestion des Signalements</h1>

                <p>Apperçu des signalements de TsunaCrew</p>

                <div>
                    <article className="report_stats">
                        <h2>{report.length}</h2>
                        <span>Total</span>
                    </article>
                </div>

            </section>

            <Footer />
        </>
    )
    
}