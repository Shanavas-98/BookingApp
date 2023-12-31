import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import UserLayout from './layouts/UserLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ProfileLayout from './layouts/ProfileLayout'
import BookingsPage from './pages/BookingsPage'
import PlacesPage from './pages/PlacesPage'
import AddPlace from './components/AddPlace'
import SinglePlacePage from './pages/SinglePlacePage'
import UserAuth from './hooks/UserAuth'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />} >
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<UserAuth />}>
          <Route path="/account" element={<ProfileLayout />} >
            <Route index element={<ProfilePage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="places" element={<PlacesPage />} />
            <Route path="places/add" element={<AddPlace />} />
            <Route path="places/:placeId" element={<AddPlace />} />
          </Route>
        </Route>
        <Route path='/places/:placeId' element={<SinglePlacePage />} />
      </Route>
      <Route path="/*" element={< NotFoundPage />} />
    </Routes>
  )
}

export default App
