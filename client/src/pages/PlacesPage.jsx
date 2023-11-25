import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'

function PlacesPage() {
  const { user } = useContext(UserContext)
  return (
    <div>PlacesPage of {user?.name}
      <div className="text-end">
        <Link to={'/profile/places/add'}
          className="inline-flex bg-primary text-white px-4 py-2 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Place</Link>
      </div>
    </div>
  )
}

export default PlacesPage