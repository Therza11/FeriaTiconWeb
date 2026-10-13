import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import AgendaPage from './pages/AgendaPage'
import FairPage from './pages/FairPage'
import HomePage from './pages/HomePage'
import MediaPage from './pages/MediaPage'
import NotFoundPage from './pages/NotFoundPage'
import PartnersPage from './pages/PartnersPage'
import RegistrationPage from './pages/RegistrationPage'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="feria" element={<FairPage />} />
          <Route path="agenda" element={<AgendaPage />} />
          <Route path="multimedia" element={<MediaPage />} />
          <Route path="inscripcion" element={<RegistrationPage />} />
          <Route path="aliados" element={<PartnersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter