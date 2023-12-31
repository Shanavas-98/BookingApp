import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { fetchUserPlaces } from '../api/userApi';
import { IMG_URL } from '../constants/urls';

function PlacesPage() {
  const [places, setPlaces] = useState([]);
  async function getUserPlaces() {
    const { data } = await fetchUserPlaces();
    setPlaces(data)
  }
  
  useEffect(() => {
    getUserPlaces()
  }, [])

  return (
    <div>
      <div className="text-end">
        <NavLink to={'/account/places/add'}
          className="inline-flex bg-primary text-white px-4 py-2 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Place</NavLink>
      </div>
      {places?.length < 1 && <h2 className='text-2xl text-center'>Add your first property now and start earning.</h2>}
      <div className='grid gap-2 lg:grid-cols-2'>
        {places?.length > 0 && places?.map((place) => (
          <NavLink to={`/account/places/${place._id}`} key={place._id} className="h-36 p-2 cursor bg-gray-200 rounded-xl flex gap-2 overflow-hidden">
            <img className="w-32 h-32 rounded-xl object-cover" src={IMG_URL + place?.photos[0]} alt={place?.photos[0]} />
            <div>
              <div className='flex justify-between'>
                <h3 className='text-xl'>{place.title}</h3>
                <span className='text-2xl text-green-800 px-4'>&#x20B9;{place.rent}</span>
              </div>
              <span className='text-md'>{`${place.guests} guests . ${place.bedrooms} bedrooms . ${place.beds} beds . ${place.bathrooms} bathrooms`}</span>
              <p className='text-sm'>{place.description}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default PlacesPage