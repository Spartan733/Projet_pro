import NavBarAdmin from "../components/NavBarAdmin";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import '../styles/Admin.scss';
import { CalendarDays, ShieldAlert, Users, UserPlus, UserRound, ArrowRight } from "lucide-react";


function Admin() {
    const stats = [
        {
           title: "Users",
           number: 10,
           icone: <UserRound size={30} />
        },
        {
           title: "Conventions",
           number: 4,
           icone: <CalendarDays size={30} />
        },
        {
           title: "Equipes",
           number: 12,
           icone: <Users size={30} />
        },
        {
           title: "Signalements",
           number: 5,
           icone: <ShieldAlert size={30} />
        },
        
    ];

    const activities = [
        {
            id: 1,
            texte:"Un nouvelle utilisateur s'est inscrit",
            date: "Il y a 30 minutes",
            icone: <UserPlus size={30} />
        },
    ];

    const conventions = [
        {
            id: 1,
            name: "Convention",
            date_start: "10-06-2027",
            date_end: "12-06-2027",
            city: "Paris",
            location: "Rue Générale de Gaulle",
            description: "Une convention à Paris.",
            images: "../img/convention-cosplays.webp",
            website: "",
        },
        {
            id: 2,
            name: "Convention de Toulouse",
            date_start: "13-08-2027",
            date_end: "23-08-2027",
            city: "Toulouse",
            location: "Avenue Charles Leclerc",
            description: "Une convention à Toulouse.",
            images: "../img/Japan-Expo.webp",
            website: "",
        },

    ]

    return(
        <>
            <NavBarAdmin />

            <section className="admin_section">
              <article className="admin_bienvenue">
                <h1>Bonjour Admin 👋</h1>
                <p>Bienvenue sur le tableau de bord TsunaCrew.</p>
              </article>
            
              <article className="admin_section">
                <h2>Vue d'ensemble</h2>
            
                <div className="admin_statistiques">
                  {stats.map((stat) => (
                    <article className="admin_stat_card" key={stat.title}>
                      <div className="admin_stat_icone">
                        {stat.icone}
                      </div>
                    
                      <h3>{stat.number}</h3>
                      <p>{stat.title}</p>
                    </article>
                  ))}
                </div>
              </article>
                
              <article className="admin_section">
                <h2>Accès rapide</h2>
                
                <div className="admin_acces">
                  <Link to="/Admin/Conventions">
                    <CalendarDays size={24} />
                    <span>Gestion des conventions</span>
                    <ArrowRight size={20} />
                  </Link>
                
                  <Link to="/Admin/Groupes">
                    <Users size={24} />
                    <span>Gestion des groupes</span>
                    <ArrowRight size={20} />
                  </Link>
                
                  <Link to="/Admin/Signalements">
                    <ShieldAlert size={24} />
                    <span>Gestion des signalements</span>
                    <ArrowRight size={20} />
                  </Link>
                
                  <Link to="/Admin/Utilisateurs">
                    <UserRound size={24} />
                    <span>Gestion des utilisateurs</span>
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </article>
                
              <article className="admin_activities">
                <h2>Activité récente</h2>
                
                <div className="admin_activites">
                  {activities.map((activite) => (
                    <article
                      className="admin_activite_card"
                      key={activite.id}
                    >
                      <div className="admin_activities_icone">
                        {activite.icone}
                      </div>
                    
                      <div className="admin_activities_info">
                        <h3>{activite.texte}</h3>
                        <p>{activite.date}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </article>
                
              <article className="admin_conv">
                <h2>Prochaines conventions</h2>

                <div className="admin_conventions">
                  {conventions.map((convention) => (
                    <article
                      className="admin_convention_card"
                      key={convention.id}
                    >
                      <CalendarDays size={28} />

                      <h3>{convention.name}</h3>

                      <p>
                        <strong>Ville :</strong> {convention.city}
                      </p>

                      <p>
                        <strong>Adresse :</strong> {convention.location}
                      </p>

                      <p>
                        <strong>Date de début :</strong> {convention.date_start}
                      </p>

                      <p>
                        <strong>Date de fin :</strong> {convention.date_end}
                      </p>

                      <p>{convention.description}</p>
                    </article>
                  ))}
                </div>
            </article>
            </section>
                
            <Footer />
        </>
    )
}

export default Admin;