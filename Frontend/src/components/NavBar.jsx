import {useState} from 'react';
import {Link} from 'react-router-dom';

export default function NavBar() {
    const [isOpen, setIsOpen] =  useState(false);

    function toggleMenu(){
        setIsOpen(!isOpen);
    }
    
    return(
        <nav className='nav'>
            <div className='Menu'>
                <span> TsunaCrew</span>

                <button className='mobile_menu' onClick={toggleMenu}>
                    {isOpen ? "X" : "☰"}
                </button>

                <div className='Nav'>
                    <Link to="/Home">Acceuil</Link>
                    <Link to="/">Inscription</Link>
                    <Link to="/">A propos</Link>
                    <Link to="/Contact">Contact</Link>
                </div>
            </div>

            {isOpen && (
                <div className='mobile_menu_open'>
                    <a href='/'>Accueil</a>
                    <a href='/'>Inscription</a>
                    <a href='/'>A propos</a>
                    <a href='/'>Contact</a>
                </div>
            )}
        </nav>
    )
}