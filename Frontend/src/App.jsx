import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home';
import Contact from './pages/Contact';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import APropos from './pages/About';
import Pourquoi from './pages/Why';
import MdpOublier from './pages/Forget';
import Admin from './pages/Admin';
import CardConv from './components/CardConv';
import ListCard from './components/ListCard';
import Connected from './pages/Connected';
import Teams from './pages/Team';
import Profil from './pages/Profil';
import VoirEquipe from './pages/VoirTeam';
import Conventions from './pages/Conventions';
import AdminReport from './pages/AdminReport';


function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Connexion' element={<Connexion />} />
        <Route path='/Inscription' element={<Inscription />} />
        <Route path='/APropos' element={<APropos />} />
        <Route path='/Pourquoi' element={<Pourquoi />} />
        <Route path='/MdpOublier' element={<MdpOublier />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/Connected' element={<Connected />} />
        <Route path='/Team' element={<Teams />} />
        <Route path='/Profil' element={<Profil />} />
        <Route path='/VoirTeam' element={<Conventions />} />
        <Route path='/Conventions' element={<Conventions />} />
        <Route path='/AdminReport' element={<AdminReport />} />
    
        
      </Routes>
    </Router>
  )
}

export default App