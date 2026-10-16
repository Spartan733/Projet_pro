import {useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/NavBarAdmin.scss';

export default function NavBarAdmin() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleMenu(){
        setIsOpen(!isOpen);
    }

    return(
        <nav className='nav-admin'>
            <div className='menu-admin'>
                <span>
                    <img src="Frontend\img\TsunaCrew Logo.jpg" alt="Logo TsunaCrew" style={{verticalAlign: 'middle'}} />
                </span>

                <button className='mobile-menu-admin' onClick={toggleMenu}>{isOpen ? "X" : "☰"}</button>

                <div className='Nav-Admin'>
                    <Link to="/Home">Accueil</Link>
                    <Link to ='/'>Conventions</Link>
                    <Link to ='/'>Signalement</Link>
                    <Link to ='/'>Groupes</Link>
                    <Link to ='/'>Système</Link>
                </div>
            </div>

            {isOpen && (
                <div className='menu_admin_open'>
                    <Link to="/Home">Accueil</Link>
                    <Link to="/">Conventions</Link>
                    <Link to="/">Signalement</Link>
                    <Link to="/">Groupes</Link>
                    <Link to="/">Système</Link>
                </div>
            )}
        </nav>
    )
}