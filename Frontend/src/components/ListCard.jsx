import CardConv from "./CardConv";

function ListCard() {
    const cartes = [
        {
            id: 1,
            name: "Convention",
            date_start: "10-06-2027",
            date_end: "12-06-2027",
            city: "Paris",
            location: "Rue Générale de Gaulle",
            description: "ozhiguhzriughrziuhgierzug",
            images: "",
            website:""
        },
        {
            id: 2,
            name: "tarerfe",
            date_start: "13-08-2027",
            date_end: "23-08-2027",
            city: "Toulouse",
            location: "Avenue Charles Leclerc",
            description: "keruhgzouerhgiezuargliqerzhgiuqersiguherighqeriuhgeziurfhgiuethfgiuesrligehrdoihgsdf",
            images: "",
            website:""
        },
        {
            id: 3,
            name: "jzjrgiqzurhgqeorger",
            date_start: "15-10-2027",
            date_end: "18-10-2027",
            city: "Strasbourg",
            location: "Place Pierre Lefebre",
            description: "erghehethrthrhehze",
            images: "",
            website:""
        },
    ];

    return(
        <main>
            <h1>Liste des conventions</h1>

            <div className="list_card">
                {cartes.map((carte) => (
                    <Card
                        key={carte.id}
                        titre={carte.titre}
                        description={carte.description}
                    />
                ))}
            </div>
        </main>
    )
}

export default ListCard;