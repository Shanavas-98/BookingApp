import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import UserLayout from './layouts/UserLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />} >
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}

export default App
