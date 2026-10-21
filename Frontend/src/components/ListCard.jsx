import CardConv from "./CardConv";
import "../styles/ListCard.scss"

function ListCard() {
    const cartes = [
        {
            id: 1,
            name: "Convention",
            date_start: "10-06-2027",
            date_end: "12-06-2027",
            city: "Paris",
            location: "Rue Générale de Gaulle",
            description: "Une convention à Paris.",
            images: "",
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
            images: "",
            website: "",
        },
        {
            id: 3,
            name: "Convention de Strasbourg",
            date_start: "15-10-2027",
            date_end: "18-10-2027",
            city: "Strasbourg",
            location: "Place Pierre Lefebre",
            description: "Une convention à Strasbourg.",
            images: "",
            website: "",
        },
    ];

    return (
        <section>
            <h2>Liste des conventions</h2>

            <div className="list_card">
                {cartes.map((carte) => (
                    <CardConv
                        key={carte.id}
                        name={carte.name}
                        date_start={carte.date_start}
                        date_end={carte.date_end}
                        city={carte.city}
                        location={carte.location}
                        description={carte.description}
                        images={carte.images}
                        website={carte.website}
                    />
                ))}
            </div>
        </section>
    );
}

export default ListCard;