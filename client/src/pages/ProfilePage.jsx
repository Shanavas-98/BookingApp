import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';


function ProfilePage() {
    const {user,setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const userLogout = () => {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userToken');
      setUser(null);
      navigate('/');
    };
  return (
    <div className="mx-auto max-w-lg text-center flex flex-col">
        Profile of {user?.name}
        <button onClick={userLogout} className="primary max-w-sm mt-2">Logout</button>
    </div>
  )
}

export default ProfilePage;