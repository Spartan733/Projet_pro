import "../styles/Card.scss";

function CardConv({ name, date_start, date_end, city, location, description, images, website, }) {
    return (
        <div className="card">
            <span>{name}</span>
            <br />
            <span>Du {date_start} au {date_end}</span>
            <br />
            <span>{city}</span>
            <br />
            <span>{location}</span>
            <br />
            <p>{description}</p>

            {images && <img src={images} alt={name} />}

            {website && (
                <a href={website} target="_blank" rel="noreferrer">
                    Site officiel
                </a>
            )}

            <button className="card-btn">
                En savoir plus
            </button>
        </div>
    );
}

export default CardConv;