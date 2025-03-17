import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react_router_dom'
import Home from './pages/Home'
import DataDescription from './pages/DataDescription'
import Predictions from './pages/Preditions'
import About from './pages/About'
import './Style.css'


function App(){
  return(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/description_des_donnees" element={<DataDescription />} />
      <Route path="/predictions_des_cas" element={<Predictions />} />
      <Route path="/apropos" element={<About />} />
    </Routes>
  </Router>
  );
}

export default App;