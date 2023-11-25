import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function BookingsPage() {
    const {user} = useContext(UserContext)
    
  return (
    <div>BookingsPage of {user?.name}</div>
  )
}

export default BookingsPage