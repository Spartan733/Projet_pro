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

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Connexion' element={<Connexion />} />
        <Route path='/Inscription' element={<Inscription />} />
        <Route path='/APropos' element={<APropos />} />
        <Route path='/Pourquoi' element={<Pourquoi />} />
        <Route path='/MdpOublier' element={<MdpOublier />} />
        <Route path='/Admin' element={<Admin />} />
        
      </Routes>
    </Router>
  )
}

export default App