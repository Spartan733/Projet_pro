import {useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/NavBarAdmin.scss';
import { Bell, } from 'lucide-react';

export default function HeaderAdmin() {
    

    return(
        <nav className='nav-admin'>
            <div className='menu-admin'>
                <span>
                    <img src="../img/Logo.jpg" alt="Logo TsunaCrew" style={{verticalAlign: 'middle'}} />
                </span>

                <h1>TsunaCrew Aministrateur <Bell /></h1>

                

                {/* <div className='Nav-Admin'>
                    <Link to="/">Accueil</Link>
                    <Link to ='/Conventions'>Conventions</Link>
                    <Link to ='/AdminReport'>Signalement</Link>
                    <Link to ='/'>Groupes</Link>
                    <Link to ='/'>Système</Link>
                </div> */}
            </div>
        </nav>
    )
}