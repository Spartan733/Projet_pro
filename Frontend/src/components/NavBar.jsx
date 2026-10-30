import {useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/NavBar.scss';

export default function NavBar() {
    const [isOpen, setIsOpen] =  useState(false);

    function toggleMenu(){
        setIsOpen(!isOpen);
    }
    
    return(
        <nav className='nav'>
            <div className='Menu'>
                <span>
                    <img src="../img/Logo.jpg" alt="Logo TsunaCrew" style={{ verticalAlign: 'middle' }} />
                </span>

                <button className='mobile_menu' onClick={toggleMenu}>
                    {isOpen ? "X" : "☰"}
                </button>

                <div className='Nav'>
                    <Link to="/">Accueil</Link>
                    <Link to="/Connexion">Connexion</Link>
                    <Link to="/Admin">Admin</Link>
                    <Link to="/APropos">A propos</Link>
                    <Link to="/Contact">Contact</Link>
                </div>
            </div>

            {isOpen && (
                <div className='mobile_menu_open'>
                    <Link to="/">Accueil</Link>
                    <Link to="/Admin">Admin</Link>
                    <Link to="/Connexion">Connexion</Link>
                    <Link to="/APropos">A propos</Link>
                    <Link to="/Contact">Contact</Link>
                </div>
            )}
        </nav>
    )
}