import react from 'react'
import './App.css'
import 'mdb-ui-kit/css/mdb.min.css'
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
//components
import CreateMascota from './component/createMascota/Mascota'
import GetMascotas from './component/getMascotas/GetMascotas'
import LandingGaurderia from './component/LandingGaurderia/LandingGaurderia'
import EditMascota from './component/editMascota/editMascota'

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingGaurderia />} />
          <Route path="/create" element={<CreateMascota />} />
          <Route path="/mascotas" element={<GetMascotas />} />
          <Route path="/edit/:mascotaId" element={<EditMascota />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;