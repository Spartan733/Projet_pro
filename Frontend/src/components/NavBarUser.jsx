import {useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/NavBarUser.scss'

export default function NavBarUser () {
    const [isOpen, setIsOpen] =  useState(false);

    function toggleMenu(){
        setIsOpen(!isOpen);
    }

    return(
        <nav className='nav_user'>
            <div className='Menu_user'>
                <span>
                    <img src="../img/TsunaCrew Logo.jpg" alt="Logo TsunaCrew" />
                </span>

                <button className='mobile_menu_user' onClick={toggleMenu}>
                    {isOpen ? "X" : "☰"}
                </button>

                <div className='Nav_user'>
                    <Link to="/">Accueil</Link>
                    <Link to="/">Profil</Link>
                    <Link to="/">Teams</Link>
                    <Link to="/Convention">Conventions</Link>
                </div>
            </div>

            {isOpen && (
                <div className='menu_user_open'>
                    <Link to="/">Accueil</Link>
                    <Link to="/">Profil</Link>
                    <Link to="/">Teams</Link>
                    <Link to="/Convention">Conventions</Link>
                </div>
            )}
        </nav>
    )
}