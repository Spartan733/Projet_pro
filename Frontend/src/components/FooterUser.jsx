import "../styles/FotterUser.scss"
import { House, Store, Users, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FooterUser() {
    return(
        <footer className='footer_user'>
            <Link to="/Connected"> <House /></Link>

            <Link to="/Conventions"> <Store /></Link>

            <Link to="/Team"> <Users /></Link>

            <Link to="/Profil"> <UserRound /></Link>
        </footer>
    )
}