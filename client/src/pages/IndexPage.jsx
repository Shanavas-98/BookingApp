import { useEffect, useState } from "react";
import { fetchAllPlaces } from "../api/userApi";
import { NavLink } from "react-router-dom";
import { IMG_URL } from "../constants/urls";

function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        async function getAllPlaces() {
            const { data } = await fetchAllPlaces();
            setPlaces(data)
        }
        getAllPlaces()
    }, [])
    return (
        <div className='grid gap-2 sm:grid-cols-3 md:grid-cols-4'>
            {places?.length > 0 && places?.map((place) => (
                <NavLink to={`/places/${place._id}`} key={place._id} className="p-2 cursor bg-gray-200 rounded-xl flex flex-col gap-2 overflow-hidden">
                    <img className="h-32 rounded-xl object-cover" src={IMG_URL + place?.photos[0]} alt={place?.photos[0]} />
                    <div>
                        <h3 className='text-xl'>{place.title}</h3>
                        <p className='text-md'>{`${place.guests} guests . ${place.beds} beds `}</p>
                        <p className="text-md">{`${place.bedrooms} bedrooms . ${place.bathrooms} bathrooms`}</p>
                        <p className='text-2xl text-green-800 float-right'>&#x20B9;{place.rent}</p>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}

export default IndexPage