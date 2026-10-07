
export default function Footer() {
    const actualDate = new Date().getFullYear();

    return(
        <footer className='footer'>
            <div className='about'>
                <h3>A propos de TsunaCrew</h3>
                <ul className='about_ul'>
                    <li> <a href="#">Qui suis-je ?</a></li>
                    <li> <a href="#">Pourquoi ce projet ?</a></li>
                </ul>
            </div>

            <div className='support'>
                <h3>Support</h3>
                <ul>
                    <li> <a href="#">Nous contacter</a></li>
                    <li> <a href="#">Signaler un problème</a></li>
                    <li> <a href="#">Page 404</a></li>
                </ul>
            </div>

            <div className='legal'>
                <h3>Mention Légale</h3>
                <ul>
                    <li> <a href="#">Condition d'utilisation</a></li>
                    <li> <a href="#">Politique de confidentialité</a></li>
                    <li> <a href="#">Mentions légales</a></li>
                    <li> <a href="#">Cokkies</a></li>
                </ul>
            </div>

            <div>
                <p>
                    © {actualDate} TsunaCrew. Tous droits réservés
                </p>
            </div>
        </footer>
    )
}