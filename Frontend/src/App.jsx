import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Inscription' element={<Inscription />} />
      </Routes>
    </Router>
  )
}