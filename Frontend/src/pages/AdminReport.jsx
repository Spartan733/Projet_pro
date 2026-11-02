import { useState } from "react";
import NavBarAdmin from "../components/NavBarAdmin";
import Footer from "../components/Footer";

export default function AdminReport(){
    const [report, setReports] = useState([
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

    const [filter, setFilter] = useState("Tous");

    function statusChange(id){
        const newListe = report.map((report) => 
            report.id === id ? { ...report, statut: "Resolu" } : report 
        );
        
        setReports(newListe);
    }

    function deleteRepor(id) {
    const nouvelleListe = signalements.filter(
      (signalement) => signalement.id !== id
    );

    setSignalements(nouvelleListe);
  }

    return(
        <>
            <NavBarAdmin />

            <section className="main_report">
                <h1>Gestion des Signalements</h1>

                <p>Apperçu des signalements de TsunaCrew</p>

                <div className="report_details">
                    <article className="report_stats">
                        <h2>{report.length}</h2>
                        <span>Total</span>

                        <button></button>
                    </article>

                    <article>
                        <h2>Signalements </h2>
                    </article>
                </div>

        

            </section>

            <Footer />
        </>
    )
    
}