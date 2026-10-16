import '../styles/Card.scss';

const CardConv = ({name, date_start, date_end, city, location, description, images, website}) => {
    return(
        <div className="card">
            <span>Conventions Japonaise</span>
            <span>10-06-2027</span>
            <span>13-06-2027</span>
            <span>Paris</span>
            <span>Rue du Générale de Gaulle</span>
            <span>{description}</span>
            <img src={images} alt="" />
            <span>{website}</span>

            <button className="card-btn">En savoir plus</button>
        </div>
    )
}

export default CardConv