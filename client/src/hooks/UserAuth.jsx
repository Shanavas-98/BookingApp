import { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function UserAuth() {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    if(user){
        return <Outlet />
    }else{
        navigate('/login');
    }
}

export default UserAuth