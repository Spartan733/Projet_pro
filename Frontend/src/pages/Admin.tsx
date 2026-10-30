import NavBarAdmin from "../components/NavBarAdmin";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Conventions from "./Conventions";
import ListCard from "../components/ListCard";


function Admin() {
    return(
        <>
            <NavBarAdmin />

            <main>
                <h1>Bonjour Admin</h1>

                <ListCard />

                
                
            </main>


            <Footer />
        </>
    )
}

export default Admin;